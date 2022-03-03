import { getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, NextOrObserver, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId
};

const getFirebaseApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

class AuthController {
  auth;

  constructor() {
    this.auth = getAuth();
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  createUserWithEmailAndPassword(email:string, password:string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, nextOrObserver);
  }
}

export default {
  app: getFirebaseApp(),
  auth: new AuthController(),
};