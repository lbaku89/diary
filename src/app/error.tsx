'use client'

import { useEffect } from 'react'
import { Stack, Box, Typography, Button } from '@mui/material'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
          width: '300px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Stack spacing={2} mb={2} justifyContent="center">
          <Typography align="center" variant="h5">
            😥오류가 발생했습니다.
          </Typography>
          <Typography variant="body1" />
          <Link href="/login">
            <Button fullWidth variant="outlined">
              로그인 페이지로
            </Button>
          </Link>
          <Button fullWidth variant="contained" onClick={() => reset()}>
            다시 시도
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
