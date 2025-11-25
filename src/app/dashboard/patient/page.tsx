'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { PatientDashboard } from '@/components/dashboards/PatientDashboard';

export default function PatientDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'patient')) {
      router.push('/');
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'patient') {
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
      'appointments': '/dashboard/patient/appointments',
      'medical-history': '/dashboard/patient/medical-history',
      'invoices': '/dashboard/patient/invoices',
      'profile': '/dashboard/patient/profile',
    };

    if (routeMap[page]) {
      router.push(routeMap[page]);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return <PatientDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
}
