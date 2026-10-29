import { useEffect, useRef } from 'react'

export default function ScrollReveal({
  as: Element = 'div',
  children,
  className = '',
  delay = 0,
  variant = 'text',
  ...props
}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !('IntersectionObserver' in window)) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    element.dataset.revealPending = 'true'
    element.style.setProperty('--reveal-delay', `${Math.min(delay, 320)}ms`)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        delete element.dataset.revealPending
        element.dataset.revealed = 'true'
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Element
      ref={elementRef}
      data-scroll-reveal="true"
      data-reveal-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </Element>
  )
}
