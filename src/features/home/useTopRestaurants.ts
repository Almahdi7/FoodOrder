import { useQuery } from '@tanstack/react-query'
import { getTopRestaurants } from './homeService'

export function useTopRestaurants(limit = 3) {
  return useQuery({
    queryKey: ['restaurants', 'top', limit],
    queryFn: () => getTopRestaurants(limit),
  })
}