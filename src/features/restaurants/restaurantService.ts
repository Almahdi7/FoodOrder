import { http } from '@/api/http'
import type { Restaurant } from './types'

export interface RestaurantFilters {
  search?: string
  cuisine?: string
}

export async function getRestaurants(filters: RestaurantFilters = {}): Promise<Restaurant[]> {
  const { data } = await http.get<Restaurant[]>('/restaurants', {
    params: {
      name_like: filters.search || undefined,
      cuisine: filters.cuisine || undefined,
    },
  })
  return data
}