import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage.js'

export default function NotFoundPage() {
  const { t } = useLanguage()
  return <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-start justify-center px-5"><p className="font-mono text-xs uppercase tracking-[.2em] accent">404</p><h1 className="mt-4 text-5xl font-black">{t.notFound.title}</h1><p className="mt-4 text-muted">{t.notFound.description}</p><Link className="mt-8 rounded-full bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase text-[var(--background)]" to="/">{t.notFound.home}</Link></main>
}
