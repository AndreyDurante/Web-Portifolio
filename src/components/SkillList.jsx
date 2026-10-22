export default function SkillList({ items }) {
  return <ul className="flex flex-wrap gap-3">{items.map((item) => <li key={item} className="surface rounded-full border border-token px-5 py-3 text-sm">{item}</li>)}</ul>
}
