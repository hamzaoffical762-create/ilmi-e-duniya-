import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore'
import { getStorage, connectStorageEmulator, type FirebaseStorage } from 'firebase/storage'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId)
export const firebaseApp: FirebaseApp | null = firebaseConfigured
  ? (getApps()[0] ?? initializeApp(config))
  : null

export const firebaseAuth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null
export const firebaseDb: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null
export const firebaseStorage: FirebaseStorage | null = firebaseApp ? getStorage(firebaseApp) : null

let emulatorsConnected = false
if (firebaseApp && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true' && !emulatorsConnected) {
  if (firebaseAuth) connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099', { disableWarnings: true })
  if (firebaseDb) connectFirestoreEmulator(firebaseDb, '127.0.0.1', 8080)
  if (firebaseStorage) connectStorageEmulator(firebaseStorage, '127.0.0.1', 9199)
  emulatorsConnected = true
}
