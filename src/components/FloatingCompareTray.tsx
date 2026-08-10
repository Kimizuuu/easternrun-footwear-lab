import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface FloatingCompareTrayProps {
  comparedShoes: Shoe[];
  onRemoveShoe: (shoeId: string) => void;
  onClearAll: () => void;
  onOpenCompare: () => void;
}

export const FloatingCompareTray: React.FC<FloatingCompareTrayProps> = ({
  comparedShoes,
  onRemoveShoe,
  onClearAll,
  onOpenCompare,
}) => {
  if (comparedShoes.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      maxWidth: '92vw',
      width: '680px',
      background: '#0F172A',
      color: '#FFFFFF',
      borderRadius: '12px',
      padding: '12px 18px',
      boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Thumbnails Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0, overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <Scale size={18} color="#38BDF8" />
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8' }}>
            Compare ({comparedShoes.length}/3)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', flex: 1 }}>
          {comparedShoes.map((shoe) => (
            <div
              key={shoe.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '4px 8px 4px 6px',
                flexShrink: 0
              }}
            >
              <img
                src={shoe.image}
                alt={shoe.name}
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {shoe.name}
              </span>
              <button
                onClick={() => onRemoveShoe(shoe.id)}
                aria-label={`Remove ${shoe.name} from comparison`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={onClearAll}
          style={{
            background: 'transparent',
            color: '#94A3B8',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 8px'
          }}
        >
          Clear
        </button>

        <button
          onClick={onOpenCompare}
          style={{
            background: '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            padding: '9px 16px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minHeight: '38px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
          }}
        >
          <span>Compare Specs</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
