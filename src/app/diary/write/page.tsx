'use client'
// * import component
import { Button, TextField, Typography, Box } from '@mui/material'
import DiaryWritePageUI from '@/components/DiaryWritePageUI'

// * import from next
// import { useRouter } from 'next/router'

// todo: 내용 multiline, 반응형 처리 -> 반응형에 따른 멀티라인 row 변경
export default function DiaryWritePage() {
  // const route = useRouter()
  // const data = route.query
  return (
    <>
      <DiaryWritePageUI />
    </>
  )
}
