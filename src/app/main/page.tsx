import { Box } from '@mui/material'
import LogoutButton from '@/components/LogoutButton'

export default function MainPage() {
  return (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
    </>
  )
}
