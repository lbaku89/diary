export interface AuthContextValue {
  uid: string | null
  email: string | null
  displayName: string | null
}

/** 달력 UI Column / 일요일, 월, 화, 수, 목, 금, 토 Matching number  */
export type CalendarColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** 달력 UI ROW */
export type CalendarRow = 0 | 1 | 2 | 3 | 4 | 5

export type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

/** 한국어 요일 타입 */
export type KoreanDay = '일요일' | '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일'

export interface CalendarInfo {
  [key: number]: CalendarCellInfo
}

export interface CalendarCellInfo {
  year: number // 년도
  month: number // 달 0~11
  date: number // 일
  day: string // 요일
  dayIndex: number //요일 인덱스 0~6
  row: CalendarRow
  column: CalendarColumn
}

export interface CalendarCellProps {
  cellInfo?: CalendarCellInfo
  todayInfo?: { year: number; month: number; date: number }
  children?: React.ReactNode
}

export interface IAuthContext {
  authContextValue: AuthContextValue | null
  setAuthContextValue: (value: AuthContextValue | null) => void
}
