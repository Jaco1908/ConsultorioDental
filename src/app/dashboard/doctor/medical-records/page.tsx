'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MedicalRecordForm } from '@/components/medical/MedicalRecordForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Plus, FileText } from 'lucide-react';

export default function MedicalRecordsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data de historias clínicas
  const mockRecords = [
    {
      id: '1',
      patientName: 'María González',
      recordNumber: 'HC-2024-0123',
      lastUpdate: '2024-11-20',
      status: 'Activa',
    },
    {
      id: '2',
      patientName: 'Carlos Rodríguez',
      recordNumber: 'HC-2024-0124',
      lastUpdate: '2024-11-18',
      status: 'Activa',
    },
    {
      id: '3',
      patientName: 'Ana Martínez',
      recordNumber: 'HC-2024-0125',
      lastUpdate: '2024-11-15',
      status: 'Activa',
    },
  ];

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

  if (showForm) {
    return (
      <MedicalRecordForm
        patientName={selectedPatient?.patientName || 'Paciente Nuevo'}
        onBack={() => {
          setShowForm(false);
          setSelectedPatient(null);
        }}
        onSave={(data) => {
          console.log('Historia clínica guardada:', data);
          setShowForm(false);
          setSelectedPatient(null);
        }}
      />
    );
  }

  const filteredRecords = mockRecords.filter((record) =>
    record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.recordNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/dashboard/doctor')}
                className="text-[#1976D2] hover:text-[#0D47A1] font-medium mb-2"
              >
                ← Volver al Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Historias Clínicas</h1>
              <p className="text-gray-600 mt-1">Gestiona las historias clínicas de tus pacientes</p>
            </div>
            <Button
              onClick={() => {
                setSelectedPatient(null);
                setShowForm(true);
              }}
              className="bg-[#1976D2] hover:bg-[#0D47A1]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Historia Clínica
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por paciente o número de historia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Records List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-[#1976D2]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{record.patientName}</h3>
                    <p className="text-sm text-gray-600">{record.recordNumber}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última actualización:</span>
                  <span className="font-medium">{record.lastUpdate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estado:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    {record.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedPatient(record);
                    setShowForm(true);
                  }}
                >
                  Ver/Editar
                </Button>
                <Button variant="outline" size="sm">
                  Imprimir
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron historias clínicas
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Intenta con otro término de búsqueda'
                : 'Comienza creando una nueva historia clínica'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-[#1976D2] hover:bg-[#0D47A1]"
              >
                <Plus className="w-5 h-5 mr-2" />
                Crear Primera Historia
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
