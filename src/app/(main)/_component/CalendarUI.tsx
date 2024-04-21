import { getCalendarInfo, getDummyCellArray } from '@/shared/utils/getCalendarInfo'
import { MonthIndex, CalendarCellInfo, CalendarUIProps } from '@/shared/types/type'
import { Grid, Box, Typography } from '@mui/material'
import CalendarCell from './CalendarCell'

export default function CalendarUI({ selectedYear, selectedMonth }: CalendarUIProps) {
  const calendarInfo = getCalendarInfo({ year: selectedYear, monthIndex: (selectedMonth - 1) as MonthIndex })
  const calendarInfoArray: CalendarCellInfo[] = Object.values(calendarInfo)

  const dummyCellCount: number = calendarInfoArray[0].dayIndex
  const dummyCellArray = getDummyCellArray(dummyCellCount).map((key, i) => ({ key: i }))

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
      {dummyCellArray.map((cellInfo) => (
        <Grid item xs={1} key={cellInfo.key}>
          <CalendarCell />
        </Grid>
      ))}
      {calendarInfoArray.map((cellInfo) => (
        <Grid item xs={1} key={cellInfo.date}>
          <CalendarCell cellInfo={cellInfo} />
        </Grid>
      ))}
    </Grid>
  )
}
