import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage.js'
import { useTheme } from '../hooks/useTheme.js'

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  return <header className="fixed inset-x-0 top-4 z-40 px-3"><nav aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'} className="surface mx-auto flex max-w-max items-center gap-1 rounded-full border border-token p-1 shadow-lg backdrop-blur"><Link className="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest" to="/#sobre">AD<span className="sr-only"> — Andrey Durante</span></Link><a className="hidden rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-widest sm:block" href="/#projetos">{t.nav.projects}</a><a className="hidden rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-widest sm:block" href="/#trajetoria">{t.nav.trajectory}</a><button aria-label={t.nav.language} className="rounded-full border border-token px-3 py-2 font-mono text-[10px] uppercase" onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}>{language}</button><button aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark} className="rounded-full px-3 py-2" onClick={toggleTheme}>{theme === 'dark' ? '☼' : '◐'}</button></nav></header>
}
