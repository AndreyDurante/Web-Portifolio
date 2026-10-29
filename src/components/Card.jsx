import ScrollReveal from './ScrollReveal.jsx'

export default function Card({ as: Tag = 'article', className = '', children, delay = 0, ...props }) {
  return (
    <ScrollReveal
      as={Tag}
      variant="block"
      delay={delay}
      className={`scroll-reveal surface rounded-2xl border border-token ${className}`}
      {...props}
    >
      {children}
    </ScrollReveal>
  )
}
