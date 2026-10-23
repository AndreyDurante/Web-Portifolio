import { useId, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.js'

const keys = ['projects', 'technologies', 'competencies']

export default function ShowcaseTabs({ projectsPanel, technologiesPanel, competenciesPanel }) {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const id = useId()
  const refs = useRef([])
  const labels = [t.showcase.projects, t.showcase.technologies, t.showcase.competencies]
  const panels = [projectsPanel, technologiesPanel, competenciesPanel]
  function onKeyDown(event, index) {
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % keys.length
        : event.key === 'ArrowLeft'
          ? (index + keys.length - 1) % keys.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? keys.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    refs.current[next]?.focus()
  }
  return (
    <div>
      <div
        role="tablist"
        aria-label={t.showcase.title}
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {labels.map((label, index) => (
          <button
            key={keys[index]}
            ref={(element) => {
              refs.current[index] = element
            }}
            role="tab"
            id={`${id}-tab-${keys[index]}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`rounded-full border px-5 py-3 font-mono text-[10px] uppercase tracking-widest transition ${active === index ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]' : 'border-token text-muted'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${keys[active]}`}
        tabIndex={0}
      >
        {panels[active]}
      </div>
    </div>
  )
}
