'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { logout } from '@/api/api'
import { useContext } from 'react'

// * import context
import { AuthContext } from '@/context/AuthContext'

export default function LogoutButton() {
  const auth = useContext(AuthContext)
  const router = useRouter()
  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          logout()
            .then(() => {
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
