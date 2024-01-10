'use client'

// * import from next
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

// * import component
import { Button, TextField, Typography, Box, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { BackBtn } from './BackBtn'

// * import Type
import { Day } from '@/type/type'

// * import context
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

// * import from react
import { useState } from 'react'

// * import utils
import { Utils } from '@/utils/utility'

// * import api
import { addDiary } from '@/api/api'
import { error } from 'console'

export default function DiaryWritePageUI() {
  const searchParams = useSearchParams()
  const { year, month, date, day } = {
    year: searchParams.get('year'),
    month: searchParams.get('month'),
    date: searchParams.get('date'),
    day: searchParams.get('day') as Day,
  }

  const authContextValue = useContext(AuthContext)!.authContextValue
  const route = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isTitleError, setIsTitleError] = useState<boolean>(false)
  const [isContentError, setIsContentError] = useState<boolean>(false)

  return (
    <Box sx={{ padding: '2rem 0' }}>
      {/* 뒤로가기 btn*/}
      <BackBtn pathName="/main"></BackBtn>
      {/* 날짜 */}
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {year}.{month}.{date} {Utils.convertDayToKorean(day)}
      </Typography>
      <Box component="form">
        {/* 제목 */}
        <TextField
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          error={isTitleError}
          type="text"
          helperText={isTitleError ? '제목을 입력하세요' : ''}
          label="제목"
          sx={{ width: '100%', margin: '0.5rem 0' }}
        />
        {/* 내용 */}
        <TextField
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
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
            type="submit"
            onClick={(e) => {
              e.preventDefault()

              const [isEmptyTitle, isEmptyContent] = [Utils.isEmptyText(title), Utils.isEmptyText(content)]

              isEmptyTitle ? setIsTitleError(true) : setIsTitleError(false)
              isEmptyContent ? setIsContentError(true) : setIsContentError(false)

              if (!isEmptyTitle && !isEmptyContent) {
                addDiary({
                  uid: authContextValue!.uid,
                  dateInfo: {
                    year: Number(year),
                    month: Number(month),
                    date: Number(date),
                  },
                  diary: { title, content },
                })
                  .then((res) => {
                    alert(`작성완료!`)
                    route.push('/main')
                  })
                  .catch((error) => {
                    alert(`문제가 발생하여 작성에 실패했습니다. error message:${error.message}`)
                    console.error(error)
                  })
              }
            }}
          >
            작성완료
          </Button>
          {/* 취소 btn */}
          <Link href={{ pathname: '/main' }} style={{ marginLeft: '0.5rem' }}>
            <Button type="button" variant="outlined">
              취소
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
