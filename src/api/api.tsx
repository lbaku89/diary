import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseAuth } from '@/firebase/firebaseClient'
import { AuthContextValue } from '@/type/type'
import { UserCredential } from 'firebase/auth'

export const login = async (): Promise<null | AuthContextValue> => {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  })
  const result = await signInWithPopup(firebaseAuth, provider)
    .then((result: UserCredential) => {
      const user = result.user
      const userInfo: AuthContextValue = { uid: user.uid, email: user.email, displayName: user.displayName }
      return userInfo
    })
    .catch(() => {
      return null
    })
  return result
}

export const logout = async () => {
  await signOut(firebaseAuth)
    .then((res) => {
      alert('로그아웃 되었습니다.')
    })
    .catch((error) => {
      alert(`error:${error}`)
    })
}
