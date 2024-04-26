'use client'

// * import context
import AuthContext from '@/shared/context/AuthContext'

// * import type
import { AuthContextValue } from '@/shared/types/type'

// * import hook
import { useEffect, useState, useMemo } from 'react'

// * firebase
import { firebaseAuth } from '@/shared/firebase/firebaseClient'
import { User, onAuthStateChanged } from 'firebase/auth'

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authContextValue, setAuthContextValue] = useState<AuthContextValue | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Adds an observer for changes to the user's sign-in state.
    onAuthStateChanged(firebaseAuth, (user: User | null) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setAuthContextValue({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName!,
        })
      } else {
        // User is signed out
        setAuthContextValue(null)
      }
    })
  }, [])

  const memoizedAuthContext = useMemo(
    () => ({ authContextValue, setAuthContextValue, isLoading, setIsLoading }),
    [authContextValue, isLoading]
  )

  return <AuthContext.Provider value={memoizedAuthContext}>{children}</AuthContext.Provider>
}
