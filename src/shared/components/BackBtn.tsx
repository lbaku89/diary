;`use client`

// * import from next
import Link from 'next/link'

// * import component
import { IconButton } from '@mui/material'

// * import icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const BackBtn = ({ pathName }: { pathName: string }) => {
  return (
    <>
      {/* 뒤로가기 */}
      <Link href={{ pathname: `${pathName}` }}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
    </>
  )
}
