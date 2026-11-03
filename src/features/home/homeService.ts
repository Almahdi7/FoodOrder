import { http } from '@/api/http'
import type { Restaurant } from '@/features/restaurants/types'

export async function getTopRestaurants(limit = 3): Promise<Restaurant[]> {
  const { data } = await http.get<unknown>('/restaurants', {
    params: { _sort: 'rating', _order: 'desc', _limit: limit },
  })
  if (!Array.isArray(data)) {
    throw new Error('Unexpected API response. Check .env.local and the mock API.')
  }
  return data as Restaurant[]
}