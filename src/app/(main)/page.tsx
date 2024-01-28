import { Box } from '@mui/material'
import LogoutButton from '@/shared/components/LogoutButton'
import Calendar from './_component/Calendar'

export default function MainPage() {
  return (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
      {/* 달력 */}
      <Calendar />
    </>
  )
}
