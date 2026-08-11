import React, { useState } from 'react';
import { Award, Flame, Zap, ShieldCheck, X } from 'lucide-react';
import type { Shoe } from '../types/shoe';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface Top10RankingsProps {
  shoes: Shoe[];
  onClose: () => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const Top10Rankings: React.FC<Top10RankingsProps> = ({ shoes, onClose, onSelectShoe }) => {
  useBodyScrollLock();
  const [tab, setTab] = useState<'marathon' | 'speed' | 'walking' | 'trail' | 'durability'>('marathon');

  const marathonTop = [...shoes].sort((a, b) => b.useCaseValues.marathonRaceScore - a.useCaseValues.marathonRaceScore);
  const speedTop = [...shoes].sort((a, b) => b.useCaseValues.speedWorkoutScore - a.useCaseValues.speedWorkoutScore);
  const walkingTop = [...shoes].sort((a, b) => b.useCaseValues.walkingScore - a.useCaseValues.walkingScore);
  const trailTop = [...shoes].sort((a, b) => (b.useCaseValues.trailScore || 0) - (a.useCaseValues.trailScore || 0));
  const durabilityTop = [...shoes].sort((a, b) => b.specs.estimatedLifespanKm - a.specs.estimatedLifespanKm);

  const activeList = 
    tab === 'marathon' ? marathonTop :
    tab === 'speed' ? speedTop :
    tab === 'walking' ? walkingTop :
    tab === 'trail' ? trailTop : durabilityTop;

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
        role="dialog"
        aria-modal="true"
        aria-label="Benchmark Rankings & Leaderboards"
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
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          background: '#0F172A',
          color: '#FFFFFF',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={22} color="#EAB308" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              EasternRun Performance Benchmark Charts
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#1E293B',
              color: '#94A3B8',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 24px',
          overflowX: 'auto',
          gap: '8px',
          flexShrink: 0
        }}>
          {[
            { id: 'marathon', label: '🏃 Marathon Race Day', icon: Flame },
            { id: 'speed', label: '⚡ Tempo & Speed', icon: Zap },
            { id: 'walking', label: '🚶 Walking & Travel', icon: Award },
            { id: 'trail', label: '🏔️ Mountain & Trail', icon: ShieldCheck },
            { id: 'durability', label: '🛡️ Durability Kings', icon: ShieldCheck },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: isActive ? '#2563EB' : '#FFFFFF',
                  border: isActive ? '1px solid #2563EB' : '1px solid #CBD5E1',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '44px',
                  boxShadow: isActive ? '0 2px 4px rgba(37, 99, 235, 0.2)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#FFFFFF' : '#64748B'} /> {t.label}
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

                  <img src={shoe.image} alt={shoe.name} loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }} style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />

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
                  {tab === 'marathon' && <strong style={{ color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{shoe.useCaseValues.marathonRaceScore} / 100</strong>}
                  {tab === 'speed' && <strong style={{ color: '#D97706', fontFamily: 'var(--font-mono)' }}>{shoe.useCaseValues.speedWorkoutScore} / 100</strong>}
                  {tab === 'walking' && <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>{shoe.useCaseValues.walkingScore} / 100</strong>}
                  {tab === 'trail' && <strong style={{ color: '#16A34A', fontFamily: 'var(--font-mono)' }}>{shoe.useCaseValues.trailScore || 90} / 100</strong>}
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
