import { cn } from '@/utils/cn'

interface LoaderProps {
  label?: string
  className?: string
}

export default function Loader({ label = 'Loading...', className }: LoaderProps) {
  return (
    <div
      role="status"
      className={cn('flex items-center justify-center gap-3 py-10 text-ink-soft', className)}
    >
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden="true"
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}