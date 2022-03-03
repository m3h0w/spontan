import { User } from "firebase/auth";
import React, { useState, createContext } from "react";
import { useEffect } from "react";
import firebase from "../config/firebase";

export const AuthenticatedUserContext = createContext<{
  user?: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}>({ user: null, setUser: () => {} });

const auth = firebase.auth;

export const AuthenticatedUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // Handle user state changes
  function onAuthStateChanged(user: User | null) {
    console.log("Setting user to: ", user);
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
