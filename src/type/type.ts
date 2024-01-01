export interface AuthContextValue {
  uid: string | null
  email: string | null
  displayName: string | null
}

/** 달력 UI Column / 일요일, 월, 화, 수, 목, 금, 토 Matching number  */
export type CalendarColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** 달력 UI ROW */
export type CalendarRow = 0 | 1 | 2 | 3 | 4 | 5

export interface CalendarInfo {
  [key: number]: CalendarCellInfo
}

export interface CalendarCellInfo {
  year: number // 년도
  month: number // 달 0~11
  date: number // 일
  day: string // 요일
  row: CalendarRow
  column: CalendarColumn
  calendarCellId: string
}

export interface CalendarCellProps {
  cellId: string
  children?: React.ReactNode
}

export interface AuthContext {
  authContextValue: AuthContextValue | null
  setAuthContextValue: (value: AuthContextValue | null) => void
}
