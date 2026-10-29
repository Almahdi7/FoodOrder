export interface User {
  name: string
  role: 'customer' | 'owner'
}

export interface ApiError {
  error?: {
    message?: string
  }
}
