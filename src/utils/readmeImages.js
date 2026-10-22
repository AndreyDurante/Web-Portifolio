export function resolveReadmeImage(src, { owner, repo, branch = 'main', path = 'README.md' }) {
  if (typeof src !== 'string' || !src.trim()) return ''
  const value = src.trim()
  try { const absolute = new URL(value); return ['https:', 'http:'].includes(absolute.protocol) ? absolute.href : '' } catch { /* relative GitHub asset */ }
  if (value.startsWith('//')) return ''
  const directory = path.startsWith('/') ? [] : path.split('/').slice(0, -1)
  const segments = value.startsWith('/') ? [] : directory
  for (const rawSegment of value.replace(/^\//, '').split('/')) {
    let segment
    try { segment = decodeURIComponent(rawSegment) } catch { return '' }
    if (!segment || segment === '.') continue
    if (segment === '..') { if (!segments.length) return ''; segments.pop(); continue }
    if (segment.includes('/') || segment.includes('\\')) return ''
    segments.push(segment)
  }
  return `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${segments.map(encodeURIComponent).join('/')}`
}
