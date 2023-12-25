'use client'
import { Typography, Button, Box } from '@mui/material'
export default function Home() {
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
          <div style={{ textAlign: 'right' }}>DIARY</div>
        </Typography>
        {/* 로그인 버튼 영역 */}
        <Button color="primary" variant="contained" size="medium" sx={{ boxSizing: 'border-box', width: '100%' }}>
          로그인
        </Button>
      </Box>
    </Box>
  )
}
