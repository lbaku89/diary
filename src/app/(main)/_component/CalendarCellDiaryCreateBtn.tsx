import Link from 'next/link'
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { CalendarCellInfo } from '@/shared/types/type'

export default function CalendarCellDiaryCreateBtn({ calendarCellInfo }: { calendarCellInfo: CalendarCellInfo }) {
  return (
    <Link
      href={{
        pathname: '/writeDiary',
        query: {
          year: calendarCellInfo.year,
          month: calendarCellInfo.monthIndex + 1,
          date: calendarCellInfo.date,
          day: calendarCellInfo.day,
        },
      }}
    >
      <IconButton size="small" aria-label="add-diary">
        <CreateIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
    </Link>
  )
}
