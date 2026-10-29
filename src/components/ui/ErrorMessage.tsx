import { cn } from '@/utils/cn'
import Button from './Button'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  className?: string
}

export default function ErrorMessage({ message, onRetry, className }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn('rounded-card border border-danger/30 bg-danger-soft p-4 text-danger', className)}
    >
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}