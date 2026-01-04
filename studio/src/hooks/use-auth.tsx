"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from "@/lib/firebase";

interface User {
  email: string;
  name: string;
  uid: string;
  photoURL?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (email: string, password?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser?.email) {
        setUser({
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      if (!password) throw new Error("Password is required");

      await signInWithEmailAndPassword(auth, email, password);

      router.push('/home');
      toast({ title: "Welcome back!", description: "You have successfully logged in." });

    } catch (error: any) {
      console.error("Login error:", error);
      let message = "Login failed.";
      if (error.code === 'auth/invalid-credential') message = "Invalid email or password.";
      if (error.code === 'auth/user-not-found') message = "No account found with this email.";

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message
      });
      throw error;
    }
  };

  const register = async (email: string, password?: string) => {
    try {
      if (!password) throw new Error("Password is required");

      await createUserWithEmailAndPassword(auth, email, password);

      // Note: We could allow setting display name here, but simple email/pass for now

      router.push('/home');
      toast({ title: "Account created!", description: "Welcome to KnotBook." });

    } catch (error: any) {
      console.error("Registration error:", error);
      let message = "Registration failed.";
      if (error.code === 'auth/email-already-in-use') message = "This email is already registered.";
      if (error.code === 'auth/weak-password') message = "Password should be at least 6 characters.";

      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: message
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
