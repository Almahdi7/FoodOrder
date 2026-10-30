import { Link, useParams } from 'react-router'
import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { cn } from '@/utils/cn'
import { useProducts, useRestaurant } from './useMenu'
import ProductCard from './ProductCard'

export default function RestaurantMenuPage() {
  const { id = '' } = useParams<{ id: string }>()
  const restaurantQuery = useRestaurant(id)
  const productsQuery = useProducts(id)

  if (restaurantQuery.isLoading) return <Loader label="Loading restaurant..." />

  if (restaurantQuery.isError || !restaurantQuery.data) {
    return (
      <div className="container-page py-10">
        <ErrorMessage
          message="Could not load this restaurant."
          onRetry={() => restaurantQuery.refetch()}
        />
        <Link to="/restaurants" className="btn btn-outline btn-sm mt-4">
          Back to restaurants
        </Link>
      </div>
    )
  }

  const restaurant = restaurantQuery.data
  const products = productsQuery.data

  return (
    <div className="container-page py-8">
      <Link to="/restaurants" className="btn btn-ghost btn-sm mb-4">
        ← Back to restaurants
      </Link>

      <div className="card overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-48 w-full object-cover sm:h-64"
        />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="page-title">{restaurant.name}</h1>
            <span
              className={cn(
                'badge',
                restaurant.isOpen
                  ? 'bg-success-soft text-success'
                  : 'bg-danger-soft text-danger',
              )}
            >
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <p className="mt-1 text-ink-soft">
            {restaurant.cuisine} · <span className="text-rating">★</span>{' '}
            {restaurant.rating.toFixed(1)}
          </p>
          <p className="mt-2 text-sm">{restaurant.description}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
            <span>Delivery ${restaurant.deliveryFee.toFixed(2)}</span>
            <span>Min. order ${restaurant.minOrder}</span>
            <span>{restaurant.address}</span>
          </div>
        </div>
      </div>

      <h2 className="section-title mb-4 mt-8">Menu</h2>

      {productsQuery.isLoading && <Loader label="Loading menu..." />}

      {productsQuery.isError && (
        <ErrorMessage
          message="Could not load the menu."
          onRetry={() => productsQuery.refetch()}
        />
      )}

      {products && products.length === 0 && (
        <p className="text-ink-soft">This restaurant has no items yet.</p>
      )}

      {products && products.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}