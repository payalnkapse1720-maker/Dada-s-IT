"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import type { User, UserCredential } from "firebase/auth";
import { onAuthChange, loginWithEmail, logoutUser } from "@/lib/firebase/auth";
import { isAuthorizedAdmin } from "./authorization";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to trusted Firebase Authentication state changes
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthorized = useMemo(() => {
    return isAuthorizedAdmin(user);
  }, [user]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<UserCredential> => {
      setLoading(true);
      try {
        const cred = await loginWithEmail(email, password);
        setUser(cred.user);
        return cred;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSignOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isAuthorized,
      signIn,
      signOut: handleSignOut,
    }),
    [user, loading, isAuthorized, signIn, handleSignOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
