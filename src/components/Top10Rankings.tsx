import React, { useState } from 'react';
import { Award, Flame, Zap, ShieldCheck, X } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface Top10RankingsProps {
  shoes: Shoe[];
  onClose: () => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const Top10Rankings: React.FC<Top10RankingsProps> = ({ shoes, onClose, onSelectShoe }) => {
  const [tab, setTab] = useState<'marathon' | 'speed' | 'value' | 'durability'>('marathon');

  const marathonTop = [...shoes].sort((a, b) => b.useCaseValues.marathonRaceScore - a.useCaseValues.marathonRaceScore);
  const speedTop = [...shoes].sort((a, b) => b.useCaseValues.speedWorkoutScore - a.useCaseValues.speedWorkoutScore);
  const valueTop = [...shoes].sort((a, b) => a.msrpUsd - b.msrpUsd);
  const durabilityTop = [...shoes].sort((a, b) => b.specs.estimatedLifespanKm - a.specs.estimatedLifespanKm);

  const activeList = 
    tab === 'marathon' ? marathonTop :
    tab === 'speed' ? speedTop :
    tab === 'value' ? valueTop : durabilityTop;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(10px)',
      zIndex: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          background: '#FFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{
          padding: '16px 24px',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={22} color="#EAB308" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              EasternRun Performance Benchmark Charts
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              color: 'var(--text-secondary)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          background: '#FFF',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 24px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'marathon', label: 'Marathon Race Day', icon: Flame },
            { id: 'speed', label: 'Tempo & Speed Workouts', icon: Zap },
            { id: 'value', label: 'Best Price Value ($)', icon: Zap },
            { id: 'durability', label: 'Outsole Lifespan Kings', icon: ShieldCheck },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                style={{
                  padding: '12px 18px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeList.map((shoe, idx) => (
              <div
                key={shoe.id}
                onClick={() => {
                  onClose();
                  onSelectShoe(shoe);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: idx === 0 ? '#EFF6FF' : '#F8FAFC',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: idx === 0 ? '#2563EB' : '#F1F5F9',
                    color: idx === 0 ? '#FFF' : 'var(--text-primary)',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    #{idx + 1}
                  </div>

                  <img src={shoe.image} alt={shoe.name} style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />

                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', display: 'block' }}>
                      {shoe.name}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Dominant: {shoe.dominantSector} • {shoe.specs.weightGrams}g
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {tab === 'marathon' && <strong style={{ color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{shoe.useCaseValues.marathonRaceScore} / 10</strong>}
                  {tab === 'speed' && <strong style={{ color: '#D97706', fontFamily: 'var(--font-mono)' }}>{shoe.useCaseValues.speedWorkoutScore} / 10</strong>}
                  {tab === 'value' && <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>${shoe.msrpUsd}</strong>}
                  {tab === 'durability' && <strong style={{ color: '#2563EB', fontFamily: 'var(--font-mono)' }}>{shoe.specs.estimatedLifespanKm} km</strong>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
