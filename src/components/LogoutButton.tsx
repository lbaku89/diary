'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { logout } from '@/api/api'
import { useContext, useState } from 'react'
import { AuthContextProps } from '@/type/type'
import { AuthContext } from '@/context/AuthContext'

export default function LogoutButton() {
  const auth = useContext(AuthContext)
  const [currentAuth, setCurrentAuth] = useState<AuthContextProps | null>(auth)
  const router = useRouter()
  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          logout()
            .then(() => {
              router.push('/')
              setCurrentAuth(null)
            })
            .catch(() => {})
        }}
      >
        로그아웃
      </Button>
    </>
  )
}
