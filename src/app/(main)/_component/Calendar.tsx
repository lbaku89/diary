'use client'
// * import react
import { useContext, useState } from 'react'

// * import util
import { getTodayInfo, getCalendarInfo, getDummyCellArray } from '@/shared/utils/getCalendarInfo'

// * import component
import { Box, Typography, Grid, IconButton, Button } from '@mui/material'
import { CalendarCell } from './CalendarCell'
import LoadingSpinner from '@/shared/components/LoadingSpinner'

// ** import type
import { CalendarCellInfo, MonthIndex } from '@/shared/types/type'

// * import icon
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

// * import context
import { AuthContext } from '@/shared/context/AuthContext'

export default function Calendar() {
  const todayInfo = getTodayInfo()
  const authContextValue = useContext(AuthContext)!.authContextValue

  const [selected, setSelected] = useState<{ year: number; monthIndex: MonthIndex }>({
    year: todayInfo.year,
    monthIndex: todayInfo.monthIndex,
  })

  const calendarInfo = getCalendarInfo({ year: selected.year, monthIndex: selected.monthIndex })

  const calendarInfoArray: CalendarCellInfo[] = Object.values(calendarInfo)
  const dummyCellCount: number = calendarInfoArray[0].dayIndex
  const dummyCellArray = getDummyCellArray(dummyCellCount)
  const calendarCellArray = dummyCellArray.concat(calendarInfoArray)

  return (
    <>
      {authContextValue ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
            {authContextValue?.displayName}님의 다이어리
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'end', marginBottom: '2rem' }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setSelected({ year: todayInfo.year, monthIndex: todayInfo.monthIndex })
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
                if (selected.monthIndex === 0) {
                  setSelected({ year: selected.year - 1, monthIndex: 11 })
                } else {
                  setSelected({ ...selected, monthIndex: (selected.monthIndex - 1) as MonthIndex })
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
                if (selected.monthIndex === 11) {
                  setSelected({ year: selected.year + 1, monthIndex: 0 })
                } else {
                  setSelected({ ...selected, monthIndex: (selected.monthIndex + 1) as MonthIndex })
                }
              }}
            >
              <ArrowForwardIosSharpIcon fontSize="inherit" />
            </IconButton>
            {/* 선택된 달력 */}
            <Typography>
              {selected.year}년 {selected.monthIndex + 1}월
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
            {calendarCellArray.map((cellInfo, index) =>
              cellInfo ? (
                <Grid item xs={1} key={index}>
                  <CalendarCell key={index} cellInfo={cellInfo} todayInfo={todayInfo}></CalendarCell>
                </Grid>
              ) : (
                <Grid item xs={1} key={index}>
                  <CalendarCell key={index}></CalendarCell>
                </Grid>
              )
            )}
            {/* dummy cell */}
            {/* {dummyCellArray.map((cell, index) => (
              <Grid item xs={1} key={index}>
                <CalendarCell key={index}></CalendarCell>
              </Grid>
            ))} */}
            {/* calendar cell */}
            {/* {calendarInfoArray.map((cellInfo, index) => (
              <Grid item xs={1} key={index}>
                <CalendarCell key={index} cellInfo={cellInfo} todayInfo={todayInfo}></CalendarCell>
              </Grid>
            ))} */}
          </Grid>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}
