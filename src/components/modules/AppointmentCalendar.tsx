'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  Plus,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  endTime: string;
  reason: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  type: string;
}

interface AppointmentCalendarProps {
  onNewAppointment?: () => void;
}

export function AppointmentCalendar({ onNewAppointment }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'María González',
      time: '09:00',
      endTime: '09:45',
      reason: 'Limpieza dental',
      status: 'confirmed',
      type: 'Preventivo',
    },
    {
      id: '2',
      patientName: 'Carlos Rodríguez',
      time: '10:00',
      endTime: '10:30',
      reason: 'Revisión general',
      status: 'pending',
      type: 'Consulta',
    },
    {
      id: '3',
      patientName: 'Ana Martínez',
      time: '11:00',
      endTime: '12:30',
      reason: 'Endodoncia',
      status: 'confirmed',
      type: 'Tratamiento',
    },
    {
      id: '4',
      patientName: 'Luis Fernández',
      time: '14:00',
      endTime: '14:45',
      reason: 'Extracción',
      status: 'confirmed',
      type: 'Cirugía',
    },
    {
      id: '5',
      patientName: 'Patricia López',
      time: '15:30',
      endTime: '16:00',
      reason: 'Ortodoncia - Control',
      status: 'pending',
      type: 'Control',
    },
    {
      id: '6',
      patientName: 'Roberto Sánchez',
      time: '16:30',
      endTime: '17:15',
      reason: 'Blanqueamiento',
      status: 'confirmed',
      type: 'Estético',
    },
  ];

  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    const labels = {
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      cancelled: 'Cancelada',
      completed: 'Completada',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Calendario de Citas</h2>
          <Button className="bg-[#1976D2] hover:bg-[#0D47A1]" onClick={onNewAppointment}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Cita
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="ml-4 flex items-center gap-2 text-gray-700">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium capitalize">{formatDate(currentDate)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('day')}
              className={view === 'day' ? 'bg-[#1976D2]' : ''}
            >
              Día
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
              className={view === 'week' ? 'bg-[#1976D2]' : ''}
            >
              Semana
            </Button>
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
              className={view === 'month' ? 'bg-[#1976D2]' : ''}
            >
              Mes
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar View - Day */}
      {view === 'day' && (
        <div className="overflow-auto max-h-[calc(100vh-300px)]">
          <div className="p-6">
            {hours.map((hour) => {
              const hourAppointments = appointments.filter((apt) => {
                const aptHour = parseInt(apt.time.split(':')[0]);
                return aptHour === hour;
              });

              return (
                <div key={hour} className="flex border-b border-gray-200 min-h-[80px]">
                  <div className="w-20 py-4 text-sm text-gray-600 font-medium">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  <div className="flex-1 py-2 pl-4 relative">
                    {hourAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`mb-2 p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(
                          appointment.status
                        )}`}
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-semibold">
                                {appointment.time} - {appointment.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4" />
                              <span className="font-medium">{appointment.patientName}</span>
                            </div>
                            <p className="text-sm">{appointment.reason}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {appointment.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {hourAppointments.length === 0 && (
                      <div className="h-full flex items-center justify-center text-gray-300 text-sm">
                        <button
                          onClick={onNewAppointment}
                          className="hover:text-[#1976D2] transition-colors"
                        >
                          + Agregar cita
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week and Month views would go here */}
      {(view === 'week' || view === 'month') && (
        <div className="p-6 h-96 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <p className="text-lg">Vista de {view === 'week' ? 'Semana' : 'Mes'}</p>
            <p className="text-sm mt-2">En desarrollo</p>
          </div>
        </div>
      )}

      {/* Appointment Detail Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles de la Cita</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Paciente</label>
                <p className="font-medium text-lg">{selectedAppointment.patientName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Horario</label>
                  <p className="font-medium">
                    {selectedAppointment.time} - {selectedAppointment.endTime}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Estado</label>
                  <div className="mt-1">
                    <Badge
                      className={getStatusColor(selectedAppointment.status)}
                    >
                      {getStatusBadge(selectedAppointment.status)}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tipo</label>
                <p className="font-medium">{selectedAppointment.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Motivo</label>
                <p className="font-medium">{selectedAppointment.reason}</p>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                {selectedAppointment.status === 'pending' && (
                  <Button className="flex-1 bg-[#4CAF50] hover:bg-[#388E3C]">
                    Confirmar Cita
                  </Button>
                )}
                {selectedAppointment.status === 'confirmed' && (
                  <Button className="flex-1 bg-[#1976D2] hover:bg-[#0D47A1]">
                    Iniciar Consulta
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  Reprogramar
                </Button>
                <Button variant="outline" className="text-red-600 hover:bg-red-50">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
