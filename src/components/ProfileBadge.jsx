import { useRef } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function ProfileBadge({
  ariaLabel = 'Interactive portfolio badge',
  fieldLabel = 'Software Development',
  degreeLabel = 'Software Engineering',
  portfolioLabel = 'Portfolio',
  photoLabel = 'Photo',
  moveHelp = 'Drag the badge or use the arrow keys to move it.',
}) {
  const sceneRef = useRef(null)
  const cardRef = useRef(null)
  const dragRef = useRef(null)

  function limits() {
    const scene = sceneRef.current
    const card = cardRef.current
    if (!scene || !card) return { x: 0, y: 0 }
    return {
      x: Math.max(0, (scene.clientWidth - card.offsetWidth) / 2) * 2.7,
      y: Math.max(0, (scene.clientHeight - card.offsetHeight) / 2) * 2.7,
    }
  }

  function position() {
    const card = cardRef.current
    if (card && typeof DOMMatrix !== 'undefined') {
      const transform = window.getComputedStyle(card).transform
      if (transform !== 'none') {
        const matrix = new DOMMatrix(transform)
        return { x: matrix.m41, y: matrix.m42 }
      }
    }
    return {
      x: Number.parseFloat(card?.style.getPropertyValue('--badge-x')) || 0,
      y: Number.parseFloat(card?.style.getPropertyValue('--badge-y')) || 0,
    }
  }

  function setPosition(x, y) {
    const card = cardRef.current
    if (!card) return
    const max = limits()
    card.style.setProperty('--badge-x', `${clamp(x, -max.x, max.x)}px`)
    card.style.setProperty('--badge-y', `${clamp(y, -max.y, max.y)}px`)
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return
    if (event.pointerType === 'mouse') event.preventDefault()
    const current = position()
    setPosition(current.x, current.y)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: current.x,
      originY: current.y,
    }
    event.currentTarget.dataset.dragging = 'true'
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus({ preventScroll: true })
  }

  function handlePointerMove(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    setPosition(drag.originX + dx, drag.originY + dy)
    event.currentTarget.style.setProperty('--badge-rotate-x', `${clamp(-dy * 0.12, -9, 9)}deg`)
    event.currentTarget.style.setProperty('--badge-rotate-y', `${clamp(dx * 0.12, -9, 9)}deg`)
  }

  function finishDrag(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return
    dragRef.current = null
    delete cardRef.current.dataset.dragging
    setPosition(0, 0)
    cardRef.current.style.setProperty('--badge-rotate-x', '0deg')
    cardRef.current.style.setProperty('--badge-rotate-y', '0deg')
  }

  function handleKeyDown(event) {
    const movement = {
      ArrowLeft: [-12, 0],
      ArrowRight: [12, 0],
      ArrowUp: [0, -12],
      ArrowDown: [0, 12],
    }[event.key]
    if (!movement) return
    event.preventDefault()
    const current = position()
    setPosition(current.x + movement[0], current.y + movement[1])
  }

  function handleKeyUp(event) {
    if (!event.key.startsWith('Arrow')) return
    setPosition(0, 0)
  }

  return (
    <div
      ref={sceneRef}
      className="badge-scene relative aspect-[4/5] w-full overflow-visible"
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <p id="badge-move-help" className="sr-only">
        {moveHelp}
      </p>
      <article
        ref={cardRef}
        className="badge-card absolute left-[14%] top-[8%] z-[1] h-[84%] w-[72%]"
        role="group"
        aria-label={ariaLabel}
        aria-describedby="badge-move-help"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPointerDown={handlePointerDown}
      >
        <div className="badge-card-face relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-token bg-[var(--surface)] p-4 text-left sm:p-5">
          <div className="badge-card-top flex items-center justify-between border-b border-token pb-2">
            <span className="badge-monogram flex h-8 w-8 items-center justify-center rounded-full bg-[var(--foreground)] font-mono text-xs font-bold text-[var(--background)]">
              AD
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[.22em] text-muted sm:text-[9px]">
              FIAP
            </span>
          </div>

          <div className="badge-photo-slot mx-auto my-1 flex h-[40%] w-[42%] flex-none aspect-[4/5] items-center justify-center rounded-md border border-dashed border-token">
            <span className="badge-photo-placeholder font-mono text-[9px] uppercase tracking-[.16em]">
              foto
            </span>
          </div>

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[.2em] accent sm:text-[9px]">
              {fieldLabel}
            </p>
            <p className="mt-1 text-lg font-black leading-none tracking-tight sm:text-xl">
              Andrey Durante
            </p>
            <p className="mt-1 text-[10px] leading-4 text-muted sm:text-xs">{degreeLabel}</p>
          </div>

          <div className="mt-2 flex items-end justify-between border-t border-token pt-3">
            <span className="font-mono text-[8px] uppercase tracking-[.18em] text-muted">
              {portfolioLabel}
            </span>
            <svg
              aria-hidden="true"
              className="h-5 w-14 text-[var(--foreground)]"
              viewBox="0 0 56 20"
              fill="none"
            >
              <path
                d="M1 2v16M5 2v16M10 2v16M17 2v16M20 2v16M25 2v16M31 2v16M34 2v16M39 2v16M46 2v16M50 2v16M55 2v16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="badge-card-edge absolute inset-x-1 bottom-[-7px] top-1 -z-10 rounded-[1.15rem] border border-[color-mix(in_srgb,var(--foreground)_24%,transparent)] bg-[var(--foreground)]" />
      </article>
    </div>
  )
}
