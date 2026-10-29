import ScrollReveal from './ScrollReveal.jsx'

export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`site-shell py-20 text-center md:py-28 ${className}`}>
      <div className="mb-10">
        <ScrollReveal
          as="p"
          className="scroll-reveal font-mono text-xs uppercase tracking-[.2em] accent"
        >
          {eyebrow}
        </ScrollReveal>
        <ScrollReveal
          as="h2"
          className="scroll-reveal mt-3 text-3xl font-black tracking-tight md:text-5xl"
          delay={90}
        >
          {title}
        </ScrollReveal>
      </div>
      {children}
    </section>
  )
}
