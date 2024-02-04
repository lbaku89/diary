'use client'

// * import context
import { AuthContext } from '@/shared/context/AuthContext'

// * import type
import { AuthContextValue } from '@/shared/types/type'

// * import hook
import { useEffect, useState } from 'react'

// * import
import { onAuthStateChanged } from 'firebase/auth'

// * firebase
import { firebaseAuth } from '@/shared/firebase/firebaseClient'
import { User } from 'firebase/auth'

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authContextValue, setAuthContextValue] = useState<AuthContextValue | null>(null)

  useEffect(() => {
    // Adds an observer for changes to the user's sign-in state.
    onAuthStateChanged(firebaseAuth, (user: User | null) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setAuthContextValue!({
          uid: user!.uid,
          email: user!.email!,
          displayName: user!.displayName!,
        })
      } else {
        // User is signed out
        setAuthContextValue!(null)
      }
    })
  }, [])
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
