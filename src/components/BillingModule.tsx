'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Plus,
  Search,
  Filter,
  Eye,
  FileDown,
  Mail,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Invoice {
  id: string;
  number: string;
  date: string;
  patient: string;
  amount: number;
  status: 'authorized' | 'pending' | 'cancelled';
}

export function BillingModule() {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'FAC-001-001-000000123',
      date: '2024-11-20',
      patient: 'María González',
      amount: 250.50,
      status: 'authorized',
    },
    {
      id: '2',
      number: 'FAC-001-001-000000124',
      date: '2024-11-21',
      patient: 'Carlos Rodríguez',
      amount: 180.00,
      status: 'authorized',
    },
    {
      id: '3',
      number: 'FAC-001-001-000000125',
      date: '2024-11-22',
      patient: 'Ana Martínez',
      amount: 450.75,
      status: 'pending',
    },
    {
      id: '4',
      number: 'FAC-001-001-000000126',
      date: '2024-11-23',
      patient: 'Luis Fernández',
      amount: 320.00,
      status: 'authorized',
    },
    {
      id: '5',
      number: 'FAC-001-001-000000127',
      date: '2024-11-24',
      patient: 'Patricia López',
      amount: 95.00,
      status: 'cancelled',
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'authorized') {
      return <Badge className="bg-green-100 text-green-700">Autorizada</Badge>;
    }
    if (status === 'pending') {
      return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>;
    }
    return <Badge className="bg-red-100 text-red-700">Anulada</Badge>;
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Facturas Electrónicas</h2>
          <Button 
            className="bg-[#1976D2] hover:bg-[#0D47A1]"
            onClick={() => setShowNewInvoice(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Factura
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por número de factura o paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <div className="flex gap-3">
              <Input type="date" className="w-48" placeholder="Fecha desde" />
              <Input type="date" className="w-48" placeholder="Fecha hasta" />
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="authorized">Autorizadas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="cancelled">Anuladas</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </Button>

              {(searchTerm || statusFilter !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                N° Factura
              </th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                Fecha
              </th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                Paciente
              </th>
              <th className="px-8 py-4 text-right text-sm font-semibold text-gray-900">
                Monto
              </th>
              <th className="px-8 py-4 text-center text-sm font-semibold text-gray-900">
                Estado
              </th>
              <th className="px-8 py-4 text-right text-sm font-semibold text-gray-900">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-4">
                  <span className="font-mono text-sm">{invoice.number}</span>
                </td>
                <td className="px-8 py-4 text-gray-900">
                  {new Date(invoice.date).toLocaleDateString('es-ES')}
                </td>
                <td className="px-8 py-4 text-gray-900">{invoice.patient}</td>
                <td className="px-8 py-4 text-right font-semibold text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-8 py-4 text-center">{getStatusBadge(invoice.status)}</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Ver detalles"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Descargar PDF">
                      <FileDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Enviar por correo">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-8 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {filteredInvoices.length} de {invoices.length} facturas
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

      {/* New Invoice Modal */}
      <Dialog open={showNewInvoice} onOpenChange={setShowNewInvoice}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Nueva Factura</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Patient Search */}
            <div>
              <Label>Buscar Paciente</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Buscar por nombre o cédula..." className="pl-10" />
              </div>
            </div>

            {/* Patient Data (pre-filled) */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold">Datos del Paciente</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Nombre:</span>
                  <span className="ml-2 font-medium">María González</span>
                </div>
                <div>
                  <span className="text-gray-600">Cédula:</span>
                  <span className="ml-2 font-medium">1234567890</span>
                </div>
                <div>
                  <span className="text-gray-600">Dirección:</span>
                  <span className="ml-2 font-medium">Av. Principal 123</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">maria@email.com</span>
                </div>
              </div>
            </div>

            {/* Clinic Data (pre-filled) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold">Datos de la Clínica</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">RUC:</span>
                  <span className="ml-2 font-medium">1234567890001</span>
                </div>
                <div>
                  <span className="text-gray-600">Razón Social:</span>
                  <span className="ml-2 font-medium">Clínica Dental Central</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Ítems de la Factura</Label>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Ítem
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Código</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Descripción</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Cantidad</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">P. Unitario</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">Total</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <Input defaultValue="001" className="h-9" />
                      </td>
                      <td className="px-4 py-3">
                        <Input defaultValue="Limpieza dental" className="h-9" />
                      </td>
                      <td className="px-4 py-3">
                        <Input type="number" defaultValue="1" className="h-9 text-center" />
                      </td>
                      <td className="px-4 py-3">
                        <Input type="number" defaultValue="50.00" className="h-9 text-right" />
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">$50.00</td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <Input defaultValue="002" className="h-9" />
                      </td>
                      <td className="px-4 py-3">
                        <Input defaultValue="Obturación" className="h-9" />
                      </td>
                      <td className="px-4 py-3">
                        <Input type="number" defaultValue="2" className="h-9 text-center" />
                      </td>
                      <td className="px-4 py-3">
                        <Input type="number" defaultValue="75.00" className="h-9 text-right" />
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">$150.00</td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">$200.00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>IVA (12%):</span>
                <span className="font-semibold">$24.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-2xl">
                <span className="font-bold">TOTAL:</span>
                <span className="font-bold text-[#1976D2]">$224.00</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Forma de Pago</Label>
                <Select defaultValue="efectivo">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                    <SelectItem value="transferencia">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Observaciones (Opcional)</Label>
                <Input placeholder="Notas adicionales" className="mt-2" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1" onClick={() => setShowNewInvoice(false)}>
                Cancelar
              </Button>
              <Button variant="outline" className="flex-1">
                Guardar Borrador
              </Button>
              <Button className="flex-1 bg-[#4CAF50] hover:bg-[#388E3C]">
                Generar y Enviar al SRI
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice Details Modal */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de Factura</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">N° Factura</Label>
                  <p className="font-mono font-semibold">{selectedInvoice.number}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Estado</Label>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
                <div>
                  <Label className="text-gray-600">Fecha</Label>
                  <p className="font-medium">
                    {new Date(selectedInvoice.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Paciente</Label>
                  <p className="font-medium">{selectedInvoice.patient}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-gray-600">Monto Total</Label>
                <p className="text-3xl font-bold text-[#1976D2]">
                  ${selectedInvoice.amount.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1" variant="outline">
                  <FileDown className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button className="flex-1" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar por Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
