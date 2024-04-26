import { Box } from '@mui/material'
import LogoutButton from '@/shared/components/LogoutButton'
import getTodayInfo from '@/shared/utils/getTodayInfo'
import { Month } from '@/shared/types/type'
import CalendarControlUI from './_component/CalendarControlUI'
import CalendarUI from './_component/CalendarUI'
import UserName from './_component/UserName'
// * refactoring
// todo: client -> server component로 전환
// * https://nextjs.org/docs/app/api-reference/functions/use-search-params#server-component
// todo: component 화 진행 (가독성, 유지보수성 향상)

// * UI/UX update
// todo: error.tsx , loading.tsx 이용
// todo: UX/UI 개선 - 로그인 팝업창 취소시 다시 로그인 페이지로
// todo: UX/UI 개선 - loading 중 로그아웃 버튼 숨김

// todo: 폴더 구조 변경 -> util 개당으로 분리
// todo: 지역적인 utils은 해당 폴더에 위치하도록 변경
// todo: 나중에 타입도 중복없도록 정리하기

// todo: 성능 테스트 (light house)
// todo: test tool 로 시나리오 테스트 (jest)
// todo: test

// todo: 클라이언트 컴포넌트 로딩 처리

export default function MainPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const todayInfo = getTodayInfo()
  const [selectedYear, selectedMonth] = [
    Number(searchParams.year) || todayInfo.year,
    (Number(searchParams.month) || todayInfo.month) as Month,
  ]

  return (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
      <UserName />
      <CalendarControlUI selectedYear={selectedYear} selectedMonth={selectedMonth} />
      <CalendarUI selectedYear={selectedYear} selectedMonth={selectedMonth} />
    </>
  )
}
