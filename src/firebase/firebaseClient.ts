import firebase from 'firebase/compat/app'
// Required for side-effects
import 'firebase/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'

// firebase auth 관련
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

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

// To apply the default browser preference instead of explicitly setting it.
firebaseAuth.useDeviceLanguage()

// Initialize Cloud Firestore through Firebase
export const db = getFirestore(app)

// Initialize Cloud Firestore and get a reference to the service
// export const addDoc1 = async () => {
//   try {
//     const docRef = await addDoc(collection(db, 'users'), {
//       first: '현우',
//       last: '권',
//       born: 1815,
//     })
//     console.log('Document written with ID: ', docRef.id)
//   } catch (e) {
//     console.error('Error adding document: ', e)
//   }
// }

// export const addDco2 = async () => {
//   try {
//     const docRef = await addDoc(collection(db, 'users'), {
//       first: '나영',
//       middle: '오리',
//       last: '김',
//       born: 1912,
//     })

//     console.log('Document written with ID: ', docRef.id)
//   } catch (e) {
//     console.error('Error adding document: ', e)
//   }
// }

// export const readDocs = async () => {
//   const querySnapshot = await getDocs(collection(db, 'users'))
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
//   })
// }
