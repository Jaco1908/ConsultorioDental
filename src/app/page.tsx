'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'superadmin') {
        router.push('/dashboard/superadmin');
      } else if (user.role === 'doctor') {
        router.push('/dashboard/doctor');
      } else if (user.role === 'patient') {
        router.push('/dashboard/patient');
      }
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const handleDemoLogin = async (email: string, password: string) => {
    // Demo login without persistence - easy to switch between roles
    await login(email, password, true);
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <Login
      onLogin={handleLogin}
      onDemoLogin={handleDemoLogin}
      onRegister={handleRegister}
      onForgotPassword={handleForgotPassword}
    />
  );
}
