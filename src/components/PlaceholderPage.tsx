export default function PlaceholderPage({ title, owner }: { title: string; owner: string }) {
  return (
    <div className="container-page py-10">
      <div className="card p-8">
        <h1 className="page-title">{title}</h1>
        <p className="mt-2 text-ink-soft">
          This page is not built yet. Owner:{" "}
          <span className="badge bg-primary-soft text-primary-dark">{owner}</span>
        </p>
      </div>
    </div>
  );
}