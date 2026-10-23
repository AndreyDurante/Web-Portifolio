import { useLanguage } from '../hooks/useLanguage.js'

export default function Trajectory() {
  const { t, language } = useLanguage()
  const resume = t.resume || (language === 'pt' ? '/cv-pt.pdf' : '/cv-en.pdf')
  const columns = [
    { key: 'education', title: t.trajectory.education },
    { key: 'experience', title: t.trajectory.experience },
  ]

  return (
    <div className="mx-auto max-w-6xl text-left">
      <div className="grid gap-10 lg:grid-cols-2">
        {columns.map((column) => {
          const items = t.trajectory.items
            .map((item, index) => ({ ...item, index }))
            .filter((item) => item.category === column.key)

          return (
            <section key={column.key} aria-labelledby={`trajectory-${column.key}`}>
              <h3
                id={`trajectory-${column.key}`}
                className="mb-5 text-center font-mono text-xs uppercase tracking-[.18em] accent"
              >
                {column.title}
              </h3>
              <div className="grid content-start gap-4">
                {items.map((item) => (
                  <article
                    key={`${item.title}-${item.organization}`}
                    className="surface grid gap-3 rounded-2xl border border-token p-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:p-7"
                  >
                    <span className="font-mono text-xs accent">
                      {String(item.index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted">{item.organization}</p>
                    </div>
                    <span className="hidden h-2 w-2 rounded-full bg-[var(--accent)] sm:block" />
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      {t.resume && (
        <a
          href={resume}
          download
          className="mt-8 inline-flex min-h-12 w-max items-center rounded-full border border-token px-6 font-mono text-xs uppercase tracking-wider"
        >
          {t.trajectory.resume}
          <span aria-hidden="true" className="ml-3">
            ↗
          </span>
        </a>
      )}
    </div>
  )
}
