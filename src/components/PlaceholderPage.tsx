export default function PlaceholderPage({ title, owner }: { title: string; owner: string }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">Placeholder. Owner: {owner}</p>
    </div>
  )
}
