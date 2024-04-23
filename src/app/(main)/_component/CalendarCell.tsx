'use client'

// * import type
import { CalendarCellInfo, DiaryInfo } from '@/shared/types/type'

// * import component
import { Box } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { getDiaryListByDate } from '@/shared/api/api'
import AuthContext from '@/shared/context/AuthContext'
import CalendarCellDate from './CalendarCellDate'
import CalendarCellDiaryTitle from './CalendarCellDiaryTitle'
import CalendarCellDiaryDeleteBtn from './CalendarCellDiaryDeleteBtn'
import CalendarCellDiaryCreateBtn from './CalendarCellDiaryCreateBtn'
import CalendarCellContentContainer from './CalendarCellContentContainer'

// * check cellInfo 객체로 넘겨 줄 것인지 (리렌더링 최적화 관련)
export default function CalendarCell({ cellInfo }: { cellInfo?: CalendarCellInfo }) {
  const uid = useContext(AuthContext)!.authContextValue?.uid

  const [diaryList, setDiaryList] = useState<any>([])

  useEffect(() => {
    if (cellInfo && uid) {
      getDiaryListByDate({
        uid,
        dateInfo: {
          year: cellInfo.year,
          month: cellInfo.monthIndex + 1,
          date: cellInfo.date,
        },
      }).then((res) => {
        setDiaryList(res)
      })
    } else {
      setDiaryList([])
    }
  }, [cellInfo, uid])

  if (cellInfo) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <CalendarCellDate calendarCellInfo={cellInfo} />
          <CalendarCellDiaryCreateBtn calendarCellInfo={cellInfo} />
        </Box>
        <CalendarCellContentContainer>
          <Box>
            {diaryList.map((diary: DiaryInfo) => (
              <Box key={diary.uid} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CalendarCellDiaryTitle diaryInfo={{ ...diary, day: cellInfo!.day }} />
                <CalendarCellDiaryDeleteBtn diaryInfo={diary} setDiaryList={setDiaryList} />
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
