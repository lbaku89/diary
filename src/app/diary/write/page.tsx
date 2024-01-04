// * import component
import { Button, TextField, Typography, Box } from '@mui/material'

// todo: 내용 multiline, 반응형 처리 -> 반응형에 따른 멀티라인 row 변경
export default function page() {
  return (
    <>
      <Box sx={{ padding: '2rem 0' }}>
        {/* 뒤로가기 */}
        <Button variant="outlined" size="small">
          뒤로가기
        </Button>
        {/* 날짜 */}
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          2024.1.4 월요일
        </Typography>
        {/* 제목 */}
        <TextField label="제목" sx={{ width: '100%', margin: '1rem 0' }}></TextField>
        {/* 내용 */}
        <TextField label="내용" rows={20} multiline sx={{ width: '100%', margin: '1rem 0' }} />
        {/* 작성버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" sx={{}}>
            작성완료
          </Button>
        </Box>
        {/* 취소버튼 */}
      </Box>
    </>
  )
}
