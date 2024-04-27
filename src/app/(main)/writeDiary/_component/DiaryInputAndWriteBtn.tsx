'use client'

import { useRouter } from 'next/navigation'
import { Button, TextField, Box } from '@mui/material'
import { DiaryInputAndWriteBtnProps } from '@/shared/types/type'
import AuthContext from '@/shared/context/AuthContext'
import { useContext, useState } from 'react'
import { addDiary } from '@/shared/api/api'
import CancelBtn from '@/shared/components/CancelBtn'
import isEmptyText from '@/shared/utils/isEmptyText'

export default function DiaryInputAndWriteBtn({ year, month, date, day }: DiaryInputAndWriteBtnProps) {
  const uid = useContext(AuthContext)?.authContextValue?.uid
  const router = useRouter()

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isTitleError, setIsTitleError] = useState<boolean>(false)
  const [isContentError, setIsContentError] = useState<boolean>(false)

  const handleClickWriteDiaryBtn = () => {
    const [isEmptyTitle, isEmptyContent] = [isEmptyText(title), isEmptyText(content)]

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
      addDiary({
        uid: uid!,
        dateInfo: {
          year: Number(year),
          month: Number(month),
          date: Number(date),
        },
        diary: { title, content },
      })
        .then(() => {
          alert(`작성완료!`)
          router.back()
        })
        .catch((error) => {
          alert(`문제가 발생하여 작성에 실패했습니다. error message:${error.message}`)
        })
    }
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  return (
    <Box component="form">
      {/* 제목 */}
      <TextField
        value={title}
        onChange={handleChangeTitle}
        error={isTitleError}
        type="text"
        helperText={isTitleError ? '제목을 입력하세요' : ''}
        label="제목"
        sx={{ width: '100%', margin: '0.5rem 0' }}
      />
      {/* 내용 */}
      <TextField
        value={content}
        onChange={handleChangeContent}
        error={isContentError}
        helperText={isContentError ? '내용을 입력하세요' : ''}
        type="text"
        label="내용"
        minRows={12}
        multiline
        sx={{ width: '100%', margin: '0.5rem 0' }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        {/* 작성 btn */}
        <Button
          variant="contained"
          onClick={handleClickWriteDiaryBtn}
          disabled={!uid}
          sx={{
            mx: '0.5rem',
          }}
        >
          작성완료
        </Button>
        {/* 취소 btn */}
        <CancelBtn />
      </Box>
    </Box>
  )
}
