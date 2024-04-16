'use client'

import { Typography, Box } from '@mui/material'
import LoginButton from '@/shared/components/LoginButton'

export default function Page() {
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
          width: '270px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* simple diary */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: '500',
            background: 'linear-gradient(to right top, #861657, #ffa69e)',
            color: 'transparent',
            WebkitBackgroundClip: 'text',
          }}
        >
          SIMPLE
          <br />
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: 'black' }}>✍️</span>DIARY
          </div>
        </Typography>
        {/* 로그인 버튼 영역 */}
        <LoginButton />
        <Typography
          variant="caption"
          color="primary"
          sx={{ display: 'block', fontWeight: 'bold', textAlign: 'center', marginTop: '0.5rem' }}
        >
          * 현재 구글 로그인만 지원합니다.
        </Typography>
      </Box>
    </Box>
  )
}
