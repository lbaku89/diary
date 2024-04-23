import { getCalendarCellsInfo } from '@/shared/utils/getCalendarInfo'
import { MonthIndex, CalendarUIProps } from '@/shared/types/type'
import { Grid, Box, Typography } from '@mui/material'
import CalendarCell from './CalendarCell'

export default function CalendarUI({ selectedYear, selectedMonth }: CalendarUIProps) {
  const calendarCellsInfo = getCalendarCellsInfo({ year: selectedYear, monthIndex: (selectedMonth - 1) as MonthIndex })
  const calendarCellsInfoArray = Object.values(calendarCellsInfo).map((cellInfo) => ({
    ...cellInfo,
    isDummyCell: false,
  }))
  const dummyCellCount: number = calendarCellsInfoArray[0].dayIndex
  const dummyCellsInfoArray = [...Array(dummyCellCount)].map((value, i) => ({ key: `0-${i}`, isDummyCell: true }))
  // todo valid cell, dummy cell 구분
  // todo getTotalCalendarCellsInfo 함수로 분리 하여 모듈화 하는게 좋은 것 같아 보임
  const totalCellsInfoArray = [...dummyCellsInfoArray, ...calendarCellsInfoArray]

  const DAYS_HEADERS = [
    { day: '일', key: 'sunday' },
    { day: '월', key: 'monday' },
    { day: '화', key: 'tuesday' },
    { day: '수', key: 'wednesday' },
    { day: '목', key: 'thursday' },
    { day: '금', key: 'friday' },
    { day: '토', key: 'saturday' },
  ]

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

      {totalCellsInfoArray.map((cellInfo) => (
        <Grid item xs={1} key={cellInfo.key}>
          {cellInfo.isDummyCell ? <CalendarCell /> : <CalendarCell cellInfo={cellInfo} />}
        </Grid>
      ))}
    </Grid>
  )
}
