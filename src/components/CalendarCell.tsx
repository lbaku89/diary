'use client'
// * import type
import { CalendarCellProps } from '@/type/type'

// * import component
import { Box, Typography, Button, IconButton } from '@mui/material'

// * import icon
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'

// * import link
import Link from 'next/link'

// * import hooks
import { useEffect, useState } from 'react'

// * import api
import { getDiaryListByDate, deleteDiary } from '@/api/api'

// * import context
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

// todo : 렌더링 시 해당 날짜 일기목록 get한 뒤 바 형태로 표시
// todo : 클릭시 적혀있는 페이지로 이동 (get data by id) ->수정,삭제 가능하게
// todo : 바에 삭제 버튼 추가하기
export const CalendarCell = ({ cellInfo, todayInfo, children }: CalendarCellProps) => {
  const uid = useContext(AuthContext)!.authContextValue?.uid

  const [diaryList, setDiaryList] = useState<any>([])

  useEffect(() => {
    if (cellInfo && uid) {
      getDiaryListByDate({
        uid: uid,
        dateInfo: {
          year: cellInfo.year,
          month: cellInfo.monthIndex + 1,
          date: cellInfo.date,
        },
      }).then((res) => {
        setDiaryList(res)
      })
    }
  }, [cellInfo, uid])

  let dateDecoration =
    todayInfo?.year === cellInfo?.year &&
    todayInfo?.monthIndex === cellInfo?.monthIndex &&
    todayInfo?.date === cellInfo?.date
      ? {
          textDecoration: 'underline',
          textDecorationColor: 'red',
          textDecorationThickness: '3px',
        }
      : null

  let dateColor = cellInfo?.column === 0 ? '#FF4040' : cellInfo?.column === 6 ? '#3399FF' : '#000000'

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
                pathname: '/diary/write',
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
            height: '100px',
          },
          '@media(max-width:600px)': {
            height: '50px',
          },
        }}
      >
        {diaryList.map(
          (
            diary: {
              uid: string
              year: number
              month: number
              date: number
              title: string
              diaryId: string
            },
            index: number
          ) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Box
                  component={'span'}
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
              </Typography>

              {/* 삭제버튼 */}
              <IconButton
                size="small"
                aria-label="delete diary"
                onClick={() => {
                  // todo: 삭제 확인 창 띄우기
                  // todo: 해당 diary 삭제하기
                  if (confirm('정말 삭제하시겠습니까?')) {
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
