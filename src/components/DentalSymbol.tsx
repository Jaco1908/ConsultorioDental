'use client';

import React from 'react';

interface DentalSymbolProps {
  type: 'caries' | 'restored' | 'endodontic' | 'crown' | 'extraction' | 'sealant' | 'bridge' | 'removable' | 'total';
  size?: number;
}

export function DentalSymbol({ type, size = 20 }: DentalSymbolProps) {
  const getSymbolSvg = () => {
    switch (type) {
      case 'caries':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#EF5350" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'restored':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" fill="#2196F3" />
          </svg>
        );
      case 'endodontic':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M12 4 L20 20 L4 20 Z" stroke="#9C27B0" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'crown':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <rect x="6" y="8" width="12" height="12" stroke="#424242" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'extraction':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" stroke="#424242" strokeWidth="2" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="#424242" strokeWidth="2" />
          </svg>
        );
      case 'sealant':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <text x="12" y="16" textAnchor="middle" fontSize="16" fill="#424242">*</text>
          </svg>
        );
      case 'bridge':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="12" x2="20" y2="12" stroke="#424242" strokeWidth="2" />
            <rect x="9" y="8" width="6" height="8" fill="#424242" />
          </svg>
        );
      case 'removable':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M4 12 Q8 6, 12 12 T20 12" stroke="#424242" strokeWidth="2" fill="none" />
            <path d="M4 12 Q8 18, 12 12 T20 12" stroke="#424242" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'total':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#F44336">PTS</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return <div className="inline-flex items-center justify-center">{getSymbolSvg()}</div>;
}
