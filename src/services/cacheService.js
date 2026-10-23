import { readStorage, writeStorage } from '../utils/storage.js'

export const CACHE_TTL = 60 * 60 * 1000
export const CACHE_VERSION = 1

export function readCache(key, now = Date.now()) {
  const entry = readStorage(key)
  if (
    !entry ||
    entry.version !== CACHE_VERSION ||
    (!Array.isArray(entry.repositories) && typeof entry.markdown !== 'string')
  )
    return null
  return { ...entry, fresh: Number(entry.expiresAt) > now }
}

export function writeCache(key, value, now = Date.now()) {
  return writeStorage(key, {
    ...value,
    version: CACHE_VERSION,
    fetchedAt: now,
    expiresAt: now + CACHE_TTL,
  })
}
