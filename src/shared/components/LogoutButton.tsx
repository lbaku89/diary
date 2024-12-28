'use client'

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { logout } from '@/shared/api/api'

export default function LogoutButton() {
  const router = useRouter()
  const handleClickLogoutBtn = () => {
    logout()
      .then(() => {
        alert('로그아웃 되었습니다.')
        router.push('/login')
      })
      .catch(() => {
        alert('처리하는 도중 문제가 발생하였습니다.')
      })
  }

  return (
    <Button variant="text" onClick={handleClickLogoutBtn}>
      로그아웃
    </Button>
  )
}
