'use client'

import { useRouter } from 'next/navigation'
import AuthContext from '@/shared/context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { getDiary, modifyDiary, deleteDiary } from '@/shared/api/api'
import { Box, TextField, Button } from '@mui/material'
import Utils from '@/shared/utils/utility'
import { Day } from '@/shared/types/type'
import CancelBtn from '@/shared/components/CancelBtn'

export interface DiaryContentAndModifyBtnProps {
  year: number
  month: number
  date: number
  day: Day
  diaryId: string | undefined
}

export default function DiaryContentAndModifyBtn({ year, month, date, day, diaryId }: DiaryContentAndModifyBtnProps) {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isTitleError, setIsTitleError] = useState<boolean>(false)
  const [isContentError, setIsContentError] = useState<boolean>(false)
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false)
  const { authContextValue } = useContext(AuthContext)!

  useEffect(() => {
    // * diary 정보 get
    if (authContextValue) {
      getDiary(authContextValue!.uid, {
        year: Number(year),
        month: Number(month),
        date: Number(date),
        diaryId: diaryId!,
      })
        .then((res) => {
          setTitle(res!.title)
          setContent(res!.content)
        })
        .catch((err: Error) => {
          alert(err.message)
          console.error(err)
        })
    }
  }, [authContextValue, year, month, date, diaryId])

  const handleChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeContextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleClickModifyBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const mode = target.textContent
    if (mode === '수정완료') {
      // * 유효성 검사
      const [isEmptyTitle, isEmptyContent] = [Utils.isEmptyText(title), Utils.isEmptyText(content)]
      if (isEmptyTitle) {
        setIsTitleError(true)
      } else {
        setIsTitleError(false)
      }

      if (isEmptyContent) {
        setIsContentError(true)
      } else {
        setIsContentError(false)
      }
      if (!isEmptyTitle && !isEmptyContent) {
        // * 유효성 검사 통과시 api 호출
        modifyDiary(authContextValue!.uid, {
          year: Number(year),
          month: Number(month),
          date: Number(date),
          diaryId: diaryId!,
          title,
          content,
        })
          .then(() => {
            alert('수정되었습니다.')
            router.push('/')
          })
          .catch((err) => {
            alert('요청중 오류가 발생 됐습니다.')
          })
        // * 성공 실패 상관 없이 수정모드 해제
      }
    } else {
      // * 수정모드로 변경
      setIsModifyMode(true)
    }
  }

  const handleClickDeleteBtn = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteDiary({
        uid: authContextValue!.uid,
        diaryId: diaryId!,
        dateInfo: { year: Number(year), month: Number(month), date: Number(date) },
      })
        .then(() => {
          alert('삭제되었습니다.')
          router.push('/')
        })
        .catch((err) => {
          alert('삭제중 오류가 발생했습니다.')
        })
    }
  }

  return (
    <Box sx={{ padding: '2rem 0' }}>
      <Box component="form">
        {/* 제목 */}
        <TextField
          disabled={!isModifyMode}
          value={title}
          onChange={handleChangeTitleInput}
          error={isTitleError}
          type="text"
          helperText={isTitleError ? '제목을 입력하세요' : ''}
          label="제목"
          sx={{ width: '100%', margin: '0.5rem 0' }}
        />
        {/* 내용 */}
        <TextField
          disabled={!isModifyMode}
          value={content}
          onChange={handleChangeContextInput}
          error={isContentError}
          helperText={isContentError ? '내용을 입력하세요' : ''}
          type="text"
          label="내용"
          minRows={12}
          multiline
          sx={{ width: '100%', margin: '0.5rem 0' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          {/* 수정 btn */}
          <Button variant="contained" onClick={handleClickModifyBtn}>
            {isModifyMode ? '수정완료' : '수정하기'}
          </Button>
          {/* 삭제 */}
          <Button variant="contained" color="info" sx={{ marginLeft: '0.5rem' }} onClick={handleClickDeleteBtn}>
            삭제하기
          </Button>
          {/* 취소 btn */}
          <CancelBtn />
        </Box>
      </Box>
    </Box>
  )
}
