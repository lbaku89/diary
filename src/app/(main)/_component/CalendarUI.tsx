import { MonthIndex, CalendarUIProps, CalendarCellInfo } from '@/shared/types/type'
import { Grid, Box, Typography } from '@mui/material'
import CalendarCell from './CalendarCell'
import getTotalCalendarCellsInfo from '../_utils/getTotalCalendarCellsInfo'

export default function CalendarUI({ selectedYear, selectedMonth }: CalendarUIProps) {
  const monthIndex = (selectedMonth - 1) as MonthIndex
  const totalCellsInfoArray = getTotalCalendarCellsInfo(selectedYear, monthIndex)

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
          {cellInfo.isDummyCell ? <CalendarCell /> : <CalendarCell cellInfo={cellInfo as CalendarCellInfo} />}
        </Grid>
      ))}
    </Grid>
  )
}
