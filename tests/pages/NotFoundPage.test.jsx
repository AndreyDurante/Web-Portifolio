import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import NotFoundPage from '../../src/pages/NotFoundPage.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'

describe('NotFoundPage', () => {
  it('offers a localized route home', () => {
    render(<MemoryRouter><LanguageProvider><NotFoundPage /></LanguageProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Página não encontrada' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/')
  })
})
