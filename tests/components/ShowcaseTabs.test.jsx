import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ShowcaseTabs from '../../src/components/ShowcaseTabs.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'

describe('ShowcaseTabs', () => {
  it('renders one panel and moves activation with arrow keys', () => {
    render(<LanguageProvider><ShowcaseTabs projectsPanel={<p>Projects content</p>} technologiesPanel={<p>Technology content</p>} competenciesPanel={<p>Competency content</p>} /></LanguageProvider>)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Projects content')).toBeInTheDocument()
    expect(screen.queryByText('Technology content')).not.toBeInTheDocument()
    tabs[0].focus(); fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Technology content')).toBeInTheDocument()
    expect(screen.queryByText('Projects content')).not.toBeInTheDocument()
    fireEvent.keyDown(tabs[1], { key: 'End' })
    expect(tabs[2]).toHaveFocus()
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
  })
})
