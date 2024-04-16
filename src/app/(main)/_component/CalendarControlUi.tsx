'use client'

import { Box, Typography, IconButton, Button } from '@mui/material'
import { getTodayInfo } from '@/shared/utils/getCalendarInfo'
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MonthIndex } from '@/shared/types/type'

export default function CalendarControlUI() {
  const [todayInfo, pathname, router] = [getTodayInfo(), usePathname(), useRouter()]
  const [selected, setSelected] = useState<{ year: number; monthIndex: MonthIndex }>({
    year: todayInfo.year,
    monthIndex: todayInfo.monthIndex,
  })

  useEffect(() => {
    router.replace(`${pathname}?year=${todayInfo.year}&month=${todayInfo.monthIndex + 1}`, {
      scroll: false,
    })
  }, [pathname, router, todayInfo.monthIndex, todayInfo.year])

  const updateQueryString = ({ year, month }: { year: number; month: number }) => {
    router.replace(`${pathname}?year=${year}&month=${month}`, {
      scroll: false,
    })
  }

  const handleClickTodayBtn = () => {
    updateQueryString({ year: todayInfo.year, month: todayInfo.monthIndex + 1 })
    setSelected({ year: todayInfo.year, monthIndex: todayInfo.monthIndex })
  }

  const handleClickPrevBtn = () => {
    const newYear = selected.monthIndex === 0 ? selected.year - 1 : selected.year
    const newMonthIndex = selected.monthIndex === 0 ? 11 : ((selected.monthIndex - 1) as MonthIndex)
    setSelected({ year: newYear, monthIndex: newMonthIndex })
    updateQueryString({ year: newYear, month: newMonthIndex + 1 })
  }

  const handleClickNextBtn = () => {
    const newYear = selected.monthIndex === 11 ? selected.year + 1 : selected.year
    const newMonthIndex = selected.monthIndex === 11 ? 0 : ((selected.monthIndex + 1) as MonthIndex)
    setSelected({ year: newYear, monthIndex: newMonthIndex })
    updateQueryString({ year: newYear, month: newMonthIndex + 1 })
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'end', marginBottom: '2rem' }}>
      <Button
        size="small"
        variant="contained"
        onClick={() => {
          handleClickTodayBtn()
        }}
      >
        today
      </Button>
      <IconButton
        size="small"
        onClick={() => {
          handleClickPrevBtn()
        }}
      >
        <ArrowBackIosNewSharpIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => {
          handleClickNextBtn()
        }}
      >
        <ArrowForwardIosSharpIcon fontSize="inherit" />
      </IconButton>
      <Typography>
        {selected.year}년 {selected.monthIndex + 1}월
      </Typography>
    </Box>
  )
}
