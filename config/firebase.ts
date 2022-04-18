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
import { ItemBlueprint } from 'screens/camera/AddItemsScreen';
import { Brand } from 'types/Brand';
import { FirestoreUser, FirestoreUserDTO, Item } from 'types/User';

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

  getBrandImage(brand: string) {
    return this.getUrl(`brands/${brand.toLowerCase()}.png`);
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
      items: getCollection('items'),
      brands: getCollection('brands'),
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
      items: [],
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

  async newItem(
    userId: string,
    blueprint: ItemBlueprint,
    price: number | null,
    receiptDate: Date,
  ) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User doesn't exist ${userId}`);
    }
    const newDocRef = doc(this.collections.items);
    await setDoc(newDocRef, {
      ownerId: userId,
      receiptDate: Timestamp.fromDate(receiptDate),
      sku: blueprint.itemSKU,
      brandName: blueprint.brandName,
      blueprintId: blueprint.id,
      blueprint: blueprint,
      createdAt: serverTimestamp(),
      price,
    });
    await this.updateUser(userId, {
      items: user.items ? user.items.concat(newDocRef.id) : [newDocRef.id],
    });
  }

  async newItems(
    userId: string,
    blueprints: ItemBlueprint[],
    prices: Array<number | null>,
    receiptDate: Date,
  ) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User doesn't exist ${userId}`);
    }
    const batch = writeBatch(this.firestoreInstance);
    const docRefs: DocumentReference<DocumentData>[] = [];
    blueprints.forEach((blueprint, index) => {
      const docRef = doc(this.collections.items);
      docRefs.push(docRef);
      batch.set(docRef, {
        ownerId: userId,
        receiptDate: Timestamp.fromDate(receiptDate),
        sku: blueprint.itemSKU,
        brandName: blueprint.brandName,
        blueprintId: blueprint.id,
        blueprint: blueprint,
        createdAt: serverTimestamp(),
        price: prices[index],
      });
    });
    await batch.commit();
    const ids = docRefs.map(docRef => docRef.id);
    await this.updateUser(userId, {
      items: user.items ? [...user.items, ...ids] : [...ids],
    });
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
    const q = query(this.collections.items, where(documentId(), 'in', ids));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      return doc.data() as T;
    });
  }

  async getAllItems(): Promise<Item[]> {
    return await this.getAll(this.collections.items);
  }

  async getItems(itemIds?: string[]): Promise<Item[]> {
    const items = await this.getMultiple<Item>(this.collections.items, itemIds);
    return items.sort(
      (a, b) => b.receiptDate.toMillis() - a.receiptDate.toMillis(),
    );
  }

  async getAllBrands() {
    return await this.getAll<Brand>(this.collections.brands);
  }
}

export const auth = new AuthController();
export const firestore = new FirestoreController();
export const storage = new StorageController();

export default {
  app: getFirebaseApp(),
};
