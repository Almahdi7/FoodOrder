import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="container-page py-16">
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="font-display text-6xl font-bold text-primary">404</p>
        <h1 className="page-title mt-2">Page not found</h1>
        <p className="mt-2 text-ink-soft">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go to home
          </Link>
          <Link to="/restaurants" className="btn btn-outline">
            Browse restaurants
          </Link>
        </div>
      </div>
    </div>
  )
}