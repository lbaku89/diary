import { getCalendarCellsInfo } from '@/shared/utils/getCalendarInfo'
import { MonthIndex } from '@/shared/types/type'

export default function getTotalCalendarCellsInfo(year: number, monthIndex: number) {
  const calendarCellsInfo = getCalendarCellsInfo({
    year,
    monthIndex: monthIndex as MonthIndex,
  })
  const calendarCellsInfoArray = Object.values(calendarCellsInfo).map((cellInfo) => ({
    ...cellInfo,
    isDummyCell: false,
  }))
  const dummyCellCount: number = calendarCellsInfoArray[0].dayIndex
  const dummyCellsInfoArray = [...Array(dummyCellCount)].map((value, i) => ({ key: `0-${i}`, isDummyCell: true }))

  return [...dummyCellsInfoArray, ...calendarCellsInfoArray]
}
