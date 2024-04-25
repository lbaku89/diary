'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'

export default function CancelBtn() {
  const router = useRouter()
  const handleClickCancelBtn = () => {
    router.back()
  }

  return (
    <Button type="button" variant="outlined" onClick={handleClickCancelBtn}>
      취소
    </Button>
  )
}
