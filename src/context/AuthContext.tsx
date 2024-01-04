'use client'

// * import type
import { AuthContextValue, AuthContext } from '@/type/type'

// * import context관련
import { createContext } from 'react'
export const authContext = createContext<AuthContext | null>(null)
