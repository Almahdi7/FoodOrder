import { Link } from 'react-router'
import { cn } from '@/utils/cn'
import type { Restaurant } from './types'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { id, name, cuisine, description, image, rating, deliveryFee, minOrder, isOpen } =
    restaurant

  return (
    <Link
      to={`/restaurants/${id}`}
      className="card block overflow-hidden transition-shadow hover:shadow-pop"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={cn('h-40 w-full object-cover', !isOpen && 'grayscale')}
        />
        <span
          className={cn(
            'badge absolute left-3 top-3',
            isOpen ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger',
          )}
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="section-title">{name}</h2>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
            <span className="text-rating" aria-hidden="true">★</span>
            {rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{cuisine}</p>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{description}</p>

        <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-ink-soft">
          <span>Delivery ${deliveryFee.toFixed(2)}</span>
          <span>Min. order ${minOrder}</span>
        </div>
      </div>
    </Link>
  )
}