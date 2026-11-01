export interface Restaurant {
  id: number
  name: string
  cuisine: string
  description: string
  image: string
  address: string
  phone: string
  isOpen: boolean
  rating: number
  deliveryFee: number
  minOrder: number
}

export interface Category {
  id: number
  restaurantId: number
  name: string
}

export interface Product {
  id: number
  restaurantId: number
  categoryId: number
  name: string
  description: string
  price: number
  image: string
  isAvailable: boolean
}