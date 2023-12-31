'use client'
// * import react
import { useContext, useEffect, useRef, useState } from 'react'

// * import util
import { getTodayInfo, getCalendarInfo } from '@/utils/getCalendarInfo'

// * import component
import { Box, Typography, Grid, IconButton, Button } from '@mui/material'
import { CalendarCell } from '@/components/CalendarCell'
// import IconButton from '@mui/material/IconButton';

// ** import type
import { CalendarCellInfo } from '@/type/type'

// * import icon
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

export default function Calendar() {
  const todayInfo = getTodayInfo()

  const [selected, setSelected] = useState({
    year: todayInfo.year,
    month: todayInfo.month,
  })

  const calendarInfo = getCalendarInfo({ year: selected.year, month: selected.month })

  const calendarInfoArray: CalendarCellInfo[] = Object.values(calendarInfo)
  const dummyCellCount: number = calendarInfoArray[0].dayIndex
  const dummyCellArray: null[] = []
  let i = 1
  while (i <= dummyCellCount) {
    dummyCellArray.unshift(null)
    ++i
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'end', marginBottom: '2rem' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setSelected({ year: todayInfo.year, month: todayInfo.month })
          }}
        >
          today
        </Button>
        {/* 좌우 버튼 */}
        <IconButton
          aria-label="delete"
          size="small"
          sx={{}}
          onClick={() => {
            if (selected.month === 0) {
              setSelected({ year: selected.year - 1, month: 11 })
            } else {
              setSelected({ ...selected, month: selected.month - 1 })
            }
          }}
        >
          <ArrowBackIosNewSharpIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          sx={{}}
          onClick={() => {
            if (selected.month === 11) {
              setSelected({ year: selected.year + 1, month: 0 })
            } else {
              setSelected({ ...selected, month: selected.month + 1 })
            }
          }}
        >
          <ArrowForwardIosSharpIcon fontSize="inherit" />
        </IconButton>
        {/* 선택된 달력 */}
        <Typography>
          {selected.year}.{selected.month + 1}
        </Typography>
      </Box>

      {/* calendar UI */}
      <Grid container spacing={0} columns={7}>
        {/* calendar day cell */}
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <Grid item xs={1} key={index}>
            <Box sx={{ width: '100%', minHeight: '35px' }}>
              <Typography variant="caption" sx={{ paddingLeft: '0.5rem', color: '#7a7d8c' }}>
                {day}
              </Typography>
            </Box>
          </Grid>
        ))}
        {/* dummy cell */}
        {dummyCellArray.map((cell, index) => (
          <Grid item xs={1} key={index}>
            <CalendarCell key={index}></CalendarCell>
          </Grid>
        ))}
        {/* calendar cell */}
        {calendarInfoArray.map((cellInfo, index) => (
          <Grid item xs={1} key={index}>
            <CalendarCell key={index} cellInfo={cellInfo} todayInfo={todayInfo}></CalendarCell>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
