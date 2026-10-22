export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const style = variant === 'primary' ? 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-80' : 'border border-token hover:border-[var(--accent)]'
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition ${style} ${className}`} {...props}>{children}</button>
}
