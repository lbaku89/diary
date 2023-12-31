export interface AuthContextProps {
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
  day: string // 요일
  row: CalendarRow
  column: CalendarColumn
  calendarCellId: string
}

export interface CalendarCellProps {
  // date: number // 1 ~ 31
  cellId: string
  // cellRow: CalendarRow
  // cellColumn: CalendarColumn
  children?: React.ReactNode
}
