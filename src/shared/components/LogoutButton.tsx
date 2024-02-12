'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { logout } from '@/shared/api/api'
import { useContext } from 'react'

// * import context
import { AuthContext } from '@/shared/context/AuthContext'

// * import utils
import { Utils } from '@/shared/utils/utility'

export default function LogoutButton() {
  const auth = useContext(AuthContext)
  const router = useRouter()
  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          // 로그인 페이지 화면 Loading 처리
          auth!.setIsLoading(true)
          logout()
            .then(() => {
              Utils.deleteCookie({ cookieName: 'isLoggedIn' })
              router.push('/login')
            })
            .catch((err) => {
              alert(err)
            })
            .finally(() => {
              auth!.setIsLoading(false)
            })
        }}
      >
        로그아웃
      </Button>
    </>
  )
}
