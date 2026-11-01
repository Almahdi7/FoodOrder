import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSaveAddress } from './useAddresses'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { cn } from '@/utils/cn'
import type { Address } from '@/types'

const schema = z.object({
  label: z.string().trim().max(30, 'Use at most 30 characters').optional(),
  city: z.string().trim().min(2, 'Enter a city'),
  street: z.string().trim().min(3, 'Enter a street'),
  details: z.string().trim().max(120, 'Use at most 120 characters').optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  address?: Address // when given, the form edits this address
  onDone: () => void
}

export default function AddressForm({ address, onDone }: Props) {
  const saveAddress = useSaveAddress()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: address?.label ?? '',
      city: address?.city ?? '',
      street: address?.street ?? '',
      details: address?.details ?? '',
    },
  })

  const onSubmit = (values: FormValues) => {
    setServerError('')
    saveAddress.mutate(
      {
        id: address?.id,
        values: {
          label: values.label ?? '',
          city: values.city,
          street: values.street,
          details: values.details ?? '',
        },
      },
      {
        onSuccess: onDone,
        onError: (err) => setServerError(getErrorMessage(err)),
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
      <div>
        <label className="label" htmlFor="address-label">Label (optional)</label>
        <input
          id="address-label"
          placeholder="Home, Work..."
          aria-invalid={Boolean(errors.label)}
          className={cn('input', errors.label && 'input-error')}
          {...register('label')}
        />
        {errors.label && <p className="field-error">{errors.label.message}</p>}
      </div>

      <div>
        <label className="label" htmlFor="address-city">City</label>
        <input
          id="address-city"
          autoComplete="address-level2"
          placeholder="Amman"
          aria-invalid={Boolean(errors.city)}
          className={cn('input', errors.city && 'input-error')}
          {...register('city')}
        />
        {errors.city && <p className="field-error">{errors.city.message}</p>}
      </div>

      <div>
        <label className="label" htmlFor="address-street">Street</label>
        <input
          id="address-street"
          autoComplete="address-line1"
          placeholder="King Abdullah St"
          aria-invalid={Boolean(errors.street)}
          className={cn('input', errors.street && 'input-error')}
          {...register('street')}
        />
        {errors.street && <p className="field-error">{errors.street.message}</p>}
      </div>

      <div>
        <label className="label" htmlFor="address-details">Details (optional)</label>
        <input
          id="address-details"
          autoComplete="address-line2"
          placeholder="Building 5, floor 2"
          aria-invalid={Boolean(errors.details)}
          className={cn('input', errors.details && 'input-error')}
          {...register('details')}
        />
        {errors.details && <p className="field-error">{errors.details.message}</p>}
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger sm:col-span-2">
          {serverError}
        </p>
      )}

      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" disabled={saveAddress.isPending} className="btn btn-primary">
          {saveAddress.isPending ? 'Saving...' : address ? 'Save changes' : 'Add address'}
        </button>
        <button type="button" onClick={onDone} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  )
}