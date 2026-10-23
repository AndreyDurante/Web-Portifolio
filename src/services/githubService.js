import fallbackProjects from '../data/fallbackProjects.js'
import { readCache, writeCache } from './cacheService.js'

const OWNER = 'AndreyDurante'
const LIST_KEY = 'portfolio-github-repositories-v1'
const README_PREFIX = 'portfolio-github-readme-v1:'
const fields = 'id,name,full_name,description,topics,homepage,html_url,default_branch,updated_at'

export function selectPortfolioRepositories(repositories) {
  if (!Array.isArray(repositories)) return []
  return repositories
    .filter((repo) => Array.isArray(repo.topics) && repo.topics.includes('portfolio'))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      topics: repo.topics,
      homepage: repo.homepage || '',
      html_url: repo.html_url,
      default_branch: repo.default_branch || 'main',
      updated_at: repo.updated_at,
    }))
}

export async function getProjects({
  fetcher = fetch,
  now = Date.now(),
  fallback = fallbackProjects,
} = {}) {
  const cache = readCache(LIST_KEY, now)
  if (cache?.fresh)
    return { projects: selectPortfolioRepositories(cache.repositories), status: 'fresh' }
  try {
    const response = await fetcher(
      `https://api.github.com/users/${OWNER}/repos?per_page=100&sort=pushed`,
      { headers: { Accept: 'application/vnd.github+json' } },
    )
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
    const repositories = await response.json()
    if (
      !Array.isArray(repositories) ||
      repositories.some(
        (repo) => !repo || typeof repo.name !== 'string' || !Array.isArray(repo.topics),
      )
    )
      throw new Error('Invalid repository response')
    writeCache(LIST_KEY, { repositories }, now)
    return { projects: selectPortfolioRepositories(repositories), status: 'fresh' }
  } catch {
    if (cache) return { projects: selectPortfolioRepositories(cache.repositories), status: 'stale' }
    if (fallback.length) return { projects: fallback, status: 'fallback' }
    return { projects: [], status: 'error' }
  }
}

function decodeContent(content) {
  const bytes = Uint8Array.from(atob(content.replace(/\s/g, '')), (char) => char.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

export async function getProjectReadme(
  repo,
  defaultBranch = 'main',
  { fetcher = fetch, now = Date.now() } = {},
) {
  const name = String(repo || '').trim()
  if (!name || name.includes('/') || name === '.' || name === '..')
    return { status: 'missing', markdown: '' }
  const cacheKey = `${README_PREFIX}${OWNER.toLowerCase()}/${name.toLowerCase()}`
  const cache = readCache(cacheKey, now)
  if (cache?.fresh)
    return {
      status: 'fresh',
      markdown: cache.markdown,
      path: cache.path,
      defaultBranch: cache.defaultBranch || defaultBranch,
    }
  try {
    const response = await fetcher(
      `https://api.github.com/repos/${OWNER}/${encodeURIComponent(name)}/readme`,
      { headers: { Accept: 'application/vnd.github+json' } },
    )
    if (response.status === 404)
      return cache ? { status: 'stale', ...cache } : { status: 'missing', markdown: '' }
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
    const result = await response.json()
    if (
      typeof result.content !== 'string' ||
      !result.content.trim() ||
      result.encoding !== 'base64'
    )
      return { status: 'missing', markdown: '' }
    const document = {
      markdown: decodeContent(result.content),
      path: result.path || 'README.md',
      defaultBranch,
    }
    writeCache(cacheKey, document, now)
    return { status: 'fresh', ...document }
  } catch {
    return cache ? { status: 'stale', ...cache } : { status: 'error', markdown: '' }
  }
}

export { OWNER, fields as GITHUB_REPOSITORY_FIELDS }
