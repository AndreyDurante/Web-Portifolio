import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import ProjectShowcase from '../../src/components/ProjectShowcase.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'

const project = {
  id: 1,
  name: 'demo',
  description: 'A project',
  homepage: 'https://example.com',
  full_name: 'AndreyDurante/demo',
  default_branch: 'main',
}
const projects = vi.hoisted(() => ({ value: { status: 'loading', projects: [] } }))
vi.mock('../../src/hooks/useProjects.js', () => ({ useProjects: () => projects.value }))

function renderShowcase() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ProjectShowcase />
      </LanguageProvider>
    </MemoryRouter>,
  )
}

describe('ProjectShowcase', () => {
  it('reserves space while repositories load', () => {
    projects.value = { status: 'loading', projects: [] }
    renderShowcase()
    expect(screen.getByLabelText('Loading projects')).toHaveAttribute('aria-busy', 'true')
  })
  it('shows project actions and the homepage only when valid', () => {
    projects.value = {
      status: 'fresh',
      projects: [project, { ...project, id: 2, name: 'unsafe', homepage: 'javascript:alert(1)' }],
    }
    renderShowcase()
    expect(screen.getByRole('link', { name: /Ver online/ })).toHaveAttribute(
      'href',
      'https://example.com/',
    )
    expect(screen.getAllByRole('link', { name: /Detalhes/ })).toHaveLength(2)
    expect(screen.queryAllByRole('link', { name: /Ver online/ })).toHaveLength(1)
  })
  it('shows an empty or friendly unavailable message', () => {
    projects.value = { status: 'empty', projects: [] }
    const { rerender } = renderShowcase()
    expect(screen.getByRole('status')).toHaveTextContent('Ainda não há projetos')
    projects.value = { status: 'error', projects: [] }
    rerender(
      <MemoryRouter>
        <LanguageProvider>
          <ProjectShowcase />
        </LanguageProvider>
      </MemoryRouter>,
    )
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível carregar')
  })
})
