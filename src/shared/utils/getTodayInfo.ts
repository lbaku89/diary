import { MonthIndex, CalendarDate, Month } from '@/shared/types/type'

export default function getTodayInfo() {
  const today = new Date()
  const year = today.getFullYear()
  const monthIndex = today.getMonth() as MonthIndex
  const month = (monthIndex + 1) as Month
  const date = today.getDate() as CalendarDate

  return {
    year,
    monthIndex,
    month,
    date,
  }
}
