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

export default function CalendarCell({ cellInfo }: { cellInfo?: CalendarCellInfo }) {
  const uid = useContext(AuthContext)!.authContextValue?.uid

  const [diaryList, setDiaryList] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
        setIsLoading(false)
      })
    } else {
      setDiaryList([])
      setIsLoading(false)
    }
  }, [cellInfo, uid])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        {cellInfo ? (
          <>
            <CalendarCellDate calendarCellInfo={cellInfo} />
            <CalendarCellDiaryCreateBtn calendarCellInfo={cellInfo} />
          </>
        ) : null}
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
