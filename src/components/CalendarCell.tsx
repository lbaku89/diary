'use client'
// * import type
import { CalendarCellProps } from '@/type/type'

// * import component
import { Box, Typography, Button, IconButton } from '@mui/material'

// * import icon
import CreateIcon from '@mui/icons-material/Create'

// * import link
import Link from 'next/link'

export const CalendarCell = ({ cellInfo, todayInfo, children }: CalendarCellProps) => {
  let dateDecoration =
    todayInfo?.year === cellInfo?.year && todayInfo?.month === cellInfo?.month && todayInfo?.date === cellInfo?.date
      ? {
          textDecoration: 'underline',
          textDecorationColor: 'red',
          textDecorationThickness: '3px',
        }
      : null

  let dateColor = cellInfo?.column === 0 ? '#FF4040' : cellInfo?.column === 6 ? '#3399FF' : '#000000'

  // TODO [x] 쓰기 버튼 추가
  // TODO [ ] 쓰기 버튼 클릭 시 쓰기페이지로 이동
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
                query: { year: cellInfo.year, month: cellInfo.month + 1, date: cellInfo.date, day: cellInfo.day }, // month 는 0 ~ 11
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
