import { CalendarCellInfo, TodayInfo } from '@/shared/types/type'

export default function checkIsTodayCell(todayInfo: TodayInfo, cellInfo: CalendarCellInfo) {
  return (
    todayInfo?.year === cellInfo?.year &&
    todayInfo?.monthIndex === cellInfo?.monthIndex &&
    todayInfo?.date === cellInfo?.date
  )
}
