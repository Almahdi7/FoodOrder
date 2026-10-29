import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getRestaurants, type RestaurantFilters } from './restaurantService'

export function useRestaurants(filters: RestaurantFilters = {}) {
  return useQuery({
    queryKey: ['restaurants', filters],
    queryFn: () => getRestaurants(filters),
    placeholderData: keepPreviousData,
  })
}