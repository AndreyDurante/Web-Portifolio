export default function Section({ id, eyebrow, title, children, className = '' }) {
  return <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28 ${className}`}><div className="mb-10"><p className="font-mono text-xs uppercase tracking-[.2em] accent">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">{title}</h2></div>{children}</section>
}
