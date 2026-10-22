export default function LoadingSkeleton() {
  return <div aria-label="Loading projects" aria-busy="true" className="grid min-h-64 gap-4 md:grid-cols-2"><span className="skeleton min-h-64 rounded-2xl" /><span className="skeleton min-h-64 rounded-2xl" /></div>
}
