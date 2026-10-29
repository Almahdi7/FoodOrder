import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useRestaurants } from './useRestaurants'

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
      <ul className="list-disc pl-5">
        {data?.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  )
}