"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase/client";

interface AuthContextType {
  user: User | null;
  userName: string;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

export function formatUserName(user: User | null): string {
  if (!user) return "";
  if (user.displayName && user.displayName.trim()) {
    return user.displayName.trim();
  }
  if (typeof window !== "undefined" && user.uid) {
    const stored = localStorage.getItem(`profileglow_name_${user.uid}`);
    if (stored && stored.trim()) return stored.trim();
  }
  if (user.email) {
    const prefix = user.email.split("@")[0];
    return prefix
      .replace(/[._-]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "Member";
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userName: "",
  loading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  updateUserName: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  getIdToken: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (name: string, email: string, pass: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, pass);
    if (name && credential.user) {
      await updateProfile(credential.user, { displayName: name });
      if (typeof window !== "undefined") {
        localStorage.setItem(`profileglow_name_${credential.user.uid}`, name);
      }
      await credential.user.reload();
      if (auth.currentUser) {
        setUser({ ...auth.currentUser });
      }
    }
  };

  const updateUserName = async (name: string) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: name });
    if (typeof window !== "undefined") {
      localStorage.setItem(`profileglow_name_${auth.currentUser.uid}`, name);
    }
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken();
  };

  const userName = formatUserName(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        userName,
        loading,
        signInWithEmail,
        signUpWithEmail,
        updateUserName,
        signInWithGoogle,
        signOut,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
