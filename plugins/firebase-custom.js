// https://firebase.google.com/docs/web/setup?hl=ja#add-sdks-initialize
// -> Node.js

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APPID,
  measurementId: process.env.FB_MEASUREMENTID,
}

firebase.initializeApp(firebaseConfig)

const firestoreDb = firebase.firestore()

// Firestoreの設定を適用するためfirebase.firestore()を読み替える
export { firestoreDb }
