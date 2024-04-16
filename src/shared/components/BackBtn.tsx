import Link from 'next/link'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function BackBtn({ pathName }: { pathName: string }) {
  return (
    <Link href={{ pathname: `${pathName}` }}>
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
    </Link>
  )
}
