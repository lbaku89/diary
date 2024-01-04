'use client'

// * import from
import { useRouter } from 'next/router'

// * import component
import { Button, TextField, Typography, Box } from '@mui/material'
import { usePathname } from 'next/navigation'

// * import Type
import { Day } from '@/type/type'

// * import
import { useSearchParams } from 'next/navigation'

// * import utils
import { Utils } from '@/utils/utility'

export default function DiaryWritePageUI() {
  const searchParams = useSearchParams()
  const { year, month, date, day } = {
    year: searchParams.get('year'),
    month: searchParams.get('month'),
    date: searchParams.get('date'),
    day: searchParams.get('day') as Day,
  }

  return (
    <Box sx={{ padding: '2rem 0' }}>
      {/* 뒤로가기 */}
      <Button variant="outlined" size="small">
        뒤로가기
      </Button>
      {/* 날짜 */}
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {year}.{month}.{date} {Utils.convertDayToKorean(day)}
      </Typography>
      {/* 제목 */}
      <TextField label="제목" sx={{ width: '100%', margin: '1rem 0' }}></TextField>
      {/* 내용 */}
      <TextField label="내용" rows={20} multiline sx={{ width: '100%', margin: '1rem 0' }} />
      {/* 작성버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" sx={{}}>
          작성완료
        </Button>
      </Box>
      {/* 취소버튼 */}
    </Box>
  )
}
