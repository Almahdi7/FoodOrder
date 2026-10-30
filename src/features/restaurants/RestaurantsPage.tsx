import { useMemo, useState } from 'react'
import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SearchBar from '@/components/SearchBar'
import { useDebounce } from '@/hooks/useDebounce'
import { useRestaurants } from './useRestaurants'
import RestaurantCard from './RestaurantCard'
import CuisineFilter from './CuisineFilter'

export default function RestaurantsPage() {
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data: allRestaurants } = useRestaurants()
  const cuisines = useMemo(
    () => [...new Set((allRestaurants ?? []).map((r) => r.cuisine))],
    [allRestaurants],
  )

  const { data, isLoading, isError, refetch } = useRestaurants({
    search: debouncedSearch,
    cuisine,
  })

  return (
    <div className="container-page py-10">
      <h1 className="page-title mb-6">Restaurants</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search restaurants by name"
        className="mb-4 max-w-md"
      />

      <div className="mb-6">
        <CuisineFilter options={cuisines} value={cuisine} onChange={setCuisine} />
      </div>

      {isLoading && <Loader label="Loading restaurants..." />}

      {isError && (
        <ErrorMessage message="Could not load restaurants." onRetry={() => refetch()} />
      )}

      {data && data.length === 0 && (
        <p className="text-ink-soft">No restaurants match your filters.</p>
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