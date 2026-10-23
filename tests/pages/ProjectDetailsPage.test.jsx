import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import ProjectDetailsPage from '../../src/pages/ProjectDetailsPage.jsx'
import { LanguageProvider } from '../../src/contexts/LanguageContext.jsx'
import { resolveReadmeImage } from '../../src/utils/readmeImages.js'

const mocks = vi.hoisted(() => ({
  projects: {
    status: 'fresh',
    projects: [{ id: 1, name: 'demo', full_name: 'AndreyDurante/demo', default_branch: 'main' }],
  },
  readme: {
    status: 'fresh',
    markdown: '# Technical details',
    path: 'README.md',
    defaultBranch: 'main',
  },
}))
vi.mock('../../src/hooks/useProjects.js', () => ({ useProjects: () => mocks.projects }))
vi.mock('../../src/hooks/useProjectReadme.js', () => ({ useProjectReadme: () => mocks.readme }))

function renderDetail() {
  return render(
    <MemoryRouter initialEntries={['/projetos/demo']}>
      <LanguageProvider>
        <Routes>
          <Route path="/projetos/:repo" element={<ProjectDetailsPage />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  )
}

describe('ProjectDetailsPage', () => {
  it('renders project README markdown', () => {
    renderDetail()
    expect(screen.getByRole('heading', { name: 'demo' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Technical details' })).toBeInTheDocument()
  })
  it('shows a friendly missing README message', () => {
    mocks.readme = { status: 'missing', markdown: '' }
    renderDetail()
    expect(screen.getByRole('status')).toHaveTextContent('não possui um README')
  })
  it('ignores raw HTML from project README content', () => {
    mocks.readme = {
      status: 'fresh',
      markdown: '<script>alert(1)</script>\n\nVisible text',
      path: 'README.md',
      defaultBranch: 'main',
    }
    const { container } = renderDetail()
    expect(container.querySelector('script')).not.toBeInTheDocument()
    expect(screen.getByText('Visible text')).toBeInTheDocument()
  })
  it('resolves safe relative image paths and rejects traversal and unsafe schemes', () => {
    expect(
      resolveReadmeImage('../secret.png', {
        owner: 'AndreyDurante',
        repo: 'demo',
        path: 'docs/README.md',
      }),
    ).toBe('https://raw.githubusercontent.com/AndreyDurante/demo/main/secret.png')
    expect(
      resolveReadmeImage('../../../secret.png', {
        owner: 'AndreyDurante',
        repo: 'demo',
        path: 'docs/README.md',
      }),
    ).toBe('')
    expect(
      resolveReadmeImage('javascript:alert(1)', { owner: 'AndreyDurante', repo: 'demo' }),
    ).toBe('')
    expect(
      resolveReadmeImage('img/a.png', {
        owner: 'AndreyDurante',
        repo: 'demo',
        branch: 'main',
        path: 'docs/README.md',
      }),
    ).toBe('https://raw.githubusercontent.com/AndreyDurante/demo/main/docs/img/a.png')
  })
})
