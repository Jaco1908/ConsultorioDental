'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DoctorDashboard } from '@/components/dashboards/DoctorDashboard';

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'doctor')) {
      router.push('/');
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'doctor') {
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
      'medical-records': '/dashboard/doctor/medical-records',
      'patients': '/dashboard/doctor/patients',
      'appointments': '/dashboard/doctor/appointments',
      'billing': '/dashboard/doctor/billing',
      'reports': '/dashboard/doctor/reports',
      'blog': '/dashboard/doctor/blog',
      'promotions': '/dashboard/doctor/promotions',
    };

    if (routeMap[page]) {
      router.push(routeMap[page]);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return <DoctorDashboard doctorName={user?.name} onNavigate={handleNavigate} onLogout={handleLogout} />;
}
