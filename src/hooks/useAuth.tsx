'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState, SignUpData, SignInData } from '@/types';

// Mock user data - will be replaced with real auth later
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'coach@example.com',
    name: 'John Coach',
    role: 'coach',
    avatar_url: '/avatars/coach.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'athlete@example.com',
    name: 'Jane Athlete',
    role: 'athlete',
    avatar_url: '/avatars/athlete.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Context for auth state
const AuthContext = createContext<{
  auth: AuthState;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check localStorage for mock session
      const savedUser = localStorage.getItem('mock-user');
      if (savedUser) {
        setAuth({
          user: JSON.parse(savedUser),
          loading: false,
          error: null,
        });
      } else {
        setAuth({
          user: null,
          loading: false,
          error: null,
        });
      }
    };

    checkSession();
  }, []);

  const signIn = async (data: SignInData) => {
    setAuth(prev => ({ ...prev, loading: true, error: null }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - find user by email
    const user = MOCK_USERS.find(u => u.email === data.email);
    
    if (user && data.password === 'password123') { // Mock password check
      localStorage.setItem('mock-user', JSON.stringify(user));
      setAuth({
        user,
        loading: false,
        error: null,
      });
    } else {
      setAuth({
        user: null,
        loading: false,
        error: 'Invalid email or password',
      });
    }
  };

  const signUp = async (data: SignUpData) => {
    setAuth(prev => ({ ...prev, loading: true, error: null }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user creation
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    localStorage.setItem('mock-user', JSON.stringify(newUser));
    setAuth({
      user: newUser,
      loading: false,
      error: null,
    });
  };

  const signOut = async () => {
    setAuth(prev => ({ ...prev, loading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.removeItem('mock-user');
    setAuth({
      user: null,
      loading: false,
      error: null,
    });
  };

  const updateUser = async (data: Partial<User>) => {
    if (!auth.user) return;
    
    setAuth(prev => ({ ...prev, loading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...auth.user, ...data, updated_at: new Date().toISOString() };
    localStorage.setItem('mock-user', JSON.stringify(updatedUser));
    
    setAuth(prev => ({
      ...prev,
      user: updatedUser,
      loading: false,
    }));
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 