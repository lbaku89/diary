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

// todo : 모바일 대응 방법 구색 -> 스크롤바 너비 줄이기, 삭제버튼 위치 크기 조정? 모바일에 다 안보임 제목을 어떻게 할까 ..
// todo : 삭제 버튼 모바일에서는 없애기, 그리고 수정 란에서도 삭제할 수 있게 하기
// todo : loading bar
// todo : api error -> error page redirect
// todo : 로그인 정보 있으면 알아서 main page 진입
// todo : 컴포넌트 라우팅 구조로 잡기
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
                    pathname: `/diary/modify`,
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
