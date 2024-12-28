import { Typography } from '@mui/material'
// import { CalendarCellInfo } from '@/shared/types/type'
// import getTodayInfo from '@/shared/utils/getTodayInfo'
import { CalendarCellInfo, Month, CalendarDate } from '@/shared/types/type'
import checkIsTodayCell from '../_utils/checkIsTodayCell'
import getCalendarCellDateColorByDayIndex from '../_utils/getCalendarCellDateColor'

export default function CalendarCellDate({
  cellYear,
  cellMonth,
  cellDate,
}: {
  cellYear: number
  cellMonth: Month
  cellDate: CalendarDate
}) {
  // const todayInfo = getTodayInfo()

  const isToday = checkIsTodayCell({ cellYear, cellMonth, cellDate })
  const dayIndex = new Date(cellYear, cellMonth - 1, cellDate).getDay()
  const dateColor = getCalendarCellDateColorByDayIndex(dayIndex)
  const dateDecoration = isToday
    ? {
        textDecoration: 'underline',
        textDecorationColor: 'red',
        textDecorationThickness: '3px',
      }
    : null

  return (
    <Typography
      variant="body1"
      sx={{
        verticalAlign: 'middle',
        display: 'inline',
        lineHeight: '2',
        paddingTop: '',
        paddingLeft: '0.5rem',
        color: dateColor,
        ...dateDecoration,
      }}
    >
      {cellDate}
    </Typography>
  )
}
