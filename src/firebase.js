
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDN2PHxASKVLTHV_TLkUPfYKq-GBfeOSOU",
  authDomain: "facebook-clone-master-2f091.firebaseapp.com",
  projectId: "facebook-clone-master-2f091",
  storageBucket: "facebook-clone-master-2f091.appspot.com",
  messagingSenderId: "76384065363",
  appId: "1:76384065363:web:5111a5b25833d2d5bfb3a6"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {app, auth, db, storage }