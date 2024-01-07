'use client'
// * import type
import { CalendarCellProps } from '@/type/type'

// * import component
import { Box, Typography, Button, IconButton } from '@mui/material'

// * import icon
import CreateIcon from '@mui/icons-material/Create'

// * import link
import Link from 'next/link'

// todo : 렌더링 시 해당 날짜 일기목록 get한 뒤 바 형태로 표시
// todo : 클릭시 적혀있는 페이지로 이동 (get data by id) ->수정,삭제 가능하게
// todo : 바에 삭제 버튼 추가하기
export const CalendarCell = ({ cellInfo, todayInfo, children }: CalendarCellProps) => {
  let dateDecoration =
    todayInfo?.year === cellInfo?.year &&
    todayInfo?.monthIndex === cellInfo?.monthIndex &&
    todayInfo?.date === cellInfo?.date
      ? {
          textDecoration: 'underline',
          textDecorationColor: 'red',
          textDecorationThickness: '3px',
        }
      : null

  let dateColor = cellInfo?.column === 0 ? '#FF4040' : cellInfo?.column === 6 ? '#3399FF' : '#000000'

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        {cellInfo ? (
          <>
            <Typography
              variant="body1"
              sx={{
                verticalAlign: 'middle',
                display: 'inline',
                lineHeight: '2',
                paddingTop: '',
                paddingLeft: '0.5rem',
                // height: '32px',
                color: dateColor,
                ...dateDecoration,
              }}
            >
              {cellInfo ? cellInfo.date : null}
            </Typography>
            <Link
              href={{
                pathname: '/diary/write',
                query: { year: cellInfo.year, month: cellInfo.monthIndex + 1, date: cellInfo.date, day: cellInfo.day }, // month 는 0 ~ 11
              }}
            >
              <IconButton sx={{ fontSize: '10px' }} size="small" aria-label="add-diary">
                <CreateIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Link>
          </>
        ) : null}
      </Box>
      <Box
        sx={{
          '@media(min-width:600.1px)': {
            minHeight: '100px',
          },
          '@media(max-width:600px)': {
            minHeight: '50px',
          },
        }}
      ></Box>
    </Box>
  )
}
