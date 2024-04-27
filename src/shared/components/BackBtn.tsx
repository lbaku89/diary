'use client'

import { useRouter } from 'next/navigation'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function BackBtn() {
  const router = useRouter()
  const handleClickBackBtn = () => {
    router.back()
  }

  return (
    <IconButton onClick={handleClickBackBtn}>
      <ArrowBackIcon />
    </IconButton>
  )
}
