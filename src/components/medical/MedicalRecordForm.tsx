'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Odontogram } from '@/components/medical/Odontogram';
import { Save, FileText, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MedicalRecordFormProps {
  patientId?: string;
  patientName?: string;
  onSave?: (data: any) => void;
  onBack?: () => void;
}

export function MedicalRecordForm({ 
  patientId, 
  patientName = 'María González',
  onSave,
  onBack 
}: MedicalRecordFormProps) {
  const [activeTab, setActiveTab] = useState('datos');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSaveDraft = () => {
    setLastSaved(new Date());
    // Aquí iría la lógica de guardado
  };

  const handleSaveAndFinish = () => {
    // Aquí iría la lógica de guardado final
    onSave?.({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="text-[#1976D2] hover:text-[#0D47A1] font-medium"
            >
              ← Volver
            </button>
            <h1 className="text-xl font-bold text-gray-900">Historia Clínica</h1>
            <div className="flex items-center gap-3">
              {lastSaved && (
                <span className="text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
                  Guardado {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button className="bg-[#1976D2] hover:bg-[#0D47A1]" onClick={handleSaveAndFinish}>
                <FileText className="w-4 h-4 mr-2" />
                Guardar y Finalizar
              </Button>
            </div>
          </div>

          {/* Patient Info Bar */}
          <div className="bg-blue-50 rounded-lg px-6 py-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">{patientName}</h2>
                <p className="text-sm text-gray-600">CI: 1234567890 • Edad: 32 años • Femenino</p>
              </div>
              <Badge className="bg-blue-600">HC-2024-0123</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-0">
            <TabsTrigger value="datos" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              1. Datos
            </TabsTrigger>
            <TabsTrigger value="motivo" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              2. Motivo
            </TabsTrigger>
            <TabsTrigger value="enfermedad" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              3. Enfermedad
            </TabsTrigger>
            <TabsTrigger value="antecedentes" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              4. Antecedentes
            </TabsTrigger>
            <TabsTrigger value="signos" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              5. Signos Vitales
            </TabsTrigger>
            <TabsTrigger value="examen" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              6. Examen
            </TabsTrigger>
            <TabsTrigger value="odontograma" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              7. Odontograma
            </TabsTrigger>
            <TabsTrigger value="indicadores" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              8. Indicadores
            </TabsTrigger>
            <TabsTrigger value="indices" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              9. Índices
            </TabsTrigger>
            <TabsTrigger value="planes" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              10. Planes
            </TabsTrigger>
            <TabsTrigger value="diagnostico" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              11. Diagnóstico
            </TabsTrigger>
            <TabsTrigger value="tratamiento" className="rounded-none border-b-2 data-[state=active]:border-[#1976D2]">
              12. Tratamiento
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="p-8">
            {/* SECCIÓN 1: Datos del Paciente */}
            <TabsContent value="datos" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Datos del Paciente y Establecimiento</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Establecimiento</Label>
                    <Input defaultValue="Clínica Dental Central" className="mt-2" />
                  </div>
                  <div>
                    <Label>N° Historia Clínica</Label>
                    <Input defaultValue="HC-2024-0123" disabled className="mt-2 bg-gray-100" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Nombres</Label>
                    <Input defaultValue="María" className="mt-2" />
                  </div>
                  <div>
                    <Label>Apellidos</Label>
                    <Input defaultValue="González Pérez" className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label>Cédula de Identidad</Label>
                    <Input defaultValue="1234567890" className="mt-2" />
                  </div>
                  <div>
                    <Label>Sexo</Label>
                    <Select defaultValue="F">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Edad (calculada)</Label>
                    <Input defaultValue="32 años" disabled className="mt-2 bg-gray-100" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="minor" />
                  <label htmlFor="minor" className="text-sm font-medium cursor-pointer">
                    Paciente menor de edad (mostrar datos del representante)
                  </label>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 2: Motivo de Consulta */}
            <TabsContent value="motivo" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Motivo de Consulta</h3>
                <div>
                  <Label>Describa el motivo principal de la consulta</Label>
                  <Textarea 
                    placeholder="Ej: Dolor en muela superior derecha desde hace 3 días..."
                    className="mt-2 min-h-[200px]"
                  />
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 3: Enfermedad o Problema Actual */}
            <TabsContent value="enfermedad" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Enfermedad o Problema Actual</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Síntomas</Label>
                    <Textarea placeholder="Describa los síntomas..." className="mt-2" />
                  </div>
                  <div>
                    <Label>Cronología (inicio, evolución)</Label>
                    <Textarea placeholder="¿Cuándo comenzó? ¿Cómo ha evolucionado?" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label>Localización</Label>
                      <Input placeholder="Zona afectada" className="mt-2" />
                    </div>
                    <div>
                      <Label>Intensidad</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leve">Leve</SelectItem>
                          <SelectItem value="moderada">Moderada</SelectItem>
                          <SelectItem value="severa">Severa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Características</Label>
                    <Textarea placeholder="Tipo de dolor, duración, frecuencia..." className="mt-2" />
                  </div>
                  <div>
                    <Label>Causa aparente</Label>
                    <Input placeholder="¿Qué cree que lo causó?" className="mt-2" />
                  </div>
                  <div>
                    <Label>Síntomas asociados</Label>
                    <Textarea placeholder="Otros síntomas relacionados..." className="mt-2" />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 4: Antecedentes */}
            <TabsContent value="antecedentes" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Antecedentes Personales y Familiares</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="alergia-antibioticos" />
                        <div className="flex-1">
                          <label htmlFor="alergia-antibioticos" className="font-medium cursor-pointer">
                            Alergia a antibióticos
                          </label>
                          <Input placeholder="Especificar cuál" className="mt-2" />
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox id="alergia-anestesia" />
                        <div className="flex-1">
                          <label htmlFor="alergia-anestesia" className="font-medium cursor-pointer">
                            Alergia a anestesia
                          </label>
                          <Input placeholder="Especificar tipo" className="mt-2" />
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox id="hemorragias" />
                        <div className="flex-1">
                          <label htmlFor="hemorragias" className="font-medium cursor-pointer">
                            Hemorragias
                          </label>
                          <Input placeholder="Detalles" className="mt-2" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox id="vih" />
                        <label htmlFor="vih" className="font-medium cursor-pointer">
                          VIH/SIDA
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox id="tuberculosis" />
                        <label htmlFor="tuberculosis" className="font-medium cursor-pointer">
                          Tuberculosis
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox id="asma" />
                        <label htmlFor="asma" className="font-medium cursor-pointer">
                          Asma
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="diabetes" />
                        <div className="flex-1">
                          <label htmlFor="diabetes" className="font-medium cursor-pointer">
                            Diabetes
                          </label>
                          <Select>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tipo1">Tipo 1</SelectItem>
                              <SelectItem value="tipo2">Tipo 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox id="hipertension" />
                        <label htmlFor="hipertension" className="font-medium cursor-pointer">
                          Hipertensión
                        </label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox id="enfermedad-cardiaca" />
                        <div className="flex-1">
                          <label htmlFor="enfermedad-cardiaca" className="font-medium cursor-pointer">
                            Enfermedad cardíaca
                          </label>
                          <Input placeholder="Especificar" className="mt-2" />
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox id="otro" />
                        <div className="flex-1">
                          <label htmlFor="otro" className="font-medium cursor-pointer">
                            Otro
                          </label>
                          <Textarea placeholder="Especificar otros antecedentes" className="mt-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 5: Signos Vitales */}
            <TabsContent value="signos" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Signos Vitales</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Presión Arterial (mmHg)</Label>
                    <Input placeholder="Ej: 120/80" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Normal: 90/60 - 120/80</p>
                  </div>
                  <div>
                    <Label>Frecuencia Cardíaca (ppm)</Label>
                    <Input type="number" placeholder="Ej: 75" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Normal: 60 - 100</p>
                  </div>
                  <div>
                    <Label>Temperatura (°C)</Label>
                    <Input type="number" step="0.1" placeholder="Ej: 36.5" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Normal: 36.1 - 37.2</p>
                  </div>
                  <div>
                    <Label>Frecuencia Respiratoria (rpm)</Label>
                    <Input type="number" placeholder="Ej: 16" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Normal: 12 - 20</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 Los valores fuera de rango se marcarán automáticamente con alerta
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 6: Examen Estomatognático */}
            <TabsContent value="examen" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Examen del Sistema Estomatognático</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Labios</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Mejillas</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Maxilar Superior</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Maxilar Inferior</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Lengua</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Paladar</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Piso de Boca</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Carrillos</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Glándulas Salivales</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Orofaringe</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>ATM (Articulación Temporomandibular)</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                  <div>
                    <Label>Ganglios</Label>
                    <Textarea placeholder="Hallazgos..." className="mt-2" rows={3} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 7: Odontograma */}
            <TabsContent value="odontograma" className="mt-0">
              <Odontogram />
            </TabsContent>

            {/* SECCIÓN 8: Indicadores de Salud Bucal */}
            <TabsContent value="indicadores" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Indicadores de Salud Bucal</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Higiene Oral Simplificada</Label>
                    <RadioGroup defaultValue="regular">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buena" id="higiene-buena" />
                        <label htmlFor="higiene-buena" className="cursor-pointer">Buena</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="higiene-regular" />
                        <label htmlFor="higiene-regular" className="cursor-pointer">Regular</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mala" id="higiene-mala" />
                        <label htmlFor="higiene-mala" className="cursor-pointer">Mala</label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label>Enfermedad Periodontal</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ninguna">Ninguna</SelectItem>
                          <SelectItem value="leve">Leve</SelectItem>
                          <SelectItem value="moderada">Moderada</SelectItem>
                          <SelectItem value="severa">Severa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Maloclusión</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ninguna">Ninguna</SelectItem>
                          <SelectItem value="angle1">Angle Clase I</SelectItem>
                          <SelectItem value="angle2">Angle Clase II</SelectItem>
                          <SelectItem value="angle3">Angle Clase III</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Fluorosis</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ninguna">Ninguna</SelectItem>
                          <SelectItem value="leve">Leve</SelectItem>
                          <SelectItem value="moderada">Moderada</SelectItem>
                          <SelectItem value="severa">Severa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Placa Bacteriana (%)</Label>
                      <Input type="number" min="0" max="100" placeholder="0-100" className="mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 9: Índices CPO-ceo */}
            <TabsContent value="indices" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Índices CPO-ceo</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 Estos índices se calculan automáticamente basándose en el odontograma
                    </p>
                  </div>

                  {/* CPO - Dientes Permanentes */}
                  <div>
                    <h4 className="font-semibold mb-4">CPO (Dientes Permanentes)</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-red-600">0</div>
                        <div className="text-sm text-gray-600 mt-1">Cariados</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-gray-600">0</div>
                        <div className="text-sm text-gray-600 mt-1">Perdidos</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">1</div>
                        <div className="text-sm text-gray-600 mt-1">Obturados</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center bg-gray-50">
                        <div className="text-3xl font-bold text-gray-900">1</div>
                        <div className="text-sm text-gray-600 mt-1">TOTAL CPO</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">Bajo</Badge>
                      <span className="text-sm text-gray-600">Índice dentro del rango saludable</span>
                    </div>
                  </div>

                  {/* ceo - Dientes Temporales */}
                  <div>
                    <h4 className="font-semibold mb-4">ceo (Dientes Temporales)</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-red-600">0</div>
                        <div className="text-sm text-gray-600 mt-1">cariados</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-gray-600">0</div>
                        <div className="text-sm text-gray-600 mt-1">extraídos</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">0</div>
                        <div className="text-sm text-gray-600 mt-1">obturados</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center bg-gray-50">
                        <div className="text-3xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-600 mt-1">TOTAL ceo</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">Excelente</Badge>
                      <span className="text-sm text-gray-600">Sin afectación en dentición temporal</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 10: Planes */}
            <TabsContent value="planes" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Planes</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label>Plan Diagnóstico</Label>
                    <Textarea 
                      placeholder="Estudios y exámenes necesarios (radiografías, pruebas de laboratorio, etc.)"
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label>Plan Terapéutico</Label>
                    <Textarea 
                      placeholder="Tratamientos a realizar, procedimientos planificados, cronograma..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label>Plan Educacional</Label>
                    <Textarea 
                      placeholder="Indicaciones de higiene bucal, técnicas de cepillado, uso de hilo dental, prevención..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 11: Diagnóstico */}
            <TabsContent value="diagnostico" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-6">Diagnóstico</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label>Diagnóstico Presuntivo (Pre-diagnóstico)</Label>
                    <div className="flex gap-3 mt-2">
                      <Input placeholder="Código CIE-10" className="w-40" />
                      <Input placeholder="Descripción del diagnóstico presuntivo" className="flex-1" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Diagnóstico preliminar antes de exámenes complementarios
                    </p>
                  </div>

                  <div>
                    <Label>Diagnóstico Definitivo</Label>
                    <div className="flex gap-3 mt-2">
                      <Input placeholder="Código CIE-10" className="w-40" />
                      <Input placeholder="Descripción del diagnóstico definitivo" className="flex-1" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Diagnóstico final confirmado con exámenes y evaluación completa
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 Busca códigos CIE-10 comunes en odontología: K00-K14 (Enfermedades de la cavidad bucal)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SECCIÓN 12: Tratamiento por Sesiones */}
            <TabsContent value="tratamiento" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Registro de Tratamiento por Sesiones</h3>
                  <Button variant="outline">
                    + Agregar Nueva Sesión
                  </Button>
                </div>

                {/* Sesión 1 - Ejemplo */}
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Sesión #1</h4>
                    <Badge>Completada</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha de la Sesión</Label>
                      <Input type="date" className="mt-2" defaultValue="2024-11-24" />
                    </div>
                    <div>
                      <Label>Código de Hoja</Label>
                      <Input placeholder="H-001" className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <Label>Diagnósticos y Complicaciones</Label>
                    <Textarea 
                      placeholder="Diagnósticos confirmados durante la sesión, complicaciones presentadas..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Procedimientos Realizados</Label>
                    <Textarea 
                      placeholder="Lista de procedimientos ejecutados en esta sesión..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <h5 className="font-medium mb-3">Prescripciones Médicas</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <Input placeholder="Medicamento" />
                        <Input placeholder="Dosis" />
                        <Input placeholder="Frecuencia" />
                      </div>
                      <Button variant="outline" size="sm">+ Agregar Medicamento</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Label>Firma Digital del Doctor</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center text-gray-500">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Firma digital</p>
                      <p className="text-xs">Dr. Juan Pérez - Registro: 12345</p>
                    </div>
                  </div>
                </div>

                {/* Placeholder para más sesiones */}
                <div className="border-2 border-dashed rounded-lg p-12 text-center text-gray-400">
                  <p className="mb-2">No hay más sesiones registradas</p>
                  <Button variant="outline">+ Agregar Nueva Sesión</Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
