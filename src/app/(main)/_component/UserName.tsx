'use client'

import { Skeleton, Typography } from '@mui/material'
import { useContext } from 'react'
import AuthContext from '@/shared/context/AuthContext'

export default function UserName() {
  const name = useContext(AuthContext)?.authContextValue?.displayName

  if (name) {
    return (
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        {name}님의 다이어리
      </Typography>
    )
  }

  return <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '200px', marginBottom: '0.5rem' }} />
}
