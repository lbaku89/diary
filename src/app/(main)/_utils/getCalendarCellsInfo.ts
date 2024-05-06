import { CalendarCellInfo, CalendarRow, MonthIndex, CalendarDate, Month } from '@/shared/types/type'

/**
 * 년도, 월 입력받아 해당 달력의 날짜정보를 반환한다.
 * @param param0 year, month 정보
 * @returns {CalendarInfo}
 */
export default function getCalendarCellsInfo({ year, monthIndex }: { year: number; monthIndex: MonthIndex }) {
  const selectedMonthData: {
    [key: number]: CalendarCellInfo & { month: Month }
  } = {}

  //  1일의 요일, 달을 구한다.
  const firstDate: Date = new Date(year, monthIndex, 1)
  const [firstDateMonthIndex, firstDateDay] = [firstDate.getMonth(), firstDate.getDay()]

  for (let i = 1; i <= 31; i += 1) {
    // 0 ~ 6
    const row = Number(Math.floor((i + firstDateDay - 1) / 7)) as CalendarRow

    const date = i as CalendarDate

    // i 일의 요일, 달을 구한다. (다음달로 넘어가는 경우도 있으므로)
    const indexDate = new Date(year, monthIndex, i)
    const [indexDateMonth, indexDateDay] = [indexDate.getMonth(), indexDate.getDay()]

    // i 일이 다음달로 넘어가지 않은지 판별 후
    if (indexDateMonth === firstDateMonthIndex) {
      switch (indexDateDay) {
        case 0:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'sunday',
            dayIndex: 0,
            row,
            column: 0,
            key: `${row}-${0}`,
            isDummyCell: false,
          }
          break
        case 1:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'monday',
            dayIndex: 1,
            row,
            column: 1,
            key: `${row}-${1}`,
            isDummyCell: false,
          }
          break
        case 2:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'tuesday',
            dayIndex: 2,
            row,
            column: 2,
            key: `${row}-${2}`,
            isDummyCell: false,
          }
          break
        case 3:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'wednesday',
            dayIndex: 3,
            row,
            column: 3,
            key: `${row}-${3}`,
            isDummyCell: false,
          }
          break
        case 4:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'thursday',
            dayIndex: 4,
            row,
            column: 4,
            key: `${row}-${4}`,
            isDummyCell: false,
          }
          break
        case 5:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'friday',
            dayIndex: 5,
            row,
            column: 5,
            key: `${row}-${5}`,
            isDummyCell: false,
          }
          break
        case 6:
          selectedMonthData[i] = {
            year,
            monthIndex,
            month: (monthIndex + 1) as Month,
            date,
            day: 'saturday',
            dayIndex: 6,
            row,
            column: 6,
            key: `${row}-${6}`,
            isDummyCell: false,
          }
          break
        default:
          break
      }
    }
  }

  return selectedMonthData
}
