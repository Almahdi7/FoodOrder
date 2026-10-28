import type { User } from '@/types'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  phone?: string
  role: 'customer' | 'owner'
}

export interface AuthResponse {
  user: User
  token: string
}
