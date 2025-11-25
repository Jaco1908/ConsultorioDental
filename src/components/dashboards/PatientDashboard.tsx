'use client';

import React from 'react';
import {
  Calendar,
  FileText,
  DollarSign,
  User,
  Clock,
  Bell,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PatientDashboardProps {
  patientName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function PatientDashboard({
  patientName = 'María González',
  onNavigate,
  onLogout,
}: PatientDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-8 py-4 flex items-center justify-between">
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">Portal del Paciente</h1>
              <p className="text-xs text-gray-600">Clínica Dental Central</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                1
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{patientName}</p>
                <p className="text-xs text-gray-500">Paciente</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-[#1976D2] text-white">
                  {patientName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Horizontal Menu */}
        <div className="px-8 border-t border-gray-200">
          <nav className="flex gap-2">
            <Button
              variant="ghost"
              className="h-12 rounded-none border-b-2 border-[#1976D2] text-[#1976D2] hover:bg-blue-50"
            >
              Inicio
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-none hover:bg-gray-100"
              onClick={() => onNavigate?.('my-appointments')}
            >
              Mis Citas
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-none hover:bg-gray-100"
              onClick={() => onNavigate?.('my-history')}
            >
              Mi Historial
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-none hover:bg-gray-100"
              onClick={() => onNavigate?.('my-invoices')}
            >
              Mis Facturas
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-none hover:bg-gray-100"
              onClick={() => onNavigate?.('profile')}
            >
              Mi Perfil
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hola, {patientName.split(' ')[0]} 👋
          </h2>
          <p className="text-gray-600">
            Bienvenido a tu portal de salud dental
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Appointment Card */}
            <Card className="p-8 bg-gradient-to-br from-[#1976D2] to-[#0D47A1] text-white border-0">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Próxima Cita</h3>
                  <p className="text-blue-100">Tu siguiente visita programada</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-100" />
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Fecha</p>
                    <p className="text-xl font-semibold">Viernes, 29 Nov 2024</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Hora</p>
                    <p className="text-xl font-semibold">10:00 AM</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-blue-100 text-sm mb-1">Doctor</p>
                  <p className="font-semibold">Dr. Juan Pérez</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-1">Motivo</p>
                  <p className="font-semibold">Limpieza dental y revisión general</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1 bg-white text-[#1976D2] hover:bg-blue-50">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmar Asistencia
                </Button>
                <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10">
                  <Clock className="w-4 h-4 mr-2" />
                  Reprogramar
                </Button>
              </div>
            </Card>

            {/* Schedule New Appointment */}
            <Card className="p-8 border-2 border-dashed border-gray-300 hover:border-[#1976D2] transition-colors cursor-pointer">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                  <Calendar className="w-8 h-8 text-[#1976D2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Agendar Nueva Cita</h3>
                <p className="text-gray-600 mb-6">
                  Programa tu próxima visita de forma rápida y sencilla
                </p>
                <Button className="bg-[#1976D2] hover:bg-[#0D47A1]">
                  Agendar Ahora
                </Button>
              </div>
            </Card>

            {/* Recent Treatment */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Último Tratamiento</h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Obturación dental</h4>
                    <span className="text-sm text-gray-600">15 Nov 2024</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Tratamiento de caries en pieza dental 16. Obturación con resina.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">JP</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-600">Dr. Juan Pérez</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Ver Historial Completo
              </Button>
            </Card>
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-6">
            {/* Pending Invoices */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Facturas Pendientes</h3>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">FAC-001-123</p>
                    <p className="text-xs text-gray-600">20 Nov 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-yellow-700">$85.50</p>
                    <Button variant="link" className="h-auto p-0 text-xs text-[#1976D2]">
                      Pagar
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Todas las Facturas
              </Button>
            </Card>

            {/* Doctor Messages */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Mensajes del Doctor</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Recordatorio</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Recuerda cepillar 3 veces al día y usar hilo dental
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600">Hace 2 días</p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Mi Resumen</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total de visitas</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Última visita</span>
                  <span className="font-semibold">15 Nov 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Próxima cita</span>
                  <span className="font-semibold">29 Nov 2024</span>
                </div>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contáctanos si tienes alguna pregunta
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contactar Soporte
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
