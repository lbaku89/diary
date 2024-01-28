// * import type
import { CalendarInfo, CalendarCellInfo, CalendarRow, MonthIndex, CalendarDate } from '@/shared/types/type'

/**
 * 오늘 날짜 정보를 반환한다.
 * @returns {{year: number, month: number, date: number}}}
 */
export const getTodayInfo = (): {
  year: number
  monthIndex: MonthIndex
  date: CalendarDate
} => {
  const today = new Date()
  const year = today.getFullYear()
  const monthIndex = today.getMonth() as MonthIndex
  const date = today.getDate() as CalendarDate

  return {
    year,
    monthIndex: monthIndex,
    date,
  }
}

/**
 * 년도, 월 입력받아 해당 달력의 날짜정보를 반환한다.
 * @param param0 year, month 정보
 * @returns {CalendarInfo}
 */
export const getCalendarInfo = ({
  year,
  monthIndex: monthIndex,
}: {
  year: number
  monthIndex: MonthIndex
}): CalendarInfo => {
  const selectedMonthData: {
    [key: number]: CalendarCellInfo
  } = {}

  //  1일의 요일, 달을 구한다.
  const firstDate: Date = new Date(year, monthIndex, 1)
  const [firstDateMonthIndex, firstDateDay] = [firstDate.getMonth(), firstDate.getDay()]

  for (let i = 1; i <= 31; i++) {
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
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'sunday',
            dayIndex: 0,
            row: row,
            column: 0,
          }
          break
        case 1:
          selectedMonthData[i] = {
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'monday',
            dayIndex: 1,
            row: row,
            column: 1,
          }
          break
        case 2:
          selectedMonthData[i] = {
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'tuesday',
            dayIndex: 2,
            row: row,
            column: 2,
          }
          break
        case 3:
          selectedMonthData[i] = {
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'wednesday',
            dayIndex: 3,
            row: row,
            column: 3,
          }
          break
        case 4:
          selectedMonthData[i] = {
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'thursday',
            dayIndex: 4,
            row: row,
            column: 4,
          }
          break
        case 5:
          selectedMonthData[i] = {
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'friday',
            dayIndex: 5,
            row: row,
            column: 5,
          }
          break
        case 6:
          selectedMonthData[i] = {
            year: year,
            monthIndex: monthIndex,
            date: date,
            day: 'saturday',
            dayIndex: 6,
            row: row,
            column: 6,
          }
          break
      }
    }
  }

  return selectedMonthData
}
