import { cn } from '@/utils/cn'

interface CuisineFilterProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function CuisineFilter({ options, value, onChange }: CuisineFilterProps) {
  const all = ['', ...options]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by cuisine">
      {all.map((option) => {
        const active = option === value
        return (
          <button
            key={option || 'all'}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              'btn btn-sm rounded-full border',
              active
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-ink hover:bg-muted',
            )}
          >
            {option || 'All'}
          </button>
        )
      })}
    </div>
  )
}