import { http } from '@/api/http'
import type { Restaurant } from './types'

export async function getRestaurants(): Promise<Restaurant[]> {
  const { data } = await http.get<Restaurant[]>('/restaurants')
  return data
}