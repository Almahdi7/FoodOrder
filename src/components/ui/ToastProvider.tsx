import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { ToastContext } from './ToastContext'
import type { ToastItem, ToastType } from './ToastContext'

const DURATION = 4000

const styles: Record<ToastType, string> = {
  success: 'border-success bg-success-soft text-success',
  error: 'border-danger bg-danger-soft text-danger',
  info: 'border-line bg-surface text-ink',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback(
    (type: ToastType, message: string) => {
      const id = Date.now() + Math.random()
      setItems((prev) => [...prev, { id, type, message }])
      setTimeout(() => remove(id), DURATION)
    },
    [remove],
  )

  const value = useMemo(
    () => ({
      toast: {
        success: (m: string) => add('success', m),
        error: (m: string) => add('error', m),
        info: (m: string) => add('info', m),
      },
    }),
    [add],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
        aria-live="polite"
      >
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              'flex items-start justify-between gap-3 rounded-card border px-4 py-3 text-sm shadow-pop',
              styles[t.type],
            )}
          >
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="font-bold leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}