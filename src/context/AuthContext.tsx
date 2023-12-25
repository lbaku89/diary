'use client'

import { child } from 'firebase/database'
import { SessionProvider } from 'next-auth/react'

// interface AuthContextProps {
//   children: React.ReactNode
// }

// const AuthContext = ({ children }: AuthContextProps) => {
//   return <SessionProvider>{children}</SessionProvider>
// }

// export default AuthContext
import { AuthContextProps } from '@/type/type'
import { createContext } from 'react'

import { DEFAULT_AUTH } from '@/constant/constant'

export const AuthContext = createContext<AuthContextProps | null>(DEFAULT_AUTH)
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={DEFAULT_AUTH}>{children}</AuthContext.Provider>
}
