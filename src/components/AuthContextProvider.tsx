'use client'

// * import context
import { authContext } from '@/context/authContext'

// * import type
import { AuthContext, AuthContextValue } from '@/type/type'

// * import constant
import { DEFAULT_AUTH } from '@/constant/constant'

// * import hook
import { useState } from 'react'

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // * 로컬 스토리지 값 사용
  const localStorageAuthContextValue = JSON.parse(localStorage.getItem('authContextValue')!)
  const [authContextValue, setAuthContextValue] = useState<AuthContextValue | null>(localStorageAuthContextValue)

  return (
    <authContext.Provider
      value={{
        authContextValue: authContextValue,
        setAuthContextValue: setAuthContextValue,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
