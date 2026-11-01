import { useState } from 'react'
import { Link, useParams } from 'react-router'
import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useProduct, useRestaurant } from './useMenu'

export default function ProductDetailsPage() {
  const { id = '' } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)

  const productQuery = useProduct(id)
  const product = productQuery.data
  const restaurantQuery = useRestaurant(product ? String(product.restaurantId) : '')
  const restaurant = restaurantQuery.data

  if (productQuery.isLoading) return <Loader label="Loading product..." />

  if (productQuery.isError || !product) {
    return (
      <div className="container-page py-10">
        <ErrorMessage
          message="Could not load this product."
          onRetry={() => productQuery.refetch()}
        />
        <Link to="/restaurants" className="btn btn-outline btn-sm mt-4">
          Back to restaurants
        </Link>
      </div>
    )
  }

  const canOrder = product.isAvailable && (restaurant?.isOpen ?? true)

  return (
    <div className="container-page py-8">
      <Link
        to={`/restaurants/${product.restaurantId}`}
        className="btn btn-ghost btn-sm mb-4"
      >
        ← Back to menu
      </Link>

      <div className="card grid overflow-hidden md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover md:h-full"
        />

        <div className="p-6">
          {restaurant && (
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {restaurant.name}
            </Link>
          )}
          <h1 className="page-title mt-1">{product.name}</h1>
          <p className="mt-3 text-ink-soft">{product.description}</p>

          <p className="mt-5 text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>

          {!product.isAvailable && (
            <span className="badge mt-3 bg-danger-soft text-danger">Unavailable</span>
          )}
          {product.isAvailable && restaurant && !restaurant.isOpen && (
            <span className="badge mt-3 bg-danger-soft text-danger">
              Restaurant is closed
            </span>
          )}

          <div className="mt-6 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => q - 1)}
            >
              −
            </Button>
            <span className="w-8 text-center font-semibold" aria-live="polite">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              aria-label="Increase quantity"
              disabled={quantity >= 20}
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>

          <Button className="mt-5" size="lg" disabled>
            Add to cart · ${(product.price * quantity).toFixed(2)}
          </Button>
          <p className="mt-2 text-xs text-ink-soft">
            Cart is coming soon (it will be connected once the cart feature is merged).
          </p>
        </div>
      </div>
    </div>
  )
}