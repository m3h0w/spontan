import { auth, firestore } from 'config/firebase';
import { User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { FirestoreUser } from 'types/User';

export const AuthenticatedUserContext = createContext<{
  user?: FirestoreUser | null;
  setUser: React.Dispatch<
    React.SetStateAction<FirestoreUser | null | undefined>
  >;
}>({ user: null, setUser: () => {} });

export const useAuthenticatedUser = () => {
  const { user } = React.useContext(AuthenticatedUserContext);
  return user;
};

export const AuthenticatedUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirestoreUser | null | undefined>(undefined);

  // Handle user state changes
  async function onAuthStateChanged(user: User | null) {
    if (user) {
      let dbUser = (await firestore.getUser(user.uid)) as FirestoreUser;
      if (!dbUser) {
        console.log('MAKING A NEW USER');
        dbUser = await firestore.newUser(user);
      }
      setUser(dbUser);
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
