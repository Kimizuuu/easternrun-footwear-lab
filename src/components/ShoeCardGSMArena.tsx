import React from 'react';
import { Scale, Check, ArrowRight, Star } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface ShoeCardGSMArenaProps {
  shoe: Shoe;
  onSelect: (shoe: Shoe) => void;
  isCompared: boolean;
  onToggleCompare: (shoe: Shoe) => void;
  displayScore?: number;
  displayScoreLabel?: string;
}

export const ShoeCardGSMArena: React.FC<ShoeCardGSMArenaProps> = ({
  shoe,
  onSelect,
  isCompared,
  onToggleCompare,
  displayScore,
  displayScoreLabel,
}) => {
  const activeScore = displayScore !== undefined ? displayScore : shoe.overallRating;
  const scoreLabel = displayScoreLabel ? displayScoreLabel : 'Overall';

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
          height: '250px',
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
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Dominant Sector Badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1E293B',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            padding: '5px 12px',
            fontSize: '0.78rem',
            fontWeight: 700
          }}>
            {shoe.dominantSector}
          </span>
        </div>

        {/* Dynamic Sector Rating Badge (100-Basis) */}
        <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
          <div style={{
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '4px',
            padding: '5px 10px',
            fontSize: '0.85rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <Star size={14} fill="#EAB308" color="#EAB308" />
            <span>{activeScore}</span>
            <span style={{ color: '#94A3B8', fontSize: '0.72rem', fontWeight: 500 }}>/100 ({scoreLabel})</span>
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
            bottom: '14px',
            right: '14px',
            background: isCompared ? '#0F172A' : '#FFFFFF',
            color: isCompared ? '#FFFFFF' : '#334155',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            padding: '8px 14px',
            minHeight: '44px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {isCompared ? <Check size={14} /> : <Scale size={14} />}
          {isCompared ? 'Compared' : 'Compare'}
        </button>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '16px', justifyContent: 'space-between' }}>
        <div>
          <h3 
            onClick={() => onSelect(shoe)}
            style={{
              fontSize: '1.18rem',
              fontWeight: 800,
              margin: '0 0 6px 0',
              cursor: 'pointer',
              color: '#0F172A',
              lineHeight: 1.3,
              height: '2.8rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {shoe.name}
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, display: 'block' }}>
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
          padding: '12px 16px',
          fontSize: '0.82rem'
        }}>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700 }}>Weight</span>
            <strong style={{ color: '#0F172A', fontFamily: 'var(--font-mono)' }}>{shoe.specs.weightGrams}g</strong>
          </div>

          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700 }}>Drop</span>
            <strong style={{ color: '#0F172A', fontFamily: 'var(--font-mono)' }}>{shoe.specs.dropMm}mm</strong>
          </div>

          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700 }}>Foam</span>
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
            <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Price</span>
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
              minHeight: '44px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>View Specs</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};
