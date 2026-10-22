import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getProjects, getProjectReadme, selectPortfolioRepositories } from '../../src/services/githubService.js'
import { CACHE_TTL, writeCache } from '../../src/services/cacheService.js'

const tagged = { id: 1, name: 'site', full_name: 'AndreyDurante/site', topics: ['portfolio'], description: 'Site', homepage: '', default_branch: 'main' }
const other = { ...tagged, id: 2, name: 'other', topics: ['react'] }

describe('GitHub service', () => {
  beforeEach(() => localStorage.clear())
  it('selects repositories with the exact portfolio topic', () => expect(selectPortfolioRepositories([tagged, other])).toHaveLength(1))
  it('fetches one public repository page and filters locally', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => [tagged, other] })
    const result = await getProjects({ fetcher })
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher.mock.calls[0][0]).toContain('per_page=100&sort=pushed')
    expect(result.projects).toEqual([expect.objectContaining({ name: 'site' })])
  })
  it('uses stale cached repositories when refresh fails', async () => {
    writeCache('portfolio-github-repositories-v1', { repositories: [tagged] }, Date.now() - CACHE_TTL - 1)
    const result = await getProjects({ fetcher: async () => { throw new Error('offline') } })
    expect(result.status).toBe('stale')
    expect(result.projects).toHaveLength(1)
  })
  it('returns a friendly empty failure when there is no cache or verified fallback', async () => {
    const result = await getProjects({ fetcher: async () => { throw new Error('offline') } })
    expect(result).toEqual({ projects: [], status: 'error' })
  })
  it('uses the verified fallback when a refresh fails without cache', async () => {
    const result = await getProjects({ fetcher: async () => { throw new Error('offline') }, fallback: [tagged] })
    expect(result).toEqual({ projects: [tagged], status: 'fallback' })
  })
  it('rejects malformed repository responses without throwing', async () => {
    const result = await getProjects({ fetcher: async () => ({ ok: true, json: async () => ({ items: [] }) }) })
    expect(result).toEqual({ projects: [], status: 'error' })
  })
  it('keeps successful network results when localStorage writes fail', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('storage disabled') })
    const result = await getProjects({ fetcher: async () => ({ ok: true, json: async () => [tagged] }) })
    expect(result.projects).toHaveLength(1)
    expect(result.status).toBe('fresh')
  })
  it('treats a successful empty response as an empty state', async () => {
    const result = await getProjects({ fetcher: async () => ({ ok: true, json: async () => [] }) })
    expect(result).toEqual({ projects: [], status: 'fresh' })
  })
  it('decodes and caches a README on demand', async () => {
    const bytes = new TextEncoder().encode('# Olá')
    const content = btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ encoding: 'base64', content, path: 'docs/README.md' }) })
    const result = await getProjectReadme('site', 'main', { fetcher })
    expect(result.markdown).toBe('# Olá')
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect((await getProjectReadme('site', 'main', { fetcher })).status).toBe('fresh')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})
