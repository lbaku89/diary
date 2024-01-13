'use client'

// * import component
import { Button } from '@mui/material'

// * import api
import { login, addFirstVisitUser } from '@/api/api'

// * import routing
import { useRouter } from 'next/navigation'

// * import hook
import { useContext } from 'react'

// * import type
import { AuthContextValue } from '@/type/type'

// * import context
import { AuthContext } from '@/context/AuthContext'

// * import
import Image from 'next/image'

export const LoginButton = () => {
  const context = useContext(AuthContext)
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        login().then((res: AuthContextValue | null) => {
          if (res) {
            console.log(`${res.displayName}님 환영합니다😊`)
            localStorage.setItem('authContextValue', JSON.stringify(res))
            context!.setAuthContextValue(res)
            addFirstVisitUser(res)
            router.push('/main')
          }
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
      <Image
        alt="google_icon"
        src={'/images/google_icon.png'}
        width={20}
        height={20}
        style={{ marginRight: '0.4rem' }}
      ></Image>
      구글 계정으로 로그인
    </Button>
  )
}
