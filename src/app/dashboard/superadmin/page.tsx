'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SuperadminDashboard } from '@/components/SuperadminDashboard';

export default function SuperadminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'superadmin')) {
      router.push('/');
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'superadmin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1976D2] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      'users': '/dashboard/superadmin/users',
      'clinics': '/dashboard/superadmin/clinics',
      'settings': '/dashboard/superadmin/settings',
      'logs': '/dashboard/superadmin/logs',
    };

    if (routeMap[page]) {
      router.push(routeMap[page]);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return <SuperadminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
}
