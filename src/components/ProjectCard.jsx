import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import { useLanguage } from '../hooks/useLanguage.js'
import images from '../data/projectImages.js'

function safeHomepage(value) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

export default function ProjectCard({ project }) {
  const { t } = useLanguage()
  const homepage = safeHomepage(project.homepage)
  const image = images[project.name]
  return (
    <Card className="group flex min-h-64 flex-col items-center overflow-hidden p-6 text-center transition hover:-translate-y-1 hover:border-[var(--accent)]">
      {image && (
        <img
          src={image}
          alt=""
          width="640"
          height="360"
          loading="lazy"
          className="mb-5 aspect-video w-full rounded-xl object-cover"
        />
      )}
      <p className="font-mono text-[10px] uppercase tracking-[.2em] accent">{project.name}</p>
      <h3 className="mt-3 break-words text-2xl font-bold tracking-tight">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">
        {project.description || t.showcase.noDescription}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          className="inline-flex min-h-10 items-center rounded-full bg-[var(--foreground)] px-4 font-mono text-[10px] uppercase tracking-wider text-[var(--background)]"
          to={`/projetos/${encodeURIComponent(project.name)}`}
        >
          {t.showcase.details}
        </Link>
        {homepage && (
          <a
            className="inline-flex min-h-10 items-center rounded-full border border-token px-4 font-mono text-[10px] uppercase tracking-wider"
            href={homepage}
            target="_blank"
            rel="noreferrer"
          >
            {t.showcase.online}
            <span className="sr-only">: {project.name}</span>
          </a>
        )}
      </div>
    </Card>
  )
}
