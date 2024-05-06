export default function getCalendarCellDateColorByDayIndex(dayIndex: number) {
  let dateColor = null
  switch (dayIndex) {
    case 0:
      dateColor = '#FF4040'
      break
    case 6:
      dateColor = '#3399FF'
      break
    default:
      dateColor = '#000000'
  }

  return dateColor
}
