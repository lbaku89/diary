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
