import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.js'
import Button from './Button.jsx'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm({ onSubmit }) {
  const { t } = useLanguage()
  const contactText = t.footer?.contact || {}
  const errorMessages = contactText.errors || {}

  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  function validate(fields = values) {
    const errs = {}

    // Name validation
    const trimmedName = (fields.name || '').trim()
    if (!trimmedName) {
      errs.name = errorMessages.nameRequired || 'O nome é obrigatório.'
    } else if (trimmedName.length < 2) {
      errs.name = errorMessages.nameMin || 'O nome deve ter no mínimo 2 caracteres.'
    }

    // Email validation
    const trimmedEmail = (fields.email || '').trim()
    if (!trimmedEmail) {
      errs.email = errorMessages.emailRequired || 'O e-mail é obrigatório.'
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errs.email = errorMessages.emailInvalid || 'e-mail inválido'
    }

    // Message validation
    const trimmedMessage = (fields.message || '').trim()
    if (!trimmedMessage) {
      errs.message = errorMessages.messageRequired || 'A mensagem é obrigatória.'
    } else if (trimmedMessage.length < 20) {
      errs.message = errorMessages.messageMin || 'mensagem com no mínimo 20 caracteres'
    }

    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    const updatedValues = { ...values, [name]: value }
    setValues(updatedValues)

    if (touched[name]) {
      const fieldErrors = validate(updatedValues)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name] || '',
      }))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validate(values)
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || '',
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'submitting') return

    setTouched({ name: true, email: true, message: true })
    const fieldErrors = validate(values)
    setErrors(fieldErrors)

    if (Object.keys(fieldErrors).length > 0) {
      return
    }

    setStatus('submitting')

    try {
      if (typeof onSubmit === 'function') {
        await onSubmit(values)
      } else {
        // Default async simulation with 1 second delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      setStatus('success')
      setValues({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <div className="surface rounded-2xl border border-token p-6 sm:p-8">
      <div>
        <h3 className="text-xl font-bold tracking-tight">
          {contactText.title || 'Envie uma mensagem'}
        </h3>
        {contactText.description && (
          <p className="mt-1 text-xs text-muted leading-relaxed">{contactText.description}</p>
        )}
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-emerald-600/25 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-950/25 dark:text-emerald-300"
        >
          {contactText.success || 'Mensagem enviada com sucesso!'}
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-xs font-medium text-red-500"
        >
          {contactText.error || 'Não foi possível enviar. Tente novamente.'}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        {/* Campo Nome */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5"
          >
            {contactText.name || 'Nome'}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder={contactText.namePlaceholder || 'Seu nome completo'}
            aria-invalid={Boolean(errors.name && touched.name)}
            aria-describedby={errors.name && touched.name ? 'contact-name-error' : undefined}
            className={`w-full rounded-xl border bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-muted/60 transition focus:outline-none focus:ring-1 ${
              errors.name && touched.name
                ? 'border-[var(--accent)] focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                : 'border-token focus:border-[var(--foreground)] focus:ring-[var(--foreground)]'
            }`}
          />
          {errors.name && touched.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-[var(--accent)]">
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo E-mail */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5"
          >
            {contactText.email || 'E-mail'}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder={contactText.emailPlaceholder || 'seu.email@exemplo.com'}
            aria-invalid={Boolean(errors.email && touched.email)}
            aria-describedby={errors.email && touched.email ? 'contact-email-error' : undefined}
            className={`w-full rounded-xl border bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-muted/60 transition focus:outline-none focus:ring-1 ${
              errors.email && touched.email
                ? 'border-[var(--accent)] focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                : 'border-token focus:border-[var(--foreground)] focus:ring-[var(--foreground)]'
            }`}
          />
          {errors.email && touched.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-1.5 text-xs text-[var(--accent)]"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo Mensagem */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5"
          >
            {contactText.message || 'Mensagem'}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="4"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder={contactText.messagePlaceholder || 'Descreva sua mensagem...'}
            aria-invalid={Boolean(errors.message && touched.message)}
            aria-describedby={
              errors.message && touched.message ? 'contact-message-error' : undefined
            }
            className={`w-full rounded-xl border bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-muted/60 transition focus:outline-none focus:ring-1 ${
              errors.message && touched.message
                ? 'border-[var(--accent)] focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                : 'border-token focus:border-[var(--foreground)] focus:ring-[var(--foreground)]'
            }`}
          />
          {errors.message && touched.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-1.5 text-xs text-[var(--accent)]"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Botão de Envio com Bloqueio e Spinner */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full sm:w-auto min-w-40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{contactText.sending || 'Enviando…'}</span>
              </>
            ) : (
              <span>{contactText.send || 'Enviar mensagem'}</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
