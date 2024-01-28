'use client'

// * import component
import { Button } from '@mui/material'

// * import api
import { login, addFirstVisitUser } from '@/shared/api/api'

// * import routing
import { useRouter } from 'next/navigation'

// * import hook
import { useContext } from 'react'

// * import type
import { AuthContextValue } from '@/shared/types/type'

// * import context
import { AuthContext } from '@/shared/context/AuthContext'

// * import from next
import Image from 'next/image'

// * import utils
import { Utils } from '@/shared/utils/utility'

export const LoginButton = () => {
  const context = useContext(AuthContext)
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        console.log('1')

        login().then((res: AuthContextValue | null) => {
          if (res) {
            console.log(`${res.displayName}님 환영합니다😊`)
            Utils.setCookie({
              cookieName: 'isLoggedIn',
              cookieValue: 'true',
              validDays: 100,
            })
            addFirstVisitUser(res)
            router.push('/')
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
