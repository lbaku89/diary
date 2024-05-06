import { MonthIndex } from '@/shared/types/type'
import getCalendarCellsInfo from './getCalendarCellsInfo'

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
  const dummyCellsInfoArray = [...Array(dummyCellCount)].map((value, i) => ({
    key: `0-${i}`,
    isDummyCell: true,
    date: undefined,
    day: undefined,
    dayIndex: undefined,
    row: 0,
    column: i,
    year,
    monthIndex,
    month: (monthIndex + 1) as MonthIndex,
  }))

  return [...dummyCellsInfoArray, ...calendarCellsInfoArray]
}
