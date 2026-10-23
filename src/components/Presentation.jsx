import { useLanguage } from '../hooks/useLanguage.js'
import ProfileBadge from './ProfileBadge.jsx'

export default function Presentation() {
  const { t, language } = useLanguage()
  const resume = t.resume || (language === 'pt' ? '/cv-pt.pdf' : '/cv-en.pdf')
  return (
    <section
      id="sobre"
      className="site-shell grid min-h-[90svh] items-center gap-12 pb-16 pt-28 md:grid-cols-[1.2fr_.8fr] md:pt-32"
    >
      <div className="order-2 md:order-1">
        <p className="font-mono text-xs uppercase tracking-[.22em] accent">{t.hero.eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl md:text-7xl">
          {t.hero.title}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
          {t.hero.description}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          {t.resume && (
            <a
              className="inline-flex min-h-12 items-center rounded-full bg-[var(--foreground)] px-6 font-mono text-xs uppercase tracking-wider text-[var(--background)] transition hover:opacity-80"
              href={resume}
              download
            >
              {t.hero.resume}
              <span aria-hidden="true" className="ml-3">
                ↗
              </span>
            </a>
          )}
          <a
            className="inline-flex min-h-12 items-center rounded-full border border-token px-6 font-mono text-xs uppercase tracking-wider transition hover:border-[var(--accent)]"
            href="#projetos"
          >
            {t.hero.projects}
            <span aria-hidden="true" className="ml-3">
              ↓
            </span>
          </a>
        </div>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[.2em] text-muted">
          FIAP <span className="mx-2 accent">/</span> Engenharia de Software
        </p>
      </div>
      <div className="order-1 mx-auto w-full max-w-[19rem] md:order-2 md:max-w-[24rem]">
        <ProfileBadge alt={t.hero.badge} />
      </div>
    </section>
  )
}
