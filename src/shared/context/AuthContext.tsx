'use client'

// * import type
import { IAuthContext } from '@/shared/types/type'

// * import context관련
import { createContext } from 'react' // it only works in the client component

const AuthContext = createContext<IAuthContext | null>(null)

export default AuthContext
