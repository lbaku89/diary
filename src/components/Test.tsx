import { useSession, signIn, signOut } from 'next-auth/react'

// ;`use client`
const Test = () => {
  // csr get session info ! muse declare
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <button
          onClick={() => {
            signOut()
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={() => {
            signIn('google')
          }}
        >
          로그인
        </button>
      )}
    </>
  )
}

export default Test
