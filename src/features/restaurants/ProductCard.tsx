import { Link } from 'react-router'
import { cn } from '@/utils/cn'
import type { Product } from './types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, description, price, image, isAvailable } = product

  return (
    <Link
      to={`/products/${id}`}
      className={cn(
        'card flex overflow-hidden transition-shadow hover:shadow-pop',
        !isAvailable && 'opacity-60',
      )}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="h-28 w-28 shrink-0 object-cover sm:h-32 sm:w-32"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-semibold text-ink">{name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary">${price.toFixed(2)}</span>
          {!isAvailable && (
            <span className="badge bg-danger-soft text-danger">Unavailable</span>
          )}
        </div>
      </div>
    </Link>
  )
}