"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword as firebaseSignIn, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { type LoginSchema } from '@/lib/schemas';
import { z } from 'zod';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (credentials: z.infer<typeof LoginSchema>) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: 'Auth provider not ready' }),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (credentials: z.infer<typeof LoginSchema>) => {
    try {
      await firebaseSignIn(auth, credentials.email, credentials.password);
      return {};
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return { error: "Invalid email or password." };
        default:
          return { error: "An unexpected error occurred. Please try again." };
      }
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = { user, loading, signIn, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
