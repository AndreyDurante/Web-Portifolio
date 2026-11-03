import { useLanguage } from '../hooks/useLanguage.js'
import ContactForm from './ContactForm.jsx'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contato" className="border-t border-token">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Lado Esquerdo: Identificação, links e copyright (o que já estava) */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] accent">
              {t.footer.label}
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Andrey Durante</p>
          </div>

          <div>
            <nav
              aria-label={t.footer.label}
              className="flex flex-wrap gap-5 font-mono text-xs uppercase tracking-widest"
            >
              <a
                href="https://github.com/AndreyDurante"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[var(--accent)]"
              >
                {t.footer.github} ↗
              </a>
            </nav>
            <p className="mt-6 text-xs text-muted">
              © {new Date().getFullYear()} · {t.footer.rights}
            </p>
          </div>
        </div>

        {/* Lado Direito: Formulário de Contato com validação por campo */}
        <div>
          <ContactForm />
        </div>
      </div>
    </footer>
  )
}
