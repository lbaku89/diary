'use client'

import { Box } from '@mui/material'
import LogoutButton from '@/shared/components/LogoutButton'
import { useContext } from 'react'
import AuthContext from '@/shared/context/AuthContext'
import LoadingSpinner from '@/shared/components/LoadingSpinner'
import Calendar from './_component/Calendar'

export default function MainPage() {
  const context = useContext(AuthContext)
  return context?.isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
      <Calendar />
    </>
  )
}
