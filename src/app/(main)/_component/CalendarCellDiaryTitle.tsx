import { CalendarCellDiaryTitleProps } from '@/shared/types/type'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function CalendarCellDiaryTitle({ diaryInfo }: { diaryInfo: CalendarCellDiaryTitleProps }) {
  return (
    <Typography
      variant="body2"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <Link
        href={{
          pathname: `/modifyDiary`,
          query: {
            diaryId: diaryInfo.diaryId,
            year: diaryInfo.year,
            month: diaryInfo.month,
            date: diaryInfo.date,
            day: diaryInfo?.day,
          },
        }}
        style={{ textDecoration: 'none', color: 'unset' }}
      >
        <Box
          component="span"
          sx={{
            '@media(min-width:600.1px)': {
              display: 'inline',
            },
            '@media(max-width:600px)': {
              display: 'none',
            },
          }}
        >
          ✍️
        </Box>
        {diaryInfo.title}
      </Link>
    </Typography>
  )
}
