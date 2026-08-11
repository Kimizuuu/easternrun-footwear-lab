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
  cardIndex?: number;
}

export const ShoeCardGSMArena: React.FC<ShoeCardGSMArenaProps> = ({
  shoe,
  onSelect,
  isCompared,
  onToggleCompare,
  displayScore,
  displayScoreLabel,
  cardIndex = 99,
}) => {
  const activeScore = displayScore !== undefined ? displayScore : shoe.overallRating;
  const scoreLabel = displayScoreLabel ? displayScoreLabel : 'Overall';

  return (
    <article
      className="neu-card"
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: '#E8EEF3',
        boxShadow: 'var(--neu-shadow)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        transition: 'all 0.2s ease',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {/* Product Image Stage */}
      <div 
        style={{
          position: 'relative',
          height: '240px',
          width: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          background: '#E8EEF3',
          boxShadow: 'inset 4px 4px 8px #c2c9d0, inset -4px -4px 8px #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 20px'
        }}
        onClick={() => onSelect(shoe)}
      >
        <img
          src={shoe.image}
          alt={shoe.name}
          loading={cardIndex < 4 ? 'eager' : 'lazy'}
          decoding="async"
          onError={(e) => { const img = e.currentTarget; img.onerror = null; img.src = '/images/fallback-shoe.jpg'; }}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center center',
            mixBlendMode: 'multiply',
            display: 'block',
            transition: 'transform 0.3s ease'
          }}
        />

        {/* Dominant Sector Dual-Tone White Neumorphic Badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          <span style={{
            background: 'linear-gradient(145deg, #ffffff, #e2e8f0)',
            color: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '0.75rem',
            fontWeight: 800,
            boxShadow: '4px 4px 8px #b4bec9, -4px -4px 8px #ffffff'
          }}>
            {shoe.dominantSector}
          </span>
        </div>

        {/* Dynamic Rating Neumorphic Badge */}
        <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
          <div style={{
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '0.82rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '4px 4px 10px rgba(15,23,42,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Star size={13} fill="#EAB308" color="#EAB308" />
            <span>{activeScore}</span>
            <span style={{ color: '#CBD5E1', fontSize: '0.7rem', fontWeight: 500 }}>/100 ({scoreLabel})</span>
          </div>
        </div>

        {/* Tactile Neumorphic Compare Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(shoe);
          }}
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '14px',
            background: '#E0E5EC',
            color: isCompared ? '#2563EB' : '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '20px',
            padding: '6px 14px',
            minHeight: '38px',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: isCompared ? 'inset 3px 3px 6px #b8c2cc, inset -3px -3px 6px #ffffff' : '4px 4px 8px #b8c2cc, -4px -4px 8px #ffffff'
          }}
        >
          {isCompared ? <Check size={14} color="#2563EB" /> : <Scale size={14} />}
          {isCompared ? 'Compared' : 'Compare'}
        </button>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '16px', justifyContent: 'space-between' }}>
        <div>
          <h3 
            onClick={() => onSelect(shoe)}
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              margin: '0 0 4px 0',
              cursor: 'pointer',
              color: '#0F172A',
              lineHeight: 1.3,
              height: '2.7rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {shoe.name}
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, display: 'block' }}>
            {shoe.brand} • {shoe.category}
          </span>
        </div>

        {/* Key Specs Inset Dark Neumorphic Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          background: 'linear-gradient(145deg, #0F172A, #1E293B)',
          color: '#FFFFFF',
          boxShadow: 'inset 3px 3px 6px #080d17, inset -3px -3px 6px #28374d, 0 4px 12px rgba(15,23,42,0.25)',
          borderRadius: '12px',
          padding: '12px 8px',
          fontSize: '0.78rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', fontWeight: 700 }}>Weight</span>
            <strong style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{shoe.specs.weightGrams}g</strong>
          </div>

          <div>
            <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', fontWeight: 700 }}>Drop</span>
            <strong style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{shoe.specs.dropMm}mm</strong>
          </div>

          <div title="EasternRun Energy Return Estimate (Foam Resilience %)">
            <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', fontWeight: 700 }}>Energy Ret</span>
            <strong style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{shoe.specs.foamResiliencePercent}%</strong>
          </div>

          <div title="Plate Stiffness Index (1-10 Scale)">
            <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.62rem', textTransform: 'uppercase', fontWeight: 700 }}>Stiffness</span>
            <strong style={{ color: '#34D399', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              {shoe.specs.carbonStiffnessIndex > 0 ? `${shoe.specs.carbonStiffnessIndex}/10` : 'Flex'}
            </strong>
          </div>
        </div>

        {/* Bottom MSRP & View Specs Tactile Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.6)'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Price</span>
            <strong style={{ fontSize: '1.15rem', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
              ${shoe.msrpUsd}
            </strong>
          </div>

          <button
            onClick={() => onSelect(shoe)}
            className="neu-button"
            style={{
              padding: '10px 18px',
              minHeight: '40px',
              fontSize: '0.82rem',
              fontWeight: 700,
              gap: '6px',
              color: '#0F172A'
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
