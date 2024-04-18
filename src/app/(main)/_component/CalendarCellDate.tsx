import { Typography } from '@mui/material'
import { CalendarCellInfo } from '@/shared/types/type'
import { getTodayInfo } from '@/shared/utils/getCalendarInfo'
import checkIsTodayCell from '../_utils/checkIsTodayCell'
import getCalendarCellDateColorByColumn from '../_utils/getCalendarCellDateColor'

export default function CalendarCellDate({ calendarCellInfo }: { calendarCellInfo: CalendarCellInfo }) {
  const todayInfo = getTodayInfo()
  const isToday = checkIsTodayCell(todayInfo, calendarCellInfo)
  const dateColor = getCalendarCellDateColorByColumn(calendarCellInfo.column)
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
      {calendarCellInfo.date}
    </Typography>
  )
}
