import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage.js'
import { useProjects } from '../hooks/useProjects.js'
import { useProjectReadme } from '../hooks/useProjectReadme.js'
import { resolveReadmeImage } from '../utils/readmeImages.js'
import { OWNER } from '../services/githubService.js'

function DocumentContent({ project, state, t }) {
  if (state.status === 'loading') return <div role="status" className="skeleton min-h-[50vh] rounded-2xl" aria-label={t.details.loading} />
  if (state.status === 'missing' || state.status === 'error') return <p role="status" className="surface rounded-2xl border border-token p-8 text-muted">{state.status === 'missing' ? t.details.missing : t.details.error}</p>
  return <div className="surface rounded-2xl border border-token p-6 sm:p-10"><div className="readme-markdown max-w-none">{state.status === 'stale' && <p>{t.details.stale}</p>}<ReactMarkdown skipHtml components={{ img: ({ src, alt = '' }) => { const resolved = resolveReadmeImage(src, { owner: OWNER, repo: project.name, branch: state.defaultBranch || project.default_branch, path: state.path }); return resolved ? <img src={resolved} alt={alt} loading="lazy" /> : null } }}>{state.markdown}</ReactMarkdown></div></div>
}

export default function ProjectDetailsPage() {
  const { repo = '' } = useParams()
  const { t } = useLanguage()
  const { status, projects } = useProjects()
  const project = projects.find((item) => item.name.toLowerCase() === repo.toLowerCase())
  const document = useProjectReadme(project?.name || '', project?.default_branch || 'main')
  return <main className="mx-auto min-h-screen w-full max-w-4xl px-5 pb-20 pt-28 md:px-8"><Link to="/#projetos" className="mb-8 inline-flex font-mono text-xs uppercase tracking-wider text-muted hover:text-[var(--accent)]">← {t.details.back}</Link>{status === 'loading' ? <div className="skeleton min-h-96 rounded-2xl" aria-label={t.showcase.loading} /> : project ? <><p className="font-mono text-[10px] uppercase tracking-[.2em] accent">{project.full_name}</p><h1 className="my-5 break-words text-4xl font-black tracking-tight md:text-6xl">{project.name}</h1><DocumentContent project={project} state={document} t={t} /></> : <p role="status" className="surface rounded-2xl border border-token p-8 text-muted">{status === 'error' ? t.showcase.error : t.notFound.description}</p>}</main>
}
