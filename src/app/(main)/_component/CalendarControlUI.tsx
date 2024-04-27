import { Box, Typography, IconButton, Button } from '@mui/material'
import getTodayInfo from '@/shared/utils/getTodayInfo'
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import Link from 'next/link'
import { CalendarControlUIProps } from '@/shared/types/type'

export default function CalendarControlUI({ selectedYear, selectedMonth }: CalendarControlUIProps) {
  const todayInfo = getTodayInfo()
  const nextMonthInfo = {
    year: selectedMonth === 12 ? selectedYear + 1 : selectedYear,
    month: selectedMonth === 12 ? 1 : selectedMonth + 1,
  }
  const prevMonthInfo = {
    year: selectedMonth === 1 ? selectedYear - 1 : selectedYear,
    month: selectedMonth === 1 ? 12 : selectedMonth - 1,
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'end', marginBottom: '2rem' }}>
      <Link
        href={{
          pathname: '/',
          query: {
            year: todayInfo.year,
            month: todayInfo.month,
          },
        }}
        replace
      >
        <Button size="small" variant="contained">
          today
        </Button>
      </Link>
      {/* 이전달 버튼 */}
      <Link
        href={{
          pathname: '/',
          query: {
            year: prevMonthInfo.year,
            month: prevMonthInfo.month,
          },
        }}
      >
        <IconButton size="small">
          <ArrowBackIosNewSharpIcon fontSize="inherit" />
        </IconButton>
      </Link>
      {/* 다음달 버튼 */}
      <Link
        href={{
          pathname: '/',
          query: {
            year: nextMonthInfo.year,
            month: nextMonthInfo.month,
          },
        }}
        replace
      >
        <IconButton size="small">
          <ArrowForwardIosSharpIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Typography>
        {selectedYear}년 {selectedMonth}월
      </Typography>
    </Box>
  )
}
