import { Box } from '@mui/material'

export default function CalendarCellContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        overflowY: 'auto',
        textOverflow: 'ellipsis',
        '@media(min-width:600.1px)': {
          height: '120px',
        },
        '@media(max-width:600px)': {
          height: '69px',
        },
        '::-webkit-scrollbar': {
          width: '0',
        },
      }}
    >
      {children}
    </Box>
  )
}
