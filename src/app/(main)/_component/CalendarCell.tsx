'use client'

// * import type
import { CalendarCellProps } from '@/shared/types/type'

// * import component
import { Box, Typography, IconButton } from '@mui/material'

// * import icon
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'

// * import link
import Link from 'next/link'

// * import hooks
import { useEffect, useState, useContext } from 'react'

// * import api
import { getDiaryListByDate, deleteDiary } from '@/shared/api/api'

// * import context
import AuthContext from '@/shared/context/AuthContext'

export default function CalendarCell({ cellInfo, todayInfo }: CalendarCellProps) {
  const uid = useContext(AuthContext)!.authContextValue?.uid

  const [diaryList, setDiaryList] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    if (cellInfo && uid) {
      getDiaryListByDate({
        uid,
        dateInfo: {
          year: cellInfo.year,
          month: cellInfo.monthIndex + 1,
          date: cellInfo.date,
        },
      }).then((res) => {
        setDiaryList(res)
        setIsLoading(false)
      })
    } else {
      setDiaryList([])
      setIsLoading(false)
    }
  }, [cellInfo, uid])

  const dateDecoration =
    todayInfo?.year === cellInfo?.year &&
    todayInfo?.monthIndex === cellInfo?.monthIndex &&
    todayInfo?.date === cellInfo?.date
      ? {
          textDecoration: 'underline',
          textDecorationColor: 'red',
          textDecorationThickness: '3px',
        }
      : null

  let dateColor = null
  switch (cellInfo?.column) {
    case 0:
      dateColor = '#FF4040'
      break
    case 6:
      dateColor = '#3399FF'
      break
    default:
      dateColor = '#000000'
  }

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
                pathname: '/writeDiary',
                query: { year: cellInfo.year, month: cellInfo.monthIndex + 1, date: cellInfo.date, day: cellInfo.day }, // month 는 0 ~ 11
              }}
            >
              <IconButton size="small" aria-label="add-diary">
                <CreateIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Link>
          </>
        ) : null}
      </Box>
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
        {diaryList.map(
          (diary: { uid: string; year: number; month: number; date: number; title: string; diaryId: string }) => (
            <Box key={diary.uid} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* 제목만 */}
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
                      diaryId: diary.diaryId,
                      year: diary.year,
                      month: diary.month,
                      date: diary.date,
                      day: cellInfo?.day,
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
                  {diary.title}
                </Link>
              </Typography>

              {/* 삭제버튼 */}
              <IconButton
                size="small"
                aria-label="delete diary"
                sx={{
                  '@media(max-width:600px)': {
                    display: 'none !important',
                  },
                }}
                onClick={() => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    deleteDiary({
                      uid: uid!,
                      diaryId: diary.diaryId,
                      dateInfo: { year: diary.year, month: diary.month, date: diary.date },
                    }).then(() => {
                      getDiaryListByDate({
                        uid: uid!,
                        dateInfo: {
                          year: cellInfo!.year,
                          month: cellInfo!.monthIndex + 1,
                          date: cellInfo!.date,
                        },
                      }).then((res) => {
                        setDiaryList(res)
                      })
                    })
                  }
                }}
              >
                <DeleteIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Box>
          )
        )}
      </Box>
    </Box>
  )
}
