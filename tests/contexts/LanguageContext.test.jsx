import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'
import { useLanguage } from '../../src/hooks/useLanguage.js'

function Consumer() { const { language, setLanguage } = useLanguage(); return <button onClick={() => setLanguage('en')}>{language}</button> }
describe('LanguageProvider', () => {
  it('defaults to Portuguese and updates the html language after switching', async () => {
    render(<LanguageProvider><Consumer /></LanguageProvider>)
    expect(screen.getByRole('button')).toHaveTextContent('pt')
    fireEvent.click(screen.getByRole('button'))
    expect(await screen.findByRole('button')).toHaveTextContent('en')
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('portfolio-language')).toContain('en')
  })
})
