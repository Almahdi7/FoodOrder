import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  getCategories,
  getProduct,
  getProducts,
  getRestaurant,
  type ProductFilters,
} from './restaurantService'

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id),
    enabled: Boolean(id),
  })
}

export function useCategories(restaurantId: string) {
  return useQuery({
    queryKey: ['categories', restaurantId],
    queryFn: () => getCategories(restaurantId),
    enabled: Boolean(restaurantId),
  })
}

export function useProducts(restaurantId: string, filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', restaurantId, filters],
    queryFn: () => getProducts(restaurantId, filters),
    enabled: Boolean(restaurantId),
    placeholderData: keepPreviousData,
  })
}
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  })
}