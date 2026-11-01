import { useState } from 'react'
import { useAddresses, useDeleteAddress } from './useAddresses'
import AddressForm from './AddressForm'
import { getErrorMessage } from '@/utils/getErrorMessage'

export default function AddressesPage() {
  const { data: addresses, isLoading, isError, error, refetch } = useAddresses()
  const deleteAddress = useDeleteAddress()

  // 'new' = the add form is open; an id = that address is being edited
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const handleDelete = (id: string) => {
    setDeleteError('')
    deleteAddress.mutate(id, {
      onSuccess: () => setConfirmId(null),
      onError: (err) => setDeleteError(getErrorMessage(err)),
    })
  }

  return (
    <div className="container-page py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">My addresses</h1>
          <p className="mt-1 text-sm text-ink-soft">Save the places you want your orders delivered to.</p>
        </div>
        {editingId !== 'new' && (
          <button className="btn btn-primary" onClick={() => setEditingId('new')}>
            Add address
          </button>
        )}
      </div>

      {editingId === 'new' && (
        <div className="card mt-6 p-5">
          <h2 className="section-title mb-4">New address</h2>
          <AddressForm onDone={() => setEditingId(null)} />
        </div>
      )}

      {deleteError && (
        <p role="alert" className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {deleteError}
        </p>
      )}

      <div className="mt-6">
        {isLoading && <p className="text-ink-soft">Loading your addresses...</p>}

        {isError && (
          <div className="card p-6">
            <p role="alert" className="text-danger">{getErrorMessage(error)}</p>
            <button className="btn btn-outline btn-sm mt-3" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        )}

        {addresses && addresses.length === 0 && editingId !== 'new' && (
          <div className="card p-8 text-center">
            <h2 className="section-title">No addresses yet</h2>
            <p className="mt-1 text-sm text-ink-soft">Add one now so checkout takes a few seconds.</p>
            <button className="btn btn-primary mt-4" onClick={() => setEditingId('new')}>
              Add your first address
            </button>
          </div>
        )}

        {addresses && addresses.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <li key={address.id} className="card p-5">
                {editingId === address.id ? (
                  <>
                    <h2 className="section-title mb-4">Edit address</h2>
                    <AddressForm address={address} onDone={() => setEditingId(null)} />
                  </>
                ) : (
                  <>
                    <h2 className="text-base">{address.label || 'Address'}</h2>
                    <p className="mt-1 text-sm">
                      {address.street}, {address.city}
                    </p>
                    {address.details && <p className="mt-1 text-sm text-ink-soft">{address.details}</p>}

                    {confirmId === address.id ? (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-sm">Delete this address?</span>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deleteAddress.isPending}
                          onClick={() => handleDelete(address.id)}
                        >
                          {deleteAddress.isPending ? 'Deleting...' : 'Yes, delete'}
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => setConfirmId(null)}>
                          Keep it
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 flex gap-2">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            setConfirmId(null)
                            setEditingId(address.id)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => {
                            setDeleteError('')
                            setConfirmId(address.id)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}