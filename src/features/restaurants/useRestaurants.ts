import { useQuery } from '@tanstack/react-query'
import { getRestaurants } from './restaurantService'

export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  })
}