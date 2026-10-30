import { http } from '@/api/http'
import type { Category, Product, Restaurant } from './types'

export interface RestaurantFilters {
  search?: string
  cuisine?: string
}

export interface ProductFilters {
  categoryId?: number
  search?: string
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

export async function getRestaurant(id: string): Promise<Restaurant> {
  const { data } = await http.get<Restaurant>(`/restaurants/${id}`)
  return data
}

export async function getCategories(restaurantId: string): Promise<Category[]> {
  const { data } = await http.get<Category[]>(`/restaurants/${restaurantId}/categories`)
  return data
}

export async function getProducts(
  restaurantId: string,
  filters: ProductFilters = {},
): Promise<Product[]> {
  const { data } = await http.get<Product[]>(`/restaurants/${restaurantId}/products`, {
    params: {
      categoryId: filters.categoryId || undefined,
      name_like: filters.search || undefined,
    },
  })
  return data
}