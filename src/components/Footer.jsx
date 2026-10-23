import { useLanguage } from '../hooks/useLanguage.js'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-token">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] accent">{t.footer.label}</p>
          <p className="mt-2 text-2xl font-bold">Andrey Durante</p>
        </div>
        <nav
          aria-label={t.footer.label}
          className="flex flex-wrap gap-5 font-mono text-xs uppercase tracking-widest"
        >
          <a href="https://github.com/AndreyDurante" target="_blank" rel="noreferrer">
            {t.footer.github} ↗
          </a>
        </nav>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} · {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
