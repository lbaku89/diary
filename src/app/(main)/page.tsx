'use client'

import { Box } from '@mui/material'
import LogoutButton from '@/shared/components/LogoutButton'
import { useContext } from 'react'
import AuthContext from '@/shared/context/AuthContext'
import LoadingSpinner from '@/shared/components/LoadingSpinner'
import Calendar from './_component/Calendar'

// * refactoring
// todo: client -> server component로 전환
// todo: component 화 진행 (가독성, 유지보수성 향상)

// * UI/UX update
// todo: error.tsx , loading.tsx 이용
// todo: UX/UI 개선 - 로그인 팝업창 취소시 다시 로그인 페이지로
// todo: UX/UI 개선 - loading 중 로그아웃 버튼 숨김

// todo: 성능 테스트 (light house)
// todo: test tool 로 시나리오 테스트 (jest)

export default function MainPage() {
  const context = useContext(AuthContext)
  return context?.isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}>
        <LogoutButton />
      </Box>
      <Calendar />
    </>
  )
}
