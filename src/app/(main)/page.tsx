'use client'
import { Box } from '@mui/material'
import LogoutButton from '@/shared/components/LogoutButton'
import Calendar from './_component/Calendar'
import { useContext } from 'react'
import { AuthContext } from '@/shared/context/AuthContext'
import LoadingSpinner from '@/shared/components/LoadingSpinner'
export default function MainPage() {
  const context = useContext(AuthContext)
  return context?.isLoading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
      <Calendar />
    </>
  )
}
