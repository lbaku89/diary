'use client'

// * import component
import { Button } from '@mui/material'

// * import api
import { login } from '@/api/api'

// * import routing
import { useRouter } from 'next/navigation'

// * import hook
import { useContext } from 'react'

// * import type
import { AuthContextValue } from '@/type/type'

// * import context
import { authContext } from '@/context/authContext'

export const LoginButton = () => {
  const context = useContext(authContext)
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        login().then((res: AuthContextValue | null) => {
          if (res) {
            console.log(`${res.displayName}님 환영합니다😊`)
            router.push('/main')
            context!.setAuthContextValue(res)
          }
        })
      }}
      color="primary"
      variant="contained"
      size="medium"
      sx={{ boxSizing: 'border-box', width: '100%' }}
    >
      log in
    </Button>
  )
}
