import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addressService, type AddressInput } from '@/api/addressService'

export const addressKeys = { all: ['addresses'] as const }

// Also used by L's checkout to let the customer pick an address
export function useAddresses() {
  return useQuery({ queryKey: addressKeys.all, queryFn: addressService.list })
}

export function useSaveAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id?: string; values: AddressInput }) =>
      id ? addressService.update(id, values) : addressService.create(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
  })
}

export function useDeleteAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => addressService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
  })
}