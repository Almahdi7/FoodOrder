import axios from 'axios'
import type { ApiError } from '@/types'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.error?.message ?? error.message
  }
  return 'Something went wrong. Please try again.'
}
