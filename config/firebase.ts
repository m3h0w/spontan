import Constants from 'expo-constants';
import { getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  documentId,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getStorage, ref, getBlob, getDownloadURL } from 'firebase/storage';
import { EventDTO, Group } from 'types/User';
import { FirestoreUser, FirestoreUserDTO, Event } from 'types/User';
import { date } from 'yup';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
};

const getFirebaseApp = () => {
  if (getApps().length === 0) {
    console.log('INITIALIZING FIREBASE APP');
    return initializeApp(firebaseConfig);
  }
  console.log('GETTING FIREBASE APP');
  return getApps()[0];
};

class AuthController {
  auth;
  firestore;

  constructor() {
    this.auth = getAuth(getFirebaseApp());
    this.firestore = new FirestoreController();
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    // await this.firestore.newUser(userCredential.user);
    return userCredential;
  }

  signOut() {
    return signOut(this.auth);
  }

  onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, nextOrObserver);
  }
}

class StorageController {
  storage;

  constructor() {
    this.storage = getStorage();
  }

  ref(path: string) {
    return ref(this.storage, `images/${path}`);
  }

  getUrl(path: string) {
    const pathReference = this.ref(path);
    return getDownloadURL(pathReference);
  }

  getGroupImage(group: string) {
    return this.getUrl(`groups/${group.toLowerCase()}.png`);
  }
}

class FirestoreController {
  firestoreInstance;
  collections;

  constructor() {
    this.firestoreInstance = getFirestore(getFirebaseApp());
    const getCollection = (collectionName: string) =>
      collection(this.firestoreInstance, collectionName);

    this.collections = {
      users: getCollection('users'),
      events: getCollection('events'),
      groups: getCollection('groups'),
    };
  }

  async getDocSnap(
    collection: CollectionReference<DocumentData>,
    path: string,
  ) {
    return await getDoc(doc(collection, path));
  }

  async newUser(user: User): Promise<FirestoreUser> {
    const { uid, email } = user;
    const newFirestoreUser: FirestoreUserDTO = {
      email: email as string,
      uid,
    };
    const docRef = doc(this.collections.users, uid);
    await setDoc(doc(this.collections.users, uid), {
      ...newFirestoreUser,
      createdAt: serverTimestamp(),
    });
    return (await getDoc(docRef)) as unknown as FirestoreUser;
  }

  async getUser(userId: string) {
    const docSnap = await this.getDocSnap(this.collections.users, userId);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('User not found', userId);
      return null;
    }
  }

  async updateUser(userId: string, user: Partial<FirestoreUser>) {
    console.log('UPDATING USER', userId);
    await updateDoc(doc(this.collections.users, userId), user);
  }

  listenToUser(
    userId: string,
    callback: (snapshot: DocumentSnapshot<DocumentData>) => void,
  ) {
    return onSnapshot(doc(this.collections.users, userId), callback);
  }

  listenToEvents(userId: string, callback: (events: Event[]) => void) {
    const q = query(this.collections.events, where('ownerId', '==', userId));
    return onSnapshot(q, querySnapshot => {
      const events: Event[] = [];
      querySnapshot.forEach(doc => {
        events.push(doc.data() as Event);
      });
      callback(events);
    });
  }

  async newEvent(eventDTO: EventDTO) {
    const newDocRef = doc(this.collections.events);
    const newEvent = {
      ...eventDTO,
      createdAt: serverTimestamp(),
      date: Timestamp.fromDate(eventDTO.date),
    };
    console.log('New event:', { newEvent });
    await setDoc(newDocRef, newEvent);
  }

  async newEvents(eventDTOs: EventDTO[]) {
    const batch = writeBatch(this.firestoreInstance);
    const docRefs: DocumentReference<DocumentData>[] = [];
    eventDTOs.forEach(eventDTO => {
      const docRef = doc(this.collections.events);
      docRefs.push(docRef);
      batch.set(docRef, { ...eventDTO, createdAt: serverTimestamp() });
    });
    await batch.commit();
  }

  async getAll<T>(collection: CollectionReference<DocumentData>) {
    const querySnapshot = await getDocs(collection);
    return querySnapshot.docs.map(docSnap => docSnap.data() as T);
  }

  async getMultiple<T>(
    collection: CollectionReference<DocumentData>,
    ids?: string[],
  ) {
    if (!ids) {
      return this.getAll<T>(collection);
    }
    if (ids && !ids.length) {
      return [];
    }
    const q = query(this.collections.events, where(documentId(), 'in', ids));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      return doc.data() as T;
    });
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.getAll(this.collections.events);
  }

  async getEvents(eventIds?: string[]): Promise<Event[]> {
    const events = await this.getMultiple<Event>(
      this.collections.events,
      eventIds,
    );
    return events.sort((a, b) => a.date.toMillis() - b.date.toMillis());
  }

  async getAllGroups() {
    return await this.getAll<Group>(this.collections.groups);
  }
}

export const auth = new AuthController();
export const firestore = new FirestoreController();
export const storage = new StorageController();

export default {
  app: getFirebaseApp(),
};
