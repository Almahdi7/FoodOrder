import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useAuth } from '@/features/auth/UseAuth'
import RestaurantCard from '@/features/restaurants/RestaurantCard'
import { useTopRestaurants } from './useTopRestaurants'

const STEPS = [
  { title: 'Choose a restaurant', text: 'Browse restaurants and find what you feel like eating.' },
  { title: 'Build your order', text: 'Pick your dishes, set the quantity and add them to your cart.' },
  { title: 'Get it delivered', text: 'Confirm your order and follow it until it reaches your door.' },
]

export default function HomePage() {
  const { user } = useAuth()
  const topQuery = useTopRestaurants()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const term = query.trim()
    navigate(term ? `/restaurants?search=${encodeURIComponent(term)}` : '/restaurants')
  }

  return (
    <div>
      <section className="bg-primary-soft">
        <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
          <div>
            <span className="badge bg-primary text-white">Fast delivery</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Hungry? Your favorite food, delivered.
            </h1>
            <p className="mt-4 text-lg text-ink-soft">
              Pick a restaurant, build your order and track it until it reaches your door.
            </p>

            <form onSubmit={handleSearch} className="mt-6 flex max-w-md gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search restaurants by name"
                className="input flex-1"
                aria-label="Search restaurants"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/restaurants" className="btn btn-primary btn-lg">
                Order now
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-outline btn-lg">
                  Create account
                </Link>
              )}
            </div>
          </div>

          <div
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card bg-primary shadow-pop"
            aria-hidden="true"
          >
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-56 w-56 rounded-full bg-white/10" />
            <svg
              viewBox="0 0 120 120"
              className="relative h-40 w-40 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="60" cy="60" r="34" />
              <circle cx="60" cy="60" r="20" opacity="0.5" />
              <path d="M14 28v22a7 7 0 0 0 14 0V28M21 28v64" />
              <path d="M106 28c-13 12-13 38 0 50v14" />
            </svg>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Top rated restaurants</h2>
            <p className="text-sm text-ink-soft">Loved by our customers</p>
          </div>
          <Link to="/restaurants" className="btn btn-ghost btn-sm">
            View all →
          </Link>
        </div>

        {topQuery.isLoading && <Loader label="Loading restaurants..." />}

        {topQuery.isError && (
          <ErrorMessage
            message="Could not load restaurants."
            onRetry={() => topQuery.refetch()}
          />
        )}

        {topQuery.data && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topQuery.data.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-primary-soft">
        <div className="container-page py-12">
          <h2 className="section-title mb-8 text-center">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className="card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}