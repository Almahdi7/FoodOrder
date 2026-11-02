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

const BAD_RESPONSE =
  'Unexpected API response. Check that .env.local has VITE_API_URL and that the mock API is running.'

function ensureArray<T>(data: unknown): T[] {
  if (!Array.isArray(data)) throw new Error(BAD_RESPONSE)
  return data as T[]
}

function ensureObject<T>(data: unknown): T {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error(BAD_RESPONSE)
  }
  return data as T
}

export async function getRestaurants(filters: RestaurantFilters = {}): Promise<Restaurant[]> {
  const { data } = await http.get<unknown>('/restaurants', {
    params: {
      name_like: filters.search || undefined,
      cuisine: filters.cuisine || undefined,
    },
  })
  return ensureArray<Restaurant>(data)
}

export async function getRestaurant(id: string): Promise<Restaurant> {
  const { data } = await http.get<unknown>(`/restaurants/${id}`)
  return ensureObject<Restaurant>(data)
}

export async function getCategories(restaurantId: string): Promise<Category[]> {
  const { data } = await http.get<unknown>(`/restaurants/${restaurantId}/categories`)
  return ensureArray<Category>(data)
}

export async function getProducts(
  restaurantId: string,
  filters: ProductFilters = {},
): Promise<Product[]> {
  const { data } = await http.get<unknown>(`/restaurants/${restaurantId}/products`, {
    params: {
      categoryId: filters.categoryId || undefined,
      name_like: filters.search || undefined,
    },
  })
  return ensureArray<Product>(data)
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await http.get<unknown>(`/products/${id}`)
  return ensureObject<Product>(data)
}