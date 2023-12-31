'use client'
import { Button } from '@mui/material'
import { login } from '@/api/api'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { AuthContextProps } from '@/type/type'

export const LoginButton = () => {
  const auth = useContext(AuthContext)
  const [currentAuth, setCurrentAuth] = useState<AuthContextProps | null>(auth)
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        login().then((res: AuthContextProps | null) => {
          if (res) {
            console.log(`${res.displayName}님 환영합니다😊`)
            router.push('/main')
            setCurrentAuth(res)
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
