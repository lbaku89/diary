'use client'

// * import type
import { AuthContextValue } from '@/shared/types/type'

// * import from firebase
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc, getDoc } from 'firebase/firestore'
import { UserCredential, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// * import firebase instance
import { db, firebaseAuth } from '@/shared/firebase/firebaseClient'

// * import utils
import Utils from '@/shared/utils/utility'

export const login = async (): Promise<null | AuthContextValue> => {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  })
  const result = await signInWithPopup(firebaseAuth, provider)
    .then((userCredential: UserCredential) => {
      const { user } = userCredential
      const userInfo: AuthContextValue = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
      }
      return userInfo
    })
    .catch((err) => {
      alert(`error:${err}`)
      return null
    })
  return result
}

export const logout = async () => signOut(firebaseAuth)

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
    title,
    content,
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
  querySnapshot.forEach((document) => {
    const diary = document.data() as { title: string; content: string }
    const diaryInfo = {
      uid,
      diaryId: document.id, // * 문서 id
      year: dateInfo.year,
      month: dateInfo.month,
      date: dateInfo.date,
      title: diary.title,
    }

    diaryList.push(diaryInfo)
  })

  return diaryList
}

/** diary 삭제 */
export const deleteDiary = async ({
  uid,
  diaryId,
  dateInfo,
}: {
  uid: string
  diaryId: string
  dateInfo: {
    year: number //
    month: number // 1 ~ 12
    date: number // 1 ~ 29 or 30 or 31
  }
}) => {
  // * 한자리 숫자는 앞에 0 붙여주기
  const convertedMonth = dateInfo.month < 10 ? `0${dateInfo.month}` : dateInfo.month
  const convertedDate = dateInfo.date < 10 ? `0${dateInfo.date}` : dateInfo.date
  await deleteDoc(doc(db, `users/${uid}/${dateInfo.year}${convertedMonth}${convertedDate}`, diaryId))
}

/** 단일 diary 정보 가져오기 */
export const getDiary = async (
  uid: string,
  diaryInfo: {
    year: number
    month: number
    date: number
    diaryId: string
  }
) => {
  const yyyymmdd = Utils.getYYYYMMDD(diaryInfo.year, diaryInfo.month, diaryInfo.date)
  // * 해당 날짜의 collection 문서 가져오기
  const docRef = doc(db, `users/${uid}/${yyyymmdd}`, `${diaryInfo.diaryId}`)
  const querySnapshot = await getDoc(docRef)
  return querySnapshot.data()
}

/** diary 수정 */
export const modifyDiary = async (
  uid: string,
  diaryInfo: {
    year: number
    month: number
    date: number
    diaryId: string
    title: string
    content: string
  }
) => {
  const yyyymmdd = Utils.getYYYYMMDD(diaryInfo.year, diaryInfo.month, diaryInfo.date)

  // * db에 diary 수정
  await setDoc(doc(db, `users/${uid}/${yyyymmdd}`, diaryInfo.diaryId), {
    title: diaryInfo.title,
    content: diaryInfo.content,
  })
}
