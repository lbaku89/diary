import DiaryWritePageUI from '@/app/(main)/writeDiary/_component/DiaryWritePageUI'
import { Day, Month, CalendarDate } from '@/shared/types/type'
import { Box, Typography } from '@mui/material'
import BackBtn from '@/shared/components/BackBtn'
import Utils from '@/shared/utils/utility'

// todo 다이어리 쓰기 컴포넌트 리팩토링 중
export default function DiaryWritePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { year, month, date, day } = searchParams

  return (
    <Box sx={{ padding: '2rem 0' }}>
      <BackBtn />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {year}.{month}.{date} {Utils.convertDayToKorean(day as Day)}
      </Typography>
      <DiaryWritePageUI
        year={Number(year)}
        month={Number(month) as Month}
        date={Number(date) as CalendarDate}
        day={day as Day}
      />
    </Box>
  )
}
