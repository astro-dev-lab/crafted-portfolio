'use client';
import { createContext, useContext, useMemo, useState } from 'react';

type Role = 'guest' | 'admin' | 'support' | 'patient' | 'provider';
type User = { email: string; role: Role } | null;

type AuthContextValue = {
  user: User;
  signIn: (email: string, role: Role) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const value = useMemo(
    () => ({
      user,
      signIn: (email: string, role: Role) => setUser({ email, role }),
      signOut: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
