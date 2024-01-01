// * import type
import { CalendarInfo, CalendarCellInfo, CalendarRow } from '@/type/type'

/**
 * 오늘 날짜 정보를 반환한다.
 * @returns {{year: number, month: number, date: number}}}
 */
export const getTodayInfo = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const date = today.getDate()

  return {
    year,
    month,
    date,
  }
}

/**
 * 년도, 월 입력받아 해당 달력의 날짜정보를 반환한다.
 * @param param0 year, month 정보
 * @returns {CalendarInfo}
 */
export const getCalendarInfo = ({ year, month }: { year: number; month: number }): CalendarInfo => {
  const selectedMonthData: {
    [key: number]: CalendarCellInfo
  } = {}

  //  1일의 요일, 달을 구한다.
  const firstDate: Date = new Date(year, month, 1)
  const [firstDateMonth, firstDateDay] = [firstDate.getMonth(), firstDate.getDay()]

  for (let i = 1; i <= 31; i++) {
    // 0 ~ 6
    const row = Number(Math.floor((i + firstDateDay - 1) / 7)) as CalendarRow

    // i 일의 요일, 달을 구한다. (다음달로 넘어가는 경우도 있으므로)
    const indexDate = new Date(year, month, i)
    const [indexDateMonth, indexDateDay] = [indexDate.getMonth(), indexDate.getDay()]

    // i 일이 다음달로 넘어가지 않은지 판별 후
    if (indexDateMonth === firstDateMonth) {
      switch (indexDateDay) {
        case 0:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'sunday',
            dayIndex: 0,
            row: row,
            column: 0,
            calendarCellId: String(row) + String(0),
          }
          break
        case 1:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'monday',
            dayIndex: 1,
            row: row,
            column: 1,
            calendarCellId: String(row) + String(1),
          }
          break
        case 2:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'tuesday',
            dayIndex: 2,
            row: row,
            column: 2,
            calendarCellId: String(row) + String(2),
          }
          break
        case 3:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'wednesday',
            dayIndex: 3,
            row: row,
            column: 3,
            calendarCellId: String(row) + String(3),
          }
          break
        case 4:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'thursday',
            dayIndex: 4,
            row: row,
            column: 4,
            calendarCellId: String(row) + String(4),
          }
          break
        case 5:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'friday',
            dayIndex: 5,
            row: row,
            column: 5,
            calendarCellId: String(row) + String(5),
          }
          break
        case 6:
          selectedMonthData[i] = {
            year: year,
            month: month,
            date: i,
            day: 'saturday',
            dayIndex: 6,
            row: row,
            column: 6,
            calendarCellId: String(row) + String(6),
          }
          break
      }
    }
  }

  return selectedMonthData
}
