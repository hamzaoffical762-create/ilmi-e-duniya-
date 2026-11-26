import { createContext, useContext, type ReactNode } from 'react'
import { firebaseApp, firebaseAuth, firebaseDb, firebaseStorage } from '../../services/firebase/client'

type FirebaseContextValue = {
  app: typeof firebaseApp
  auth: typeof firebaseAuth
  db: typeof firebaseDb
  storage: typeof firebaseStorage
}
const FirebaseContext = createContext<FirebaseContextValue>({
  app: firebaseApp, auth: firebaseAuth, db: firebaseDb, storage: firebaseStorage,
})

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return <FirebaseContext.Provider value={{ app: firebaseApp, auth: firebaseAuth, db: firebaseDb, storage: firebaseStorage }}>{children}</FirebaseContext.Provider>
}
export function useFirebase() {
  return useContext(FirebaseContext)
}
