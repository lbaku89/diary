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
              router.push('/')
              auth!.setAuthContextValue(null)
            })
            .catch(() => {})
        }}
      >
        로그아웃
      </Button>
    </>
  )
}
