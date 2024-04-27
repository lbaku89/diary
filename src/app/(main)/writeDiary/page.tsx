import { Day, Month, CalendarDate } from '@/shared/types/type'
import { Box, Typography } from '@mui/material'
import BackBtn from '@/shared/components/BackBtn'
import convertDayToKorean from '@/shared/utils/convertDayToKorean'
import DiaryInputAndWriteBtn from './_component/DiaryInputAndWriteBtn'

export default function DiaryWritePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { year, month, date, day } = searchParams

  return (
    <Box sx={{ padding: '2rem 0' }}>
      <BackBtn />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {year}.{month}.{date} {convertDayToKorean(day as Day)}
      </Typography>
      <DiaryInputAndWriteBtn
        year={Number(year)}
        month={Number(month) as Month}
        date={Number(date) as CalendarDate}
        day={day as Day}
      />
    </Box>
  )
}
