// * import type
import { Day, KoreanDay } from '@/shared/types/type'

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

  /** YYYYMMDD 문자열로 return */
  static getYYYYMMDD = (year: number, month: number, date: number): string => {
    const convertedMonth = month < 10 ? `0${month}` : String(month)
    const convertedDate = date < 10 ? `0${date}` : String(date)

    return `${year}${convertedMonth}${convertedDate}`
  }

  /** cookie 설정 */
  static setCookie = ({
    cookieName,
    cookieValue,
    validDays,
  }: {
    cookieName: string
    cookieValue: string
    validDays: number
  }): void => {
    document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; max-age=${
      validDays * 24 * 60 * 60
    }; path=/;}`
  }

  /** cookie 제거 */
  static deleteCookie = ({ cookieName }: { cookieName: string }): void => {
    document.cookie = `${encodeURIComponent(cookieName)}="" ; max-age=${-1 * 24 * 60 * 60}; path=/;}`
  }

  /** cookie 값을 or undefined 반환  */
  static getCookie = ({ cookieName }: { cookieName: string }): string | undefined => {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    )

    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  // * Suspense를 위한 함수
  static wrapPromise = (promise: Promise<any>) => {
    let status: 'pending' | 'success' | 'error' = 'pending'
    let result = ''
    let suspender = promise.then(
      (response) => {
        status = 'success'
        result = response
      },
      (error) => {
        status = 'error'
        result = error
      }
    )

    const read = () => {
      switch (status) {
        case 'pending':
          throw suspender
        case 'error':
          throw result
        default:
          return result
      }
    }

    return {
      read,
    }
  }
}
