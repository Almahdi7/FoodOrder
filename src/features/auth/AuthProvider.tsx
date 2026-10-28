import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/features/auth/AuthService'
import { UNAUTHORIZED_EVENT } from '@/api/http'
import { tokenStorage } from '@/utils/tokenStorage'
import type { User } from '@/types'
import { AuthContext, type AuthContextValue } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(tokenStorage.get()))

  // On app start: if a token exists, load the current user
  useEffect(() => {
    if (!tokenStorage.get()) return
    authService
      .me()
      .then(setUser)
      .catch(() => tokenStorage.clear())
      .finally(() => setIsLoading(false))
  }, [])

  // The http client fires this event on any 401
  useEffect(() => {
    const onUnauthorized = () => setUser(null)
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const login = useCallback<AuthContextValue['login']>(async (payload) => {
    const { user, token } = await authService.login(payload)
    tokenStorage.set(token)
    setUser(user)
    return user
  }, [])

  const register = useCallback<AuthContextValue['register']>(async (payload) => {
    const { user, token } = await authService.register(payload)
    tokenStorage.set(token)
    setUser(user)
    return user
  }, [])

  const logout = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
