'use client'

// * import from next
import Link from 'next/link'

// * import component
import { Button, TextField, Typography, Box, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// * import Type
import { Day } from '@/type/type'

// * import from next
import { useSearchParams } from 'next/navigation'

// * import from react
import { useState } from 'react'

// * import utils
import { Utils } from '@/utils/utility'

// todo: 내용 validation 할건가?
// todo: 작성 하기 누를 시 해당 내용 전송하고 '완료'alert 하고 main으로 라우팅
// todo: 작성완료 클릭 시 제목/내용 둘다 validation 체크 확인 후 error 확인

export default function DiaryWritePageUI() {
  const searchParams = useSearchParams()
  const { year, month, date, day } = {
    year: searchParams.get('year'),
    month: searchParams.get('month'),
    date: searchParams.get('date'),
    day: searchParams.get('day') as Day,
  }

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isTitleError, setIsTitleError] = useState<boolean>(false)
  const [isContentError, setIsContentError] = useState<boolean>(false)

  return (
    <Box sx={{ padding: '2rem 0' }}>
      {/* 뒤로가기 */}
      <Link href={{ pathname: '/main' }}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
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
          // type="text"
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
          // type="text"
          label="내용"
          minRows={12}
          // rows={20}
          multiline
          sx={{ width: '100%', margin: '0.5rem 0' }}
        />
        {/* 작성/취소 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              // [X] todo: 제목/내용 validation 체크

              const [isEmptyTitle, isEmptyContent] = [Utils.isEmptyText(title), Utils.isEmptyText(content)]

              isEmptyTitle ? setIsTitleError(true) : setIsTitleError(false)
              isEmptyContent ? setIsContentError(true) : setIsContentError(false)

              if (!isEmptyTitle && !isEmptyContent) {
                // todo: title이랑 content 서버로 전송,결과 alert(작성성공,실패)
                // todo: main으로 라우팅
                return
              }
            }}
            sx={{}}
          >
            작성완료
          </Button>
          <Link href={{ pathname: '/main' }} style={{ marginLeft: '0.5rem' }}>
            <Button type="button" variant="outlined" onClick={() => {}}>
              취소
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
