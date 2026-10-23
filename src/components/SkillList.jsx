import {
  siCss,
  siFigma,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siPython,
  siReact,
  siTailwindcss,
} from 'simple-icons'

const technologyIcons = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  React: siReact,
  'Node.js': siNodedotjs,
  Python: siPython,
  'Tailwind CSS': siTailwindcss,
  'UX/UI': siFigma,
}

export default function SkillList({ items, showIcons = false }) {
  if (showIcons) {
    return (
      <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
        {items.map((item) => {
          const icon = technologyIcons[item]

          return (
            <li
              key={item}
              className="surface flex min-h-28 min-w-28 flex-col items-center justify-center gap-3 rounded-2xl border border-token px-4 py-4 text-sm"
            >
              {icon && (
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0"
                  fill={`#${icon.hex}`}
                  viewBox="0 0 24 24"
                >
                  <path d={icon.path} />
                </svg>
              )}
              <span>{item}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
      {items.map((item) => (
        <li key={item} className="surface rounded-full border border-token px-5 py-3 text-sm">
          {item}
        </li>
      ))}
    </ul>
  )
}
