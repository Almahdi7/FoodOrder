import { cn } from '@/utils/cn'
import type { Category } from './types'

interface CategoryFilterProps {
  categories: Category[]
  value: number
  onChange: (categoryId: number) => void
}

export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  const options = [{ id: 0, name: 'All' }, ...categories]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {options.map(({ id, name }) => {
        const active = id === value
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={cn(
              'btn btn-sm rounded-full border',
              active
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-ink hover:bg-muted',
            )}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}