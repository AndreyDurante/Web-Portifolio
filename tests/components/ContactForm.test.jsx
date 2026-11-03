import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ContactForm from '../../src/components/ContactForm.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'

function renderForm(props = {}) {
  return render(
    <LanguageProvider>
      <ContactForm {...props} />
    </LanguageProvider>,
  )
}

describe('ContactForm', () => {
  it('renders all form fields and submit button', () => {
    renderForm()
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument()
  })

  it('validates fields with specific error messages on empty submission', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(screen.getByText('O nome é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('O e-mail é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('A mensagem é obrigatória.')).toBeInTheDocument()
  })

  it('displays specific error for invalid email and short message', () => {
    renderForm()

    const nameInput = screen.getByLabelText(/nome/i)
    const emailInput = screen.getByLabelText(/e-mail/i)
    const messageInput = screen.getByLabelText(/mensagem/i)

    fireEvent.change(nameInput, { target: { value: 'Maria' } })
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })
    fireEvent.change(messageInput, { target: { value: 'muito curto' } })

    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(screen.getByText('e-mail inválido')).toBeInTheDocument()
    expect(screen.getByText('mensagem com no mínimo 20 caracteres')).toBeInTheDocument()
  })

  it('disables submit button and shows loading spinner during submission', async () => {
    let resolveSubmit
    const submitPromise = new Promise((resolve) => {
      resolveSubmit = resolve
    })
    const handleSubmit = vi.fn(() => submitPromise)

    renderForm({ onSubmit: handleSubmit })

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Maria Santos' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'maria@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: 'Olá! Gostaria de conversar sobre uma oportunidade de trabalho.' },
    })

    const submitBtn = screen.getByRole('button', { name: /enviar mensagem/i })
    fireEvent.click(submitBtn)

    // Button should be disabled and have aria-busy
    expect(submitBtn).toBeDisabled()
    expect(submitBtn).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText(/enviando…/i)).toBeInTheDocument()

    // Resolving the submission
    resolveSubmit()

    await waitFor(() => {
      expect(
        screen.getByText('Mensagem enviada com sucesso! Retornarei em breve.'),
      ).toBeInTheDocument()
    })

    // Inputs should be cleared
    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
    expect(screen.getByLabelText(/e-mail/i)).toHaveValue('')
    expect(screen.getByLabelText(/mensagem/i)).toHaveValue('')
  })
})
