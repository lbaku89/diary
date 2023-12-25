'use client'
import { Typography, Button, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { AuthContextProps } from '@/type/type'
import { login, logout } from '@/api/api'
;`use client`
export default function Home() {
  const auth = useContext(AuthContext)
  const [currentAuth, setCurrentAuth] = useState<AuthContextProps | null>(auth)
  const router = useRouter()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          top: '30%',
          position: 'absolute',
          height: '210px',
          width: '250px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* simple diary */}
        <Typography variant="h2" component="h1" gutterBottom>
          SIMPLE
          <br />
          <div style={{ textAlign: 'right' }}>✍️DIARY</div>
        </Typography>
        {/* 로그인 버튼 영역 */}
        <Button
          onClick={async () => {
            login().then((res: AuthContextProps | null) => {
              if (res) {
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
        <Typography variant="caption">* 현재 구글 로그인만 지원합니다.</Typography>
      </Box>
    </Box>
  )
}
