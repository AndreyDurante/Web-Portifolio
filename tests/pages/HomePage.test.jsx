import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import HomePage from '../../src/pages/HomePage.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'
import { ThemeProvider } from '../../src/contexts/ThemeContext.jsx'

vi.mock('../../src/hooks/useProjects.js', () => ({ useProjects: () => ({ status: 'fresh', projects: [] }) }))

describe('HomePage', () => {
  it('shows candidate introduction and project path without fake identity assets or resume links', () => {
    render(<MemoryRouter><LanguageProvider><ThemeProvider><HomePage /></ThemeProvider></LanguageProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Construindo meu próximo capítulo.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ver projetos/ })).toHaveAttribute('href', '#projetos')
    expect(screen.queryByRole('link', { name: /Baixar currículo/ })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'O que estou construindo' })).toBeInTheDocument()
  })
})
