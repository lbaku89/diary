import { Day, KoreanDay } from '../types/type'

export default function convertDayToKorean(day: Day): KoreanDay {
  switch (day) {
    case 'sunday':
      return '일요일'
      break
    case 'monday':
      return '월요일'
      break
    case 'tuesday':
      return '화요일'
      break
    case 'wednesday':
      return '수요일'
      break
    case 'thursday':
      return '목요일'
      break
    case 'friday':
      return '금요일'
      break
    default:
      return '토요일'
  }
}
