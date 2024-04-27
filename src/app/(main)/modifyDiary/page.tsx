import DiaryContentAndModifyBtn from '@/app/(main)/modifyDiary/_component/DiaryContentAndModifyBtn'
import { Box, Typography } from '@mui/material'
import BackBtn from '@/shared/components/BackBtn'
import { Day } from '@/shared/types/type'
import convertDayToKorean from '@/shared/utils/convertDayToKorean'

export default function DiaryModifyPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { year, month, date, day, diaryId } = searchParams

  return (
    <Box sx={{ padding: '2rem 0' }}>
      <BackBtn />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {year}.{month}.{date} {convertDayToKorean(day as Day)}
      </Typography>
      <DiaryContentAndModifyBtn
        year={Number(year)}
        month={Number(month)}
        date={Number(date)}
        day={day as Day}
        diaryId={diaryId}
      />
    </Box>
  )
}
