import { Typography, Box } from '@mui/material'
import { LoginButton } from '@/components/LoginButton'

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
          <div style={{ textAlign: 'right' }}>✍️DIARY</div>
        </Typography>
        {/* 로그인 버튼 영역 */}
        <LoginButton />
        <Typography variant="caption">* 현재 구글 로그인만 지원합니다.</Typography>
      </Box>
    </Box>
  )
}
