import { Box } from '@mui/material'
import LogoutButton from '@/shared/components/LogoutButton'
import getTodayInfo from '@/shared/utils/getTodayInfo'
import { Month } from '@/shared/types/type'
import CalendarControlUI from './_component/CalendarControlUI'
import CalendarUI from './_component/CalendarUI'
import UserName from './_component/UserName'

export default function MainPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const todayInfo = getTodayInfo()
  const [selectedYear, selectedMonth] = [
    Number(searchParams.year) || todayInfo.year,
    (Number(searchParams.month) || todayInfo.month) as Month,
  ]

  return (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
      <UserName />
      <CalendarControlUI selectedYear={selectedYear} selectedMonth={selectedMonth} />
      <CalendarUI selectedYear={selectedYear} selectedMonth={selectedMonth} />
    </>
  )
}
