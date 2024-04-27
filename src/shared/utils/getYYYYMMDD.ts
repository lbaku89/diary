export default function getYYYYMMDD(year: number, month: number, date: number) {
  const convertedMonth = month < 10 ? `0${month}` : String(month)
  const convertedDate = date < 10 ? `0${date}` : String(date)

  return `${year}${convertedMonth}${convertedDate}`
}
