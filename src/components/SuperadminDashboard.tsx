'use client';

import React from 'react';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  Settings,
  Database,
  Shield,
  LogOut,
  Bell,
  Search,
  MoreVertical,
  TrendingUp,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SuperadminDashboardProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function SuperadminDashboard({ onNavigate, onLogout }: SuperadminDashboardProps) {
  const clinics = [
    {
      id: '1',
      name: 'Clínica Dental Central',
      ruc: '1234567890001',
      status: 'active',
      doctors: 5,
      patients: 342,
      logo: 'CDC',
    },
    {
      id: '2',
      name: 'Sonrisas Perfectas',
      ruc: '0987654321001',
      status: 'active',
      doctors: 3,
      patients: 198,
      logo: 'SP',
    },
    {
      id: '3',
      name: 'DentalCare Plus',
      ruc: '1122334455001',
      status: 'active',
      doctors: 8,
      patients: 567,
      logo: 'DCP',
    },
    {
      id: '4',
      name: 'Clínica Dental Norte',
      ruc: '5566778899001',
      status: 'inactive',
      doctors: 2,
      patients: 89,
      logo: 'CDN',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DentalSys</h1>
              <p className="text-xs text-gray-600">Panel de Superadministrador</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin Principal</p>
                <p className="text-xs text-gray-500">Superadministrador</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-purple-600 text-white">SA</AvatarFallback>
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
              className="w-full justify-start h-12 bg-purple-50 text-purple-600 hover:bg-purple-100"
            >
              <Activity className="w-5 h-5 mr-3" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gray-100">
              <Building2 className="w-5 h-5 mr-3" />
              Clínicas
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gray-100">
              <Users className="w-5 h-5 mr-3" />
              Usuarios Globales
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gray-100">
              <Shield className="w-5 h-5 mr-3" />
              Logs y Auditoría
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gray-100">
              <Settings className="w-5 h-5 mr-3" />
              Configuración Global
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gray-100">
              <Database className="w-5 h-5 mr-3" />
              Backups
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Panel de Control Global
          </h2>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-green-100 text-green-700">+3 este mes</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">12</h3>
              <p className="text-gray-600 text-sm">Clínicas Activas</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-[#1976D2]" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15%
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">1,547</h3>
              <p className="text-gray-600 text-sm">Total Usuarios</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +28%
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">$84,500</h3>
              <p className="text-gray-600 text-sm">Ingresos Totales/Mes</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Activity className="w-6 h-6 text-[#FF9800]" />
                </div>
                <Badge className="bg-green-100 text-green-700">99.8%</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">Online</h3>
              <p className="text-gray-600 text-sm">Uptime del Sistema</p>
            </div>
          </div>

          {/* Clinics Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Clínicas Registradas
                </h3>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Building2 className="w-4 h-4 mr-2" />
                  Nueva Clínica
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Buscar clínicas..." className="pl-10" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Clínica
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      RUC
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      N° Doctores
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      N° Pacientes
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clinics.map((clinic) => (
                    <tr key={clinic.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-[#1976D2] text-white">
                              {clinic.logo}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{clinic.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-600">{clinic.ruc}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {clinic.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-700">Activa</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">Inactiva</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">
                        {clinic.doctors}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">
                        {clinic.patients}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Acceder a Panel</DropdownMenuItem>
                              <DropdownMenuItem>Ver Facturación</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Desactivar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Mostrando {clinics.length} clínicas
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-purple-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
