// * import type
import { Day, KoreanDay } from '@/type/type'

export class Utils {
  /** 영어 요일을 한국말 요일로 변경  */
  static convertDayToKorean = (day: Day): KoreanDay => {
    switch (day) {
      case 'sunday':
        return '일요일'
      case 'monday':
        return '월요일'
      case 'tuesday':
        return '화요일'
      case 'wednesday':
        return '수요일'
      case 'thursday':
        return '목요일'
      case 'friday':
        return '금요일'
      case 'saturday':
        return '토요일'
    }
  }

  /** 빈 값인지 확인 */
  static isEmptyText = (input: string | number): boolean => {
    const Text = String(input)
    return Text.trim() === '' ? true : false
  }
}
