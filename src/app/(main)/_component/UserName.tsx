'use client'

import { Typography } from '@mui/material'
import { useContext } from 'react'
import AuthContext from '@/shared/context/AuthContext'

// todo 로딩중 스켈레톤 처리 (dynamic import)
export default function UserName() {
  const name = useContext(AuthContext)?.authContextValue?.displayName

  return (
    <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
      {name}님의 다이어리
    </Typography>
  )
}
