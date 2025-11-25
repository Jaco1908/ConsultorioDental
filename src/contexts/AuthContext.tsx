'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (simulating session persistence)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, skipPersistence = false) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication logic based on email
    let role: UserRole = 'patient';
    let name = 'Usuario';

    if (email.includes('superadmin')) {
      role = 'superadmin';
      name = 'Super Admin';
    } else if (email.includes('doctor')) {
      role = 'doctor';
      name = 'Dr. Juan Pérez';
    } else if (email.includes('paciente') || email.includes('patient')) {
      role = 'patient';
      name = 'María González';
    }

    const mockUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
    };

    setUser(mockUser);

    // Only save to localStorage if not a demo login
    if (!skipPersistence) {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: `patient-${Date.now()}`,
      email,
      name,
      role: 'patient',
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
