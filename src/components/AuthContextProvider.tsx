'use client'

// * import context
import { AuthContext } from '@/context/AuthContext'

// * import type
import { IAuthContext, AuthContextValue } from '@/type/type'

// * import constant
import { DEFAULT_AUTH } from '@/constant/constant'

// * import hook
import { useState } from 'react'

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // * 로컬 스토리지 값 사용
  const localStorageAuthContextValue = JSON.parse(localStorage.getItem('authContextValue')!)
  const [authContextValue, setAuthContextValue] = useState<AuthContextValue | null>(localStorageAuthContextValue)

  return (
    <AuthContext.Provider
      value={{
        authContextValue: authContextValue,
        setAuthContextValue: setAuthContextValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
