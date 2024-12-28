'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { deleteDiary, getDiariesByMonth } from '@/shared/api/api'
import { useContext } from 'react'
import AuthContext from '@/shared/context/AuthContext'
import { CalendarCellDiaryDeleteBtnProps, DiaryInfo } from '@/shared/types/type'

export default function CalendarCellDiaryDeleteBtn({ diaryInfo, setDiaries }: CalendarCellDiaryDeleteBtnProps) {
  const uid = useContext(AuthContext)!.authContextValue?.uid

  return (
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
            diaryId: diaryInfo.diaryId,
            dateInfo: { year: diaryInfo.year, month: diaryInfo.month, date: diaryInfo.date },
          }).then(() => {
            if (setDiaries && uid) {
              getDiariesByMonth({ uid, dateInfo: { year: diaryInfo.year, month: diaryInfo.month } }).then(
                (res: { [key: string]: DiaryInfo[] }) => {
                  setDiaries(res)
                }
              )
            }
            // window.location.reload()
          })
        }
      }}
    >
      <DeleteIcon sx={{ fontSize: '1rem' }} />
    </IconButton>
  )
}
