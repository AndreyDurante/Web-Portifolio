import { useEffect, useState } from 'react'

export default function ProfileBadge({ portrait = null, alt = '' }) {
  const [Badge3D, setBadge3D] = useState(null)
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const media = window.matchMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)')
    const canUseWebGL2 = () => { try { const canvas = document.createElement('canvas'); return Boolean(canvas.getContext('webgl2')) } catch { return false } }
    if (media.matches && canUseWebGL2() && portrait) import('./ProfileBadge3D.jsx').then((module) => setBadge3D(() => module.default)).catch(() => {})
  }, [portrait])
  if (!portrait) return <div aria-hidden="true" className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-token bg-gradient-to-br from-[var(--surface)] via-[var(--line)] to-[var(--accent)]/40"><span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[.2em] text-[var(--muted)]">Andrey Durante · Software Engineering</span><span className="absolute right-5 top-5 h-3 w-3 rounded-full bg-[var(--accent)]" /></div>
  return <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-token bg-[var(--surface)]">{Badge3D ? <Badge3D portrait={portrait} alt={alt} /> : <img src={portrait} alt={alt} width="600" height="750" fetchPriority="high" className="h-full w-full object-cover" />}</div>
}
