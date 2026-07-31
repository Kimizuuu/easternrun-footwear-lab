import React from 'react';
import { Scale, Check, ArrowRight, Star } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface ShoeCardGSMArenaProps {
  shoe: Shoe;
  onSelect: (shoe: Shoe) => void;
  isCompared: boolean;
  onToggleCompare: (shoe: Shoe) => void;
}

export const ShoeCardGSMArena: React.FC<ShoeCardGSMArenaProps> = ({
  shoe,
  onSelect,
  isCompared,
  onToggleCompare,
}) => {
  return (
    <article
      className="card-clean"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        transition: 'border-color 0.15s ease'
      }}
    >
      {/* Product Image Stage */}
      <div 
        style={{
          position: 'relative',
          height: '235px',
          width: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0'
        }}
        onClick={() => onSelect(shoe)}
      >
        <img
          src={shoe.image}
          alt={shoe.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Dominant Sector Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{
            background: '#FFFFFF',
            color: '#1E293B',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            {shoe.dominantSector}
          </span>
        </div>

        {/* Overall Rating Badge (100-Basis) */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <div style={{
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '4px',
            padding: '4px 9px',
            fontSize: '0.82rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Star size={13} fill="#EAB308" color="#EAB308" />
            <span>{shoe.overallRating}</span>
            <span style={{ color: '#94A3B8', fontSize: '0.7rem', fontWeight: 500 }}>/100</span>
          </div>
        </div>

        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(shoe);
          }}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: isCompared ? '#0F172A' : '#FFFFFF',
            color: isCompared ? '#FFFFFF' : '#334155',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            padding: '5px 10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {isCompared ? <Check size={14} /> : <Scale size={14} />}
          {isCompared ? 'Compared' : 'Compare'}
        </button>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, gap: '14px' }}>
        <div>
          <h3 
            onClick={() => onSelect(shoe)}
            style={{
              fontSize: '1.12rem',
              fontWeight: 800,
              margin: '0 0 4px 0',
              cursor: 'pointer',
              color: '#0F172A'
            }}
          >
            {shoe.name}
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 500 }}>
            {shoe.brand} • {shoe.category}
          </span>
        </div>

        {/* Key Specs Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8FAFC',
          padding: '10px 14px',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            <span style={{ color: '#94A3B8', fontSize: '0.72rem', display: 'block', textTransform: 'uppercase' }}>Price</span>
            <strong style={{ color: '#0F172A' }}>${shoe.msrpUsd}</strong>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#94A3B8', fontSize: '0.72rem', display: 'block', textTransform: 'uppercase' }}>Weight</span>
            <strong style={{ color: '#2563EB' }}>{shoe.specs.weightGrams}g</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#94A3B8', fontSize: '0.72rem', display: 'block', textTransform: 'uppercase' }}>Drop</span>
            <strong style={{ color: '#0F172A' }}>{shoe.specs.dropMm}mm</strong>
          </div>
        </div>

        {/* Bottom Action */}
        <button
          onClick={() => onSelect(shoe)}
          style={{
            marginTop: 'auto',
            width: '100%',
            background: '#F1F5F9',
            color: '#0F172A',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '9px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          View Lab Review <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
};
