'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { logout } from '@/api/api'
import { useContext } from 'react'

// * import context
import { authContext } from '@/context/authContext'

export default function LogoutButton() {
  const auth = useContext(authContext)
  const router = useRouter()
  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          logout()
            .then(() => {
              localStorage.setItem('authContextValue', JSON.stringify(null))
              auth!.setAuthContextValue(null)
              router.push('/')
            })
            .catch(() => {})
        }}
      >
        로그아웃
      </Button>
    </>
  )
}
