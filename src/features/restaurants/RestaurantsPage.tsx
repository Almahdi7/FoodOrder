import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useRestaurants } from './useRestaurants'
import RestaurantCard from './RestaurantCard'

export default function RestaurantsPage() {
  const { data, isLoading, isError, refetch } = useRestaurants()

  if (isLoading) return <Loader label="Loading restaurants..." />

  if (isError) {
    return (
      <div className="container-page py-10">
        <ErrorMessage
          message="Could not load restaurants."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      <h1 className="page-title mb-6">Restaurants</h1>
           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}