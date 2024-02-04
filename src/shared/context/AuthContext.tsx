'use client'

// * import type
import { IAuthContext } from '@/shared/types/type'

// * import context관련
import { createContext } from 'react'
export const AuthContext = createContext<IAuthContext | null>(null)
