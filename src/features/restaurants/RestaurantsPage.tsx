import { useState } from 'react'
import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SearchBar from '@/components/SearchBar'
import { useDebounce } from '@/hooks/useDebounce'
import { useRestaurants } from './useRestaurants'
import RestaurantCard from './RestaurantCard'

export default function RestaurantsPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isError, refetch } = useRestaurants({ search: debouncedSearch })

  return (
    <div className="container-page py-10">
      <h1 className="page-title mb-6">Restaurants</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search restaurants by name"
        className="mb-6 max-w-md"
      />

      {isLoading && <Loader label="Loading restaurants..." />}

      {isError && (
        <ErrorMessage message="Could not load restaurants." onRetry={() => refetch()} />
      )}

      {data && data.length === 0 && (
        <p className="text-ink-soft">No restaurants match your search.</p>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}