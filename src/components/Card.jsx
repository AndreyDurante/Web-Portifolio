export default function Card({ as: Tag = 'article', className = '', children, ...props }) {
  return (
    <Tag className={`surface rounded-2xl border border-token ${className}`} {...props}>
      {children}
    </Tag>
  )
}
