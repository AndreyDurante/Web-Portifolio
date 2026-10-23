export default function LoadingSkeleton() {
  return (
    <div
      aria-label="Loading projects"
      aria-busy="true"
      className="mx-auto grid min-h-64 max-w-5xl gap-4 md:grid-cols-2"
    >
      <span className="skeleton min-h-64 rounded-2xl" />
      <span className="skeleton min-h-64 rounded-2xl" />
    </div>
  )
}
