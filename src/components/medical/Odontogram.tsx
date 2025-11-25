'use client';

import React, { useState } from 'react';
import { Tooth, ToothState } from '@/components/medical/Tooth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface OdontogramProps {
  initialTeeth?: Record<string, ToothState>;
  onTeethChange?: (teeth: Record<string, ToothState>) => void;
}

export function Odontogram({ initialTeeth, onTeethChange }: OdontogramProps) {
  // Initialize permanent teeth (32) and temporary teeth (20)
  const initializeTeeth = (): Record<string, ToothState> => {
    if (initialTeeth) return initialTeeth;

    const teeth: Record<string, ToothState> = {};
    
    // Permanent teeth
    const permanentQuadrants = [
      ['18', '17', '16', '15', '14', '13', '12', '11'],
      ['21', '22', '23', '24', '25', '26', '27', '28'],
      ['38', '37', '36', '35', '34', '33', '32', '31'],
      ['41', '42', '43', '44', '45', '46', '47', '48'],
    ];

    permanentQuadrants.flat().forEach(num => {
      teeth[num] = { number: num };
    });

    // Temporary teeth
    const temporaryQuadrants = [
      ['55', '54', '53', '52', '51'],
      ['61', '62', '63', '64', '65'],
      ['75', '74', '73', '72', '71'],
      ['81', '82', '83', '84', '85'],
    ];

    temporaryQuadrants.flat().forEach(num => {
      teeth[num] = { number: num };
    });

    return teeth;
  };

  const [teeth, setTeeth] = useState<Record<string, ToothState>>(initializeTeeth());
  const [selectedTooth, setSelectedTooth] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const permanentQuadrants = [
    ['18', '17', '16', '15', '14', '13', '12', '11'],
    ['21', '22', '23', '24', '25', '26', '27', '28'],
    ['38', '37', '36', '35', '34', '33', '32', '31'],
    ['41', '42', '43', '44', '45', '46', '47', '48'],
  ];

  const temporaryQuadrants = [
    ['55', '54', '53', '52', '51'],
    ['61', '62', '63', '64', '65'],
    ['75', '74', '73', '72', '71'],
    ['81', '82', '83', '84', '85'],
  ];

  const updateTooth = (toothNumber: string, updates: Partial<ToothState>) => {
    const newTeeth = {
      ...teeth,
      [toothNumber]: { ...teeth[toothNumber], ...updates },
    };
    setTeeth(newTeeth);
    onTeethChange?.(newTeeth);
  };

  const resetTooth = (toothNumber: string) => {
    const newTeeth = {
      ...teeth,
      [toothNumber]: { number: toothNumber },
    };
    setTeeth(newTeeth);
    onTeethChange?.(newTeeth);
  };

  const handleToothClick = (toothNumber: string) => {
    setSelectedTooth(toothNumber === selectedTooth ? null : toothNumber);
  };

  const currentTooth = selectedTooth ? teeth[selectedTooth] : null;

  return (
    <div className="flex gap-6 h-full">
      {/* Odontogram Display - 70% */}
      <div className="flex-1 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Odontograma</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(0.7, zoom - 0.1))}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(1.3, zoom + 0.1))}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div
          className="flex flex-col items-center gap-8"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          {/* Upper Arch - Permanent */}
          <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              {/* Upper Right */}
              <div className="flex gap-2">
                {permanentQuadrants[0].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={true}
                  />
                ))}
              </div>

              {/* Midline */}
              <div className="w-px bg-gray-400 mx-2"></div>

              {/* Upper Left */}
              <div className="flex gap-2">
                {permanentQuadrants[1].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={true}
                  />
                ))}
              </div>
            </div>

            {/* Upper Temporary */}
            <div className="flex gap-4">
              <div className="flex gap-2">
                {temporaryQuadrants[0].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={false}
                  />
                ))}
              </div>
              <div className="w-px bg-gray-300 mx-2"></div>
              <div className="flex gap-2">
                {temporaryQuadrants[1].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={false}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="w-full h-px bg-gray-400"></div>

          {/* Lower Arch - Permanent */}
          <div className="flex flex-col items-center">
            {/* Lower Temporary */}
            <div className="flex gap-4 mb-2">
              <div className="flex gap-2">
                {temporaryQuadrants[2].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={false}
                  />
                ))}
              </div>
              <div className="w-px bg-gray-300 mx-2"></div>
              <div className="flex gap-2">
                {temporaryQuadrants[3].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={false}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Lower Right */}
              <div className="flex gap-2">
                {permanentQuadrants[2].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={true}
                  />
                ))}
              </div>

              {/* Midline */}
              <div className="w-px bg-gray-400 mx-2"></div>

              {/* Lower Left */}
              <div className="flex gap-2">
                {permanentQuadrants[3].map(toothNum => (
                  <Tooth
                    key={toothNum}
                    tooth={teeth[toothNum]}
                    isSelected={selectedTooth === toothNum}
                    onClick={() => handleToothClick(toothNum)}
                    isPermanent={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="font-medium mb-3">Leyenda de Símbolos</h4>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-red-500"></div>
              <span>Caries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Obturado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">△</div>
              <span>Endodoncia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-700"></div>
              <span>Corona</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">✕</div>
              <span>Extracción</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">*</div>
              <span>Sellante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel - 30% */}
      <div className="w-96 bg-white rounded-lg p-6 shadow-sm border border-gray-200 overflow-y-auto">
        {selectedTooth ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold">Pieza Dental: {selectedTooth}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTooth(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* States Section */}
              <div className="space-y-3">
                <Label className="font-medium">Estado de la Pieza</Label>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="caries"
                    checked={currentTooth?.caries || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { caries: checked as boolean })
                    }
                  />
                  <label htmlFor="caries" className="text-sm cursor-pointer">
                    Caries (○)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="restored"
                    checked={currentTooth?.restored || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { restored: checked as boolean })
                    }
                  />
                  <label htmlFor="restored" className="text-sm cursor-pointer">
                    Obturado/Restaurado (●)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="endodontic"
                    checked={currentTooth?.endodontic || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { endodontic: checked as boolean })
                    }
                  />
                  <label htmlFor="endodontic" className="text-sm cursor-pointer">
                    Endodoncia (△)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="crown"
                    checked={currentTooth?.crown || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { crown: checked as boolean })
                    }
                  />
                  <label htmlFor="crown" className="text-sm cursor-pointer">
                    Corona (⊡)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="extraction"
                    checked={currentTooth?.extraction || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { extraction: checked as boolean })
                    }
                  />
                  <label htmlFor="extraction" className="text-sm cursor-pointer">
                    Extracción Indicada (✕)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sealant"
                    checked={currentTooth?.sealant || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { sealant: checked as boolean })
                    }
                  />
                  <label htmlFor="sealant" className="text-sm cursor-pointer">
                    Sellante (*)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="total"
                    checked={currentTooth?.total || false}
                    onCheckedChange={(checked) =>
                      updateTooth(selectedTooth, { total: checked as boolean })
                    }
                  />
                  <label htmlFor="total" className="text-sm cursor-pointer">
                    Prótesis Total (*PTS)
                  </label>
                </div>
              </div>

              {/* Mobility Section */}
              <div className="space-y-2">
                <Label htmlFor="mobility" className="font-medium">
                  Movilidad (0-3)
                </Label>
                <Input
                  id="mobility"
                  type="number"
                  min="0"
                  max="3"
                  value={currentTooth?.mobility || 0}
                  onChange={(e) =>
                    updateTooth(selectedTooth, {
                      mobility: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Recession Section */}
              <div className="space-y-2">
                <Label htmlFor="recession" className="font-medium">
                  Recesión (mm)
                </Label>
                <Input
                  id="recession"
                  type="number"
                  min="0"
                  value={currentTooth?.recession || 0}
                  onChange={(e) =>
                    updateTooth(selectedTooth, {
                      recession: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => resetTooth(selectedTooth)}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpiar Pieza
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              className="mb-4 opacity-40"
            >
              <path
                d="M 20 25 Q 20 15, 32 15 Q 44 15, 44 25 L 42 45 Q 42 50, 32 50 Q 22 50, 22 45 Z"
                fill="#E0E0E0"
                stroke="#BDBDBD"
                strokeWidth="2"
              />
            </svg>
            <p>Selecciona una pieza dental</p>
            <p className="text-sm mt-1">Haz clic en un diente para editarlo</p>
          </div>
        )}
      </div>
    </div>
  );
}
