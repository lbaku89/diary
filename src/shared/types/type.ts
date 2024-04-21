export interface AuthContextValue {
  uid: string
  email: string
  displayName: string
}

/** 달력 UI Column / 일요일, 월, 화, 수, 목, 금, 토 Matching number  */
export type CalendarColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** 달력 UI ROW */
export type CalendarRow = 0 | 1 | 2 | 3 | 4 | 5

/** 0 ~ 11 => 1월 ~ 12월 의미 */
export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

/** 1 ~ 12 월 */
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** 1 ~ 31 일  */
export type CalendarDate =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31

export type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

/** 일요일 ~ 토요일 > 0 ~ 6 대응 */
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** 한국어 요일 타입 */
export type KoreanDay = '일요일' | '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일'

export interface TodayInfo {
  year: number
  monthIndex: MonthIndex
  date: CalendarDate
}

export interface CalendarInfo {
  [key: number]: CalendarCellInfo
}

export interface CalendarCellInfo {
  year: number // 년도
  monthIndex: MonthIndex // 달 0~11
  date: CalendarDate // 일
  day: Day // 요일
  dayIndex: DayIndex // 요일 인덱스 0~6
  row: CalendarRow
  column: CalendarColumn
}

export interface IAuthContext {
  authContextValue: AuthContextValue | null
  setAuthContextValue: (value: AuthContextValue | null) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export interface CalendarCellDiaryTitleProps {
  uid: string
  year: number
  month: number
  date: number
  title: string
  diaryId: string
  day: string
}

export interface DiaryInfo {
  uid: string
  diaryId: string
  title: string
  year: number
  month: Month
  date: CalendarDate
}

export interface CalendarCellDiaryDeleteBtnProps {
  diaryInfo: DiaryInfo
  setDiaryList: (diaryList: DiaryInfo[]) => void
}

export interface CalendarControlUIProps {
  selectedYear: number
  selectedMonth: Month
}

export interface CalendarUIProps {
  selectedYear: number
  selectedMonth: Month
}
