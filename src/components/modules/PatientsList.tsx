'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  Edit,
  Calendar,
  MoreVertical,
  Phone,
  Mail,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Patient {
  id: string;
  name: string;
  cedula: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  status: 'active' | 'inactive';
}

interface PatientsListProps {
  onPatientSelect?: (patientId: string) => void;
  onNewPatient?: () => void;
}

export function PatientsList({ onPatientSelect, onNewPatient }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  const patients: Patient[] = [
    {
      id: '1',
      name: 'María González',
      cedula: '1234567890',
      age: 32,
      gender: 'F',
      phone: '0987654321',
      email: 'maria.gonzalez@email.com',
      lastVisit: '2024-11-20',
      status: 'active',
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      cedula: '0987654321',
      age: 45,
      gender: 'M',
      phone: '0991234567',
      email: 'carlos.rodriguez@email.com',
      lastVisit: '2024-11-18',
      status: 'active',
    },
    {
      id: '3',
      name: 'Ana Martínez',
      cedula: '1122334455',
      age: 28,
      gender: 'F',
      phone: '0998877665',
      email: 'ana.martinez@email.com',
      lastVisit: '2024-11-15',
      status: 'active',
    },
    {
      id: '4',
      name: 'Luis Fernández',
      cedula: '5544332211',
      age: 56,
      gender: 'M',
      phone: '0987123456',
      email: 'luis.fernandez@email.com',
      lastVisit: '2024-11-10',
      status: 'active',
    },
    {
      id: '5',
      name: 'Patricia López',
      cedula: '6677889900',
      age: 19,
      gender: 'F',
      phone: '0991928374',
      email: 'patricia.lopez@email.com',
      lastVisit: '2024-11-22',
      status: 'active',
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cedula.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAge =
      ageFilter === 'all' ||
      (ageFilter === '0-12' && patient.age <= 12) ||
      (ageFilter === '13-18' && patient.age >= 13 && patient.age <= 18) ||
      (ageFilter === '19-60' && patient.age >= 19 && patient.age <= 60) ||
      (ageFilter === '60+' && patient.age > 60);

    const matchesGender =
      genderFilter === 'all' || patient.gender === genderFilter;

    return matchesSearch && matchesAge && matchesGender;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pacientes</h2>
          <Button className="bg-[#1976D2] hover:bg-[#0D47A1]" onClick={onNewPatient}>
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Paciente
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, cédula o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          <div className="flex gap-3">
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Edad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las edades</SelectItem>
                <SelectItem value="0-12">0-12 años</SelectItem>
                <SelectItem value="13-18">13-18 años</SelectItem>
                <SelectItem value="19-60">19-60 años</SelectItem>
                <SelectItem value="60+">60+ años</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Femenino</SelectItem>
              </SelectContent>
            </Select>

            {(ageFilter !== 'all' || genderFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setAgeFilter('all');
                  setGenderFilter('all');
                }}
              >
                Limpiar Filtros
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Paciente
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Cédula
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Edad
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Contacto
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Última Visita
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onPatientSelect?.(patient.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-[#1976D2] text-white">
                          {getInitials(patient.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{patient.cedula}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {patient.age} años
                    </span>
                    <span className="ml-2 text-gray-500">
                      ({patient.gender === 'M' ? 'M' : 'F'})
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {patient.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(patient.lastVisit).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPatientSelect?.(patient.id);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit patient', patient.id);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('New appointment for', patient.id);
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Historia Clínica</DropdownMenuItem>
                          <DropdownMenuItem>Generar Factura</DropdownMenuItem>
                          <DropdownMenuItem>Enviar Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Desactivar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Users className="w-12 h-12 mb-4 opacity-40" />
                    <p className="text-lg font-medium mb-1">
                      No se encontraron pacientes
                    </p>
                    <p className="text-sm">
                      Intenta con otros términos de búsqueda o ajusta los filtros
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredPatients.length} de {patients.length} pacientes
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-[#1976D2] text-white">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}