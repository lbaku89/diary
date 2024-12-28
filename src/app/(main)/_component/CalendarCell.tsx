'use client'

import { CalendarCellInfo, DiaryInfo } from '@/shared/types/type'
import { Box } from '@mui/material'

import CalendarCellDate from './CalendarCellDate'
import CalendarCellDiaryTitle from './CalendarCellDiaryTitle'
import CalendarCellDiaryDeleteBtn from './CalendarCellDiaryDeleteBtn'
import CalendarCellDiaryCreateBtn from './CalendarCellDiaryCreateBtn'
import CalendarCellContentContainer from './CalendarCellContentContainer'

export default function CalendarCell({
  cellInfo,
  diaries,
  setDiaries,
}: {
  cellInfo?: CalendarCellInfo
  diaries?: DiaryInfo[]
  setDiaries?: (diaries: { [key: string]: DiaryInfo[] } | undefined) => void
}) {
  if (cellInfo) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <CalendarCellDate cellDate={cellInfo.date} cellMonth={cellInfo.month} cellYear={cellInfo.year} />
          <CalendarCellDiaryCreateBtn
            cellDate={cellInfo.date}
            cellMonth={cellInfo.month}
            cellYear={cellInfo.year}
            cellDay={cellInfo.day}
          />
        </Box>
        <CalendarCellContentContainer>
          <Box>
            {diaries?.map((diary: DiaryInfo) => (
              <Box key={diary.diaryId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CalendarCellDiaryTitle diaryInfo={{ ...diary, day: cellInfo!.day }} />
                <CalendarCellDiaryDeleteBtn diaryInfo={diary} setDiaries={setDiaries} />
              </Box>
            ))}
          </Box>
        </CalendarCellContentContainer>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }} />
      <CalendarCellContentContainer>
        <Box />
      </CalendarCellContentContainer>
    </Box>
  )
}
