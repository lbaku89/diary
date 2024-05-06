'use client'

import { MonthIndex, CalendarUIProps, CalendarCellInfo, DiaryInfo, CalendarDate } from '@/shared/types/type'
import { Grid, Box, Typography, Skeleton } from '@mui/material'
import { getDiariesByMonth } from '@/shared/api/api'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '@/shared/context/AuthContext'
import CalendarCell from './CalendarCell'
import getTotalCalendarCellsInfo from '../_utils/getTotalCalendarCellsInfo'

export default function CalendarUI({ selectedYear, selectedMonth }: CalendarUIProps) {
  const monthIndex = (selectedMonth - 1) as MonthIndex
  const totalCellsInfoArray = getTotalCalendarCellsInfo(selectedYear, monthIndex)
  const uid = useContext(AuthContext)?.authContextValue?.uid
  const DAYS_HEADERS = [
    { day: '일', key: 'sunday' },
    { day: '월', key: 'monday' },
    { day: '화', key: 'tuesday' },
    { day: '수', key: 'wednesday' },
    { day: '목', key: 'thursday' },
    { day: '금', key: 'friday' },
    { day: '토', key: 'saturday' },
  ]

  const [diaries, setDiaries] = useState<{ [key: string]: DiaryInfo[] } | undefined>(undefined)

  useEffect(() => {
    if (uid) {
      getDiariesByMonth({ uid, dateInfo: { year: selectedYear, month: selectedMonth } }).then(
        (res: { [key: string]: DiaryInfo[] }) => {
          setDiaries(res)
        }
      )
    }
  }, [uid, selectedYear, selectedMonth])

  if (diaries) {
    return (
      <Grid container spacing={0} columns={7}>
        {DAYS_HEADERS.map((day) => (
          <Grid item xs={1} key={day.key}>
            <Box sx={{ width: '100%', minHeight: '35px' }}>
              <Typography variant="caption" sx={{ paddingLeft: '0.5rem', color: '#7a7d8c' }}>
                {day.day}
              </Typography>
            </Box>
          </Grid>
        ))}

        {totalCellsInfoArray.map((cellInfo: { key: string; date?: CalendarDate; isDummyCell: boolean }) => (
          <Grid item xs={1} key={cellInfo.key}>
            {cellInfo.isDummyCell ? (
              <CalendarCell />
            ) : (
              <CalendarCell
                diaries={diaries[String(cellInfo.date)]}
                cellInfo={cellInfo as CalendarCellInfo}
                setDiaries={setDiaries}
              />
            )}
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Skeleton
      variant="rounded"
      width="100%"
      sx={{
        height: '790px',
        '@media(max-width:600px)': {
          height: '500px',
        },
      }}
    />
  )
}
