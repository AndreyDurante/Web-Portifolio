import { useEffect, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.js'
import { useTheme } from '../hooks/useTheme.js'

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="site-header fixed left-1/2 top-4 z-40 -translate-x-1/2">
      <nav
        aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}
        className="site-header-nav rounded-2xl border shadow-lg transition-[background-color,border-color,backdrop-filter] duration-300 sm:rounded-full"
        style={{
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--surface) 84%, transparent)'
            : 'var(--surface)',
          borderColor: scrolled
            ? 'color-mix(in srgb, var(--line) 78%, transparent)'
            : 'var(--line)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="site-header-start">
          <button
            aria-label={t.nav.language}
            className="site-header-language"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            title={t.nav.language}
            type="button"
          >
            {language}
          </button>
        </div>
        <div className="site-header-links">
          <a href="/#sobre">Andrey Durante</a>
          <a href="/#projetos">{t.nav.projects}</a>
          <a href="/#trajetoria">{t.nav.trajectory}</a>
        </div>
        <button
          aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
          aria-pressed={theme === 'dark'}
          className="site-header-theme"
          onClick={toggleTheme}
          title={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
          type="button"
        >
          {theme === 'dark' ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="site-header-theme-icon"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="site-header-theme-icon"
            >
              <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  )
}
