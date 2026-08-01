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
        transition: 'border-color 0.15s ease',
        transform: 'translateZ(0)', // GPU hardware acceleration for 60fps mobile scrolling
        willChange: 'transform'
      }}
    >
      {/* Product Image Stage */}
      <div 
        style={{
          position: 'relative',
          height: '220px',
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
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Dominant Sector Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.95)',
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
            padding: '8px 12px',
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
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, gap: '14px', justifyContent: 'space-between' }}>
        <div>
          <h3 
            onClick={() => onSelect(shoe)}
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              margin: '0 0 4px 0',
              cursor: 'pointer',
              color: '#0F172A',
              lineHeight: 1.3,
              height: '2.6rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {shoe.name}
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 500, display: 'block' }}>
            {shoe.brand} • {shoe.category}
          </span>
        </div>

        {/* Key Specs Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          padding: '10px 12px',
          fontSize: '0.78rem'
        }}>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>Weight</span>
            <strong style={{ color: '#0F172A', fontFamily: 'var(--font-mono)' }}>{shoe.specs.weightGrams}g</strong>
          </div>

          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>Drop</span>
            <strong style={{ color: '#0F172A', fontFamily: 'var(--font-mono)' }}>{shoe.specs.dropMm}mm</strong>
          </div>

          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>Foam</span>
            <strong style={{ color: '#2563EB', fontFamily: 'var(--font-mono)' }}>{shoe.specs.foamResiliencePercent}%</strong>
          </div>
        </div>

        {/* Bottom MSRP & Review Trigger Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          borderTop: '1px solid #F1F5F9'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>MSRP Price</span>
            <strong style={{ fontSize: '1.15rem', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
              ${shoe.msrpUsd}
            </strong>
          </div>

          <button
            onClick={() => onSelect(shoe)}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 16px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Lab Review</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};
