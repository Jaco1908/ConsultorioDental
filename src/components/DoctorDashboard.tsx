'use client';

import React from 'react';
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface DoctorDashboardProps {
  doctorName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function DoctorDashboard({ doctorName = 'Dr. Juan Pérez', onNavigate, onLogout }: DoctorDashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const upcomingAppointments = [
    {
      id: 1,
      time: '09:00',
      patient: 'María González',
      reason: 'Limpieza dental',
      status: 'confirmed',
    },
    {
      id: 2,
      time: '10:30',
      patient: 'Carlos Rodríguez',
      reason: 'Revisión general',
      status: 'pending',
    },
    {
      id: 3,
      time: '11:45',
      patient: 'Ana Martínez',
      reason: 'Endodoncia',
      status: 'confirmed',
    },
    {
      id: 4,
      time: '14:00',
      patient: 'Luis Fernández',
      reason: 'Extracción',
      status: 'confirmed',
    },
    {
      id: 5,
      time: '15:30',
      patient: 'Patricia López',
      reason: 'Ortodoncia - Control',
      status: 'pending',
    },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: '3 citas sin confirmar para mañana' },
    { id: 2, type: 'info', message: '2 historias clínicas pendientes de completar' },
    { id: 3, type: 'error', message: '1 pago pendiente de verificación' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Confirmada
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
        Pendiente
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-[#1976D2] rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 6 9 Q 6 5, 12 5 Q 18 5, 18 9 L 17 17 Q 17 19, 12 19 Q 7 19, 7 17 Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">DentalSys</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{doctorName}</p>
                <p className="text-xs text-gray-500">Odontólogo</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-[#1976D2] text-white">
                  {doctorName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 bg-blue-50 text-[#1976D2] hover:bg-blue-100"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 hover:bg-gray-100"
              onClick={() => onNavigate?.('patients')}
            >
              <Users className="w-5 h-5 mr-3" />
              Pacientes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 hover:bg-gray-100"
              onClick={() => onNavigate?.('medical-records')}
            >
              <FileText className="w-5 h-5 mr-3" />
              Historias Clínicas
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 hover:bg-gray-100"
              onClick={() => onNavigate?.('appointments')}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Citas
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 hover:bg-gray-100"
              onClick={() => onNavigate?.('billing')}
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Facturación
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 hover:bg-gray-100"
              onClick={() => onNavigate?.('reports')}
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Reportes
            </Button>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Cerrar Sesión
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Greeting */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {getGreeting()}, {doctorName.split(' ')[1]}
            </h2>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#1976D2]" />
                </div>
                <span className="text-sm text-green-600 font-medium">+12%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">8</h3>
              <p className="text-gray-600 text-sm">Citas de Hoy</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <span className="text-sm text-green-600 font-medium">+5%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">42</h3>
              <p className="text-gray-600 text-sm">Citas esta Semana</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+18%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">127</h3>
              <p className="text-gray-600 text-sm">Pacientes este Mes</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-[#FF9800]" />
                </div>
                <span className="text-sm text-green-600 font-medium">+23%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">$12,450</h3>
              <p className="text-gray-600 text-sm">Ingresos del Mes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Próximas Citas
                </h3>
                <Button variant="outline" size="sm">
                  Ver Todas
                </Button>
              </div>

              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-[#1976D2] mb-1" />
                        <span className="text-sm font-semibold text-[#1976D2]">
                          {appointment.time}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.patient}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(appointment.status)}
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts and Tasks */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Alertas
                </h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        alert.type === 'error'
                          ? 'bg-red-50'
                          : alert.type === 'warning'
                          ? 'bg-yellow-50'
                          : 'bg-blue-50'
                      }`}
                    >
                      {alert.type === 'error' ? (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      ) : alert.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1976D2] to-[#0D47A1] rounded-xl p-6 text-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-sm text-blue-100 mb-4">
                  Accede a nuestros tutoriales y documentación
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Ver Recursos
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}