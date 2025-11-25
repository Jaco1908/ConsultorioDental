'use client';

import React from 'react';
import { DentalSymbol } from './DentalSymbol';

export interface ToothState {
  number: string;
  caries?: boolean;
  restored?: boolean;
  endodontic?: boolean;
  crown?: boolean;
  extraction?: boolean;
  sealant?: boolean;
  bridge?: boolean;
  removable?: boolean;
  total?: boolean;
  mobility?: number;
  recession?: number;
}

interface ToothProps {
  tooth: ToothState;
  isSelected: boolean;
  onClick: () => void;
  isPermanent: boolean;
}

export function Tooth({ tooth, isSelected, onClick, isPermanent }: ToothProps) {
  const getSymbols = () => {
    const symbols = [];
    if (tooth.caries) symbols.push(<DentalSymbol key="caries" type="caries" size={16} />);
    if (tooth.restored) symbols.push(<DentalSymbol key="restored" type="restored" size={16} />);
    if (tooth.endodontic) symbols.push(<DentalSymbol key="endodontic" type="endodontic" size={16} />);
    if (tooth.crown) symbols.push(<DentalSymbol key="crown" type="crown" size={16} />);
    if (tooth.extraction) symbols.push(<DentalSymbol key="extraction" type="extraction" size={16} />);
    if (tooth.sealant) symbols.push(<DentalSymbol key="sealant" type="sealant" size={14} />);
    if (tooth.total) symbols.push(<DentalSymbol key="total" type="total" size={14} />);
    return symbols;
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
        isSelected ? 'scale-110 z-10' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      {/* Tooth SVG */}
      <svg
        width="40"
        height="60"
        viewBox="0 0 40 60"
        className={`transition-all ${isSelected ? 'drop-shadow-lg' : ''}`}
      >
        {/* Crown (top part) */}
        <path
          d="M 10 15 Q 10 5, 20 5 Q 30 5, 30 15 L 28 35 Q 28 40, 20 40 Q 12 40, 12 35 Z"
          fill={isSelected ? '#E3F2FD' : '#FFFFFF'}
          stroke={isSelected ? '#1976D2' : '#757575'}
          strokeWidth={isSelected ? '2.5' : '1.5'}
        />
        {/* Root (bottom part) */}
        <path
          d="M 18 40 L 16 55 Q 16 58, 20 58 Q 24 58, 24 55 L 22 40 Z"
          fill={isSelected ? '#E3F2FD' : '#F5F5F5'}
          stroke={isSelected ? '#1976D2' : '#757575'}
          strokeWidth={isSelected ? '2.5' : '1.5'}
        />
      </svg>

      {/* Tooth Number */}
      <div
        className={`absolute top-1/3 text-xs font-medium ${
          isSelected ? 'text-[#1976D2]' : 'text-gray-700'
        }`}
      >
        {tooth.number}
      </div>

      {/* Symbols Overlay */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-0.5 pointer-events-none pt-4">
        {getSymbols()}
      </div>

      {/* Mobility indicator */}
      {tooth.mobility !== undefined && tooth.mobility > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
          {tooth.mobility}
        </div>
      )}

      {/* Recession indicator */}
      {tooth.recession !== undefined && tooth.recession > 0 && (
        <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
          {tooth.recession}
        </div>
      )}
    </div>
  );
}
