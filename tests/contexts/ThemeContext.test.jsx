import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../src/contexts/ThemeContext.jsx'
import { useTheme } from '../../src/hooks/useTheme.js'

function Consumer() { const { theme, toggleTheme } = useTheme(); return <button onClick={toggleTheme}>{theme}</button> }
describe('ThemeProvider', () => {
  it('defaults to dark and persists the chosen theme', async () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByRole('button')).toHaveTextContent('dark')
    fireEvent.click(screen.getByRole('button'))
    expect(await screen.findByRole('button')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('portfolio-theme')).toContain('light')
  })
})
