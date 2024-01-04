'use client'
// * import type
import { CalendarCellProps } from '@/type/type'

// * import component
import { Box, Typography } from '@mui/material'

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

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="body1"
        sx={{
          display: 'inline-block',
          paddingTop: '0.5rem',
          paddingLeft: '0.5rem',
          height: '32px',
          color: dateColor,
          ...dateDecoration,
        }}
      >
        {cellInfo ? cellInfo.date : null}
      </Typography>
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
