import { useLanguage } from '../hooks/useLanguage.js'

export default function Trajectory() {
  const { t, language } = useLanguage()
  const resume = t.resume || (language === 'pt' ? '/cv-pt.pdf' : '/cv-en.pdf')
  return <div className="grid gap-4">
    {t.trajectory.items.map((item, index) => <article key={`${item.title}-${item.organization}`} className="surface grid gap-3 rounded-2xl border border-token p-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:p-7">
      <span className="font-mono text-xs accent">0{index + 1}</span><div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">{item.type}</p><h3 className="mt-2 text-xl font-bold">{item.title}</h3><p className="mt-1 text-sm text-muted">{item.organization}</p></div><span className="hidden h-2 w-2 rounded-full bg-[var(--accent)] sm:block" />
    </article>)}
    {t.resume && <a href={resume} download className="mt-3 inline-flex min-h-12 w-max items-center rounded-full border border-token px-6 font-mono text-xs uppercase tracking-wider">{t.trajectory.resume}<span aria-hidden="true" className="ml-3">↗</span></a>}
  </div>
}
