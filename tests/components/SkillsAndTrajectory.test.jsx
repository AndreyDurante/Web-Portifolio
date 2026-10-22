import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'
import ShowcaseTabs from '../../src/components/ShowcaseTabs.jsx'
import SkillList from '../../src/components/SkillList.jsx'
import Trajectory from '../../src/components/Trajectory.jsx'
import pt from '../../src/data/pt.js'

describe('skills and trajectory content', () => {
  it('lists named skills and factual education/work entries without unsupplied resume', () => {
    render(<MemoryRouter><LanguageProvider><ShowcaseTabs projectsPanel={<p>projects</p>} technologiesPanel={<SkillList items={pt.skills.technologies} />} competenciesPanel={<SkillList items={pt.skills.competencies} />} /><Trajectory /></LanguageProvider></MemoryRouter>)
    fireEvent.click(screen.getByRole('tab', { name: 'Tecnologias' }))
    for (const technology of pt.skills.technologies) expect(screen.getByText(technology)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: 'Competências' }))
    for (const skill of pt.skills.competencies) expect(screen.getByText(skill)).toBeInTheDocument()
    expect(screen.getByText('Engenharia de Software')).toBeInTheDocument()
    expect(screen.getByText('Adalta Engenharia')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Baixar currículo/ })).not.toBeInTheDocument()
  })
})
