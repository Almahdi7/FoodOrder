import { useId, type ComponentProps } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends ComponentProps<'input'> {
  label?: string
  error?: string
}

export default function Input({ label, error, id, className, ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div>
      {label && (
        <label className="label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn('input', error && 'input-error', className)}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}