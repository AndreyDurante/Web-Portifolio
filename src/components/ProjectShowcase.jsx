import { useLanguage } from '../hooks/useLanguage.js'
import { useProjects } from '../hooks/useProjects.js'
import LoadingSkeleton from './LoadingSkeleton.jsx'
import ProjectCard from './ProjectCard.jsx'

export default function ProjectShowcase() {
  const { t } = useLanguage()
  const { status, projects } = useProjects()
  if (status === 'loading') return <LoadingSkeleton />
  if (!projects.length)
    return (
      <p
        role="status"
        className="surface mx-auto max-w-5xl rounded-2xl border border-token p-8 text-muted"
      >
        {status === 'error' ? t.showcase.error : t.showcase.empty}
      </p>
    )
  return (
    <div>
      {status === 'stale' && (
        <p role="status" className="mb-4 text-sm text-muted">
          {t.showcase.stale}
        </p>
      )}
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} delay={(index % 4) * 200} />
        ))}
      </div>
    </div>
  )
}
