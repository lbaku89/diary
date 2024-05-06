import Link from 'next/link'
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { CalendarCellInfo, Month, CalendarDate, Day } from '@/shared/types/type'

export default function CalendarCellDiaryCreateBtn({
  cellYear,
  cellMonth,
  cellDate,
  cellDay,
}: {
  cellYear?: number
  cellMonth?: Month
  cellDate?: CalendarDate
  cellDay?: Day
}) {
  return (
    <Link
      href={{
        pathname: '/writeDiary',
        query: {
          year: cellYear,
          month: cellMonth,
          date: cellDate,
          day: cellDay,
        },
      }}
    >
      <IconButton size="small" aria-label="add-diary">
        <CreateIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
    </Link>
  )
}
