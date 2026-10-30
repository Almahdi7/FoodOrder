import { http } from './http'
import type { Address } from '@/types'

export type AddressInput = Omit<Address, 'id' | 'userId'>

export const addressService = {
  list: () => http.get<Address[]>('/addresses').then((r) => r.data),

  create: (payload: AddressInput) =>
    http.post<Address>('/addresses', payload).then((r) => r.data),

  update: (id: string, payload: Partial<AddressInput>) =>
    http.patch<Address>(`/addresses/${id}`, payload).then((r) => r.data),

  remove: (id: string) => http.delete(`/addresses/${id}`).then(() => undefined),
}
