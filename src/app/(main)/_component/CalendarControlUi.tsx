'use client'

import { Box, Typography, IconButton, Button } from '@mui/material'
import { getTodayInfo } from '@/shared/utils/getCalendarInfo'
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { MonthIndex } from '@/shared/types/type'

export default function CalendarControlUI() {
  const [todayInfo, pathname, router, searchParams] = [getTodayInfo(), usePathname(), useRouter(), useSearchParams()]
  const isQueryStringExist = searchParams.get('year') && searchParams.get('month')
  useEffect(() => {
    if (!isQueryStringExist) {
      // 첫 렌더링시 querystring이 없을 경우 today info로 querystring params 세팅
      router.replace(`${pathname}?year=${todayInfo.year}&month=${todayInfo.monthIndex + 1}`, {
        scroll: false,
      })
    }
  }, [isQueryStringExist, pathname, router, todayInfo.monthIndex, todayInfo.year])

  const selected = {
    year: Number(searchParams.get('year')) || todayInfo.year,
    month: Number(searchParams.get('month')) || todayInfo.monthIndex + 1,
  }

  const currentYearMonthQueryParams = () => ({
    year: Number(searchParams.get('year')),
    month: Number(searchParams.get('month')),
    monthIndex: (Number(searchParams.get('month')) - 1) as MonthIndex,
  })

  const updateQueryString = ({ year, month }: { year: number; month: number }) => {
    router.replace(`${pathname}?year=${year}&month=${month}`, {
      scroll: false,
    })
  }

  const handleClickTodayBtn = () => {
    updateQueryString({ year: todayInfo.year, month: todayInfo.monthIndex + 1 })
  }

  const handleClickPrevBtn = () => {
    const { year, monthIndex } = currentYearMonthQueryParams()
    const newYear = monthIndex === 0 ? year - 1 : year
    const newMonthIndex = monthIndex === 0 ? 11 : ((monthIndex - 1) as MonthIndex)
    updateQueryString({ year: newYear, month: newMonthIndex + 1 })
  }

  const handleClickNextBtn = () => {
    const { year, monthIndex } = currentYearMonthQueryParams()
    const newYear = monthIndex === 11 ? year + 1 : year
    const newMonthIndex = monthIndex === 11 ? 0 : ((monthIndex + 1) as MonthIndex)
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
        {selected.year}년 {selected.month}월
      </Typography>
    </Box>
  )
}
