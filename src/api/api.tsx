;`use client`

// * import type
import { AuthContextValue } from '@/type/type'

// * import from firebase
import { UserCredential } from 'firebase/auth'
import { doc, setDoc, addDoc, collection, getDocs } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// * import firebase instance
import { db } from '@/firebase/firebaseClient'
import { firebaseAuth } from '@/firebase/firebaseClient'

export const login = async (): Promise<null | AuthContextValue> => {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  })
  const result = await signInWithPopup(firebaseAuth, provider)
    .then((result: UserCredential) => {
      const user = result.user
      const userInfo: AuthContextValue = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
      }
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

/** 로그인 시 유저정보 확인 후 처음 왔으면 db에 유저정보 생성 */
export const addFirstVisitUser = async (authContextValue: AuthContextValue) => {
  await setDoc(doc(db, 'users', authContextValue.uid!), {
    uid: authContextValue.uid,
    email: authContextValue.email,
    getDisplayName: authContextValue.displayName,
  })
}

/** diary 작성 내용 db에 추가 */
export const addDiary = async ({
  uid,
  dateInfo: { year, month, date },
  diary: { title, content },
}: {
  uid: string
  dateInfo: {
    year: number
    month: number
    date: number
  }
  diary: {
    title: string
    content: string
  }
}) => {
  const convertedMonth = month < 10 ? `0${month}` : month
  const convertedDate = date < 10 ? `0${date}` : date

  // * db에 diary 추가
  await addDoc(collection(db, `users/${uid}/${year}${convertedMonth}${convertedDate}`), {
    title: title,
    content: content,
  })
}

/** 해당 날짜의 diary 목록 불러오기 */
export const getDiaryListByDate = async ({
  uid,
  dateInfo,
}: {
  uid: string
  dateInfo: {
    year: number //
    month: number // 1 ~ 12
    date: number // 1 ~ 29 or 30 or 31
  }
}) => {
  // * 한자리 숫자는 앞에 0 붙여주기
  const convertedMonth = dateInfo.month < 10 ? `0${dateInfo.month}` : dateInfo.month
  const convertedDate = dateInfo.date < 10 ? `0${dateInfo.date}` : dateInfo.date

  // * 해당 날짜의 collection 문서 가져오기
  const querySnapshot = await getDocs(collection(db, `users/${uid}/${dateInfo.year}${convertedMonth}${convertedDate}`))

  const diaryList: {
    uid: string
    diaryId: string
    year: number
    month: number
    date: number
    title: string
  }[] = []

  // * 문서들을 순회하며 diaryList에 추가
  querySnapshot.forEach((doc) => {
    const diary = doc.data() as { title: string; content: string }
    const diaryInfo = {
      uid: uid,
      diaryId: doc.id, // * 문서 id
      year: dateInfo.year,
      month: dateInfo.month,
      date: dateInfo.date,
      title: diary.title,
    }

    diaryList.push(diaryInfo)
  })

  return diaryList
}
