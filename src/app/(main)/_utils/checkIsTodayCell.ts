import getTodayInfo from '@/shared/utils/getTodayInfo'

export default function checkIsTodayCell({
  cellYear,
  cellMonth,
  cellDate,
}: {
  cellYear: number
  cellMonth: number
  cellDate: number
}) {
  const { year, month, date } = getTodayInfo()

  return year === cellYear && month === cellMonth && date === cellDate
}
