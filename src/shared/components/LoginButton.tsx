'use client'

import { Button } from '@mui/material'
import { login, addFirstVisitUser } from '@/shared/api/api'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AuthContextValue } from '@/shared/types/type'
import AuthContext from '@/shared/context/AuthContext'
import Image from 'next/image'
import getTodayInfo from '../utils/getTodayInfo'

export default function LoginButton() {
  const context = useContext(AuthContext)
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        // 로그인 페이지 화면 Loading 처리
        context!.setIsLoading(true)
        login()
          .then((res: AuthContextValue | null) => {
            if (res) {
              console.log(`${res.displayName}님 환영합니다😊`)
              addFirstVisitUser(res)
              const todayInfo = getTodayInfo()
              router.push(`/?year=${todayInfo.year}&month=${todayInfo.month}`)
            }
          })
          .finally(() => {
            context!.setIsLoading(false)
          })
      }}
      color="primary"
      variant="contained"
      size="large"
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: '#fff',
        color: 'black',
        ':hover': { backgroundColor: '#fff' },
      }}
    >
      <Image alt="google_icon" src="/images/google_icon.png" width={20} height={20} style={{ marginRight: '0.4rem' }} />
      구글 계정으로 로그인
    </Button>
  )
}
