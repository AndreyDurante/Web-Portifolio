import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navigation from '../../src/components/Navigation.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'
import { ThemeProvider } from '../../src/contexts/ThemeContext.jsx'

describe('Navigation preferences', () => {
  it('provides language and theme controls', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </LanguageProvider>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mudar idioma' }))
    expect(document.documentElement.lang).toBe('en')
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }))
    expect(document.documentElement).not.toHaveClass('dark')
  })
})
