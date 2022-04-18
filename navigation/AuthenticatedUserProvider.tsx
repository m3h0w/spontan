import { auth, firestore } from 'config/firebase';
import { User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { ConvertedFirestoreUser, FirestoreUser, Item } from 'types/User';

export const AuthenticatedUserContext = createContext<{
  user?: ConvertedFirestoreUser | null;
  setUser: React.Dispatch<
    React.SetStateAction<ConvertedFirestoreUser | null | undefined>
  >;
}>({ user: null, setUser: () => {} });

export const useAuthenticatedUser = () => {
  const { user } = React.useContext(AuthenticatedUserContext);
  return user;
};

const convertItemIds = async (items: string[]): Promise<Item[]> => {
  const i = await firestore.getItems(items as string[]);
  return i;
};

export const AuthenticatedUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ConvertedFirestoreUser | null | undefined>(
    undefined,
  );

  // Handle user state changes
  async function onAuthStateChanged(user: User | null) {
    if (user) {
      let dbUser = (await firestore.getUser(user.uid)) as FirestoreUser;
      if (!dbUser) {
        console.log('MAKING A NEW USER');
        dbUser = await firestore.newUser(user);
      }
      firestore.listenToUser(dbUser?.uid, async snapshot => {
        console.log('LISTENER ON USER TRIGGERED', snapshot.data());
        const newUser = snapshot.data() as FirestoreUser;
        const items = await convertItemIds(newUser.items);
        setUser({
          ...newUser,
          items,
        });
      });
      return;
    }
    setUser(null);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      return;
    }
  }, [user]);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
