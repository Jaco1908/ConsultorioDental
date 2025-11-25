'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Activity,
  FileDown,
  FileSpreadsheet,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ReportsModule() {
  const [dateFrom, setDateFrom] = useState('2024-11-01');
  const [dateTo, setDateTo] = useState('2024-11-30');

  // Sample data for charts
  const appointmentsData = [
    { day: 'Lun 18', citas: 12 },
    { day: 'Mar 19', citas: 15 },
    { day: 'Mié 20', citas: 10 },
    { day: 'Jue 21', citas: 18 },
    { day: 'Vie 22', citas: 14 },
    { day: 'Sáb 23', citas: 8 },
    { day: 'Dom 24', citas: 0 },
  ];

  const revenueData = [
    { mes: 'Jul', ingresos: 4500 },
    { mes: 'Ago', ingresos: 5200 },
    { mes: 'Sep', ingresos: 4800 },
    { mes: 'Oct', ingresos: 6100 },
    { mes: 'Nov', ingresos: 7200 },
  ];

  const treatmentsData = [
    { name: 'Limpiezas', value: 35, color: '#1976D2' },
    { name: 'Obturaciones', value: 25, color: '#4CAF50' },
    { name: 'Endodoncias', value: 15, color: '#FF9800' },
    { name: 'Extracciones', value: 12, color: '#F44336' },
    { name: 'Ortodoncia', value: 13, color: '#9C27B0' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reportes y Métricas</h2>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Label>Fecha Desde</Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex-1">
            <Label>Fecha Hasta</Label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex-1">
            <Label>Doctor</Label>
            <Select defaultValue="all">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los doctores</SelectItem>
                <SelectItem value="1">Dr. Juan Pérez</SelectItem>
                <SelectItem value="2">Dra. María López</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="bg-[#1976D2] hover:bg-[#0D47A1]">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-[#1976D2]" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">127</h3>
          <p className="text-gray-600 text-sm">Total Citas del Período</p>
          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appointmentsData}>
                <Line
                  type="monotone"
                  dataKey="citas"
                  stroke="#1976D2"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +23%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">$7,200</h3>
          <p className="text-gray-600 text-sm">Ingresos del Período</p>
          <p className="text-xs text-gray-500 mt-2">vs $5,850 mes anterior</p>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">86</h3>
          <p className="text-gray-600 text-sm">Tratamientos Realizados</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Limpiezas</span>
              <span className="font-medium">35</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Obturaciones</span>
              <span className="font-medium">25</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Otros</span>
              <span className="font-medium">26</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-[#FF9800]" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">92</h3>
          <p className="text-gray-600 text-sm">Pacientes Atendidos</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Nuevos</span>
              <span className="font-medium text-green-600">24</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Recurrentes</span>
              <span className="font-medium">68</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Chart */}
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-6">Citas por Día</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="day" stroke="#757575" />
              <YAxis stroke="#757575" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="citas"
                stroke="#1976D2"
                strokeWidth={3}
                dot={{ fill: '#1976D2', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Chart */}
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-6">Ingresos Mensuales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="mes" stroke="#757575" />
              <YAxis stroke="#757575" />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Treatments Pie Chart */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Tratamientos Más Solicitados</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={treatmentsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {treatmentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Reports List */}
      <Card className="p-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Reportes Disponibles</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileDown className="w-5 h-5 text-[#1976D2]" />
              </div>
              <div>
                <h4 className="font-medium">Reporte de Citas</h4>
                <p className="text-sm text-gray-600">
                  Análisis detallado de asistencia y cancelaciones
                </p>
              </div>
            </div>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Generar PDF
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileSpreadsheet className="w-5 h-5 text-[#4CAF50]" />
              </div>
              <div>
                <h4 className="font-medium">Reporte de Facturación</h4>
                <p className="text-sm text-gray-600">
                  Ingresos detallados y servicios más vendidos
                </p>
              </div>
            </div>
            <Button variant="outline">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Generar Excel
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileDown className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Reporte de Tratamientos</h4>
                <p className="text-sm text-gray-600">
                  Procedimientos más realizados por período
                </p>
              </div>
            </div>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Generar PDF
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileDown className="w-5 h-5 text-[#FF9800]" />
              </div>
              <div>
                <h4 className="font-medium">Reporte Fiscal (ATS)</h4>
                <p className="text-sm text-gray-600">
                  Anexo Transaccional Simplificado para SRI
                </p>
              </div>
            </div>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Generar XML
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-[#2196F3]" />
              </div>
              <div>
                <h4 className="font-medium">Reporte de Salud Bucal</h4>
                <p className="text-sm text-gray-600">
                  Índices CPO-ceo promedio y estadísticas epidemiológicas
                </p>
              </div>
            </div>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Generar PDF
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
