// * import firebase
// Required for side-effects

// import 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// * import firebase auth 관련
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Authentication
export const firebaseAuth = getAuth(app)

// * 명시적으로 로그아웃 하지 않은 이상 로그인 상태 유지
setPersistence(firebaseAuth, browserLocalPersistence)

// To apply the default browser preference instead of explicitly setting it.
firebaseAuth.useDeviceLanguage()

// Initialize Cloud Firestore through Firebase
export const db = getFirestore(app)
