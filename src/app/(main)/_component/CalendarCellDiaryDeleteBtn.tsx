'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { getDiaryListByDate, deleteDiary } from '@/shared/api/api'
import { useContext } from 'react'
import AuthContext from '@/shared/context/AuthContext'
import { CalendarCellDiaryDeleteBtnProps } from '@/shared/types/type'

export default function CalendarCellDiaryDeleteBtn({ diaryInfo, setDiaryList }: CalendarCellDiaryDeleteBtnProps) {
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
            getDiaryListByDate({
              uid: uid!,
              dateInfo: {
                year: diaryInfo!.year,
                month: diaryInfo!.month,
                date: diaryInfo!.date,
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
  )
}
