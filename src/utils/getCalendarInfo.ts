import { CalendarInfo } from '@/type/type'

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
export const getCalendarInfo = ({ year, month }: { year: number; month: number }) => {
  const selectedMonthData: {
    [key: number]: object
  } = {}

  //  1일의 요일, 달을 구한다.
  const firstDate: Date = new Date(year, month, 1)
  const [firstDateMonth, firstDateDay] = [firstDate.getMonth(), firstDate.getDay()]

  for (let i = 1; i <= 31; i++) {
    // 0 ~ 6
    const row = Math.floor((i + firstDateDay - 1) / 7)

    // i 일의 요일, 달을 구한다. (다음달로 넘어가는 경우도 있으므로)
    const indexDate = new Date(year, month, i)
    const [indexDateMonth, indexDateDay] = [indexDate.getMonth(), indexDate.getDay()]

    // i 일이 다음달로 넘어가지 않은지 판별 후
    if (indexDateMonth === firstDateMonth) {
      switch (indexDateDay) {
        case 0:
          selectedMonthData[i] = { day: 'sunday', row: row, column: 0 }
          break
        case 1:
          selectedMonthData[i] = { day: 'monday', row: row, column: 1 }
          break
        case 2:
          selectedMonthData[i] = { day: 'tuesday', row: row, column: 2 }
          break
        case 3:
          selectedMonthData[i] = { day: 'wednesday', row: row, column: 3 }
          break
        case 4:
          selectedMonthData[i] = { day: 'thursday', row: row, column: 4 }
          break
        case 5:
          selectedMonthData[i] = { day: 'friday', row: row, column: 5 }
          break
        case 6:
          selectedMonthData[i] = { day: 'saturday', row: row, column: 6 }
          break
      }
    }
  }

  return selectedMonthData
}