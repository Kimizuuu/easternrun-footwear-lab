import React, { useState } from 'react';
import { Compass, CheckCircle2, X } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface ShoeFinderWizardProps {
  shoes: Shoe[];
  onClose: () => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const ShoeFinderWizard: React.FC<ShoeFinderWizardProps> = ({ shoes, onClose, onSelectShoe }) => {
  const [useCase, setUseCase] = useState<'race' | 'speed' | 'daily' | 'walking'>('race');
  const [budget, setBudget] = useState<'all' | 'under150' | 'under200'>('all');

  let filtered = [...shoes];

  if (budget === 'under150') {
    filtered = filtered.filter((s) => s.msrpUsd <= 150);
  } else if (budget === 'under200') {
    filtered = filtered.filter((s) => s.msrpUsd <= 200);
  }

  if (useCase === 'race') {
    filtered.sort((a, b) => b.useCaseValues.marathonRaceScore - a.useCaseValues.marathonRaceScore);
  } else if (useCase === 'speed') {
    filtered.sort((a, b) => b.useCaseValues.speedWorkoutScore - a.useCaseValues.speedWorkoutScore);
  } else if (useCase === 'daily') {
    filtered.sort((a, b) => b.useCaseValues.dailyRunScore - a.useCaseValues.dailyRunAnalysis.length);
  } else {
    filtered.sort((a, b) => b.useCaseValues.walkingScore - a.useCaseValues.walkingScore);
  }

  const topMatch = filtered[0] || shoes[0];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(10px)',
      zIndex: 260,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '750px',
          background: '#FFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
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
            <Compass size={22} color="#2563EB" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Shoe Sector Advisor
            </h2>
          </div>

          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              1. What is your primary intended usage?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {[
                { id: 'race', label: ' Marathon Race Day' },
                { id: 'speed', label: ' Speed & Tempo Workouts' },
                { id: 'daily', label: ' Daily Training Miles' },
                { id: 'walking', label: ' Casual Walking & All-Day' },
              ].map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUseCase(u.id as any)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: useCase === u.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: useCase === u.id ? '#EFF6FF' : '#F8FAFC',
                    color: useCase === u.id ? '#2563EB' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              2. Target MSRP Budget
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { id: 'all', label: 'Any Budget ($100 - $290)' },
                { id: 'under200', label: 'Under $200' },
                { id: 'under150', label: 'Under $150 (Budget Value)' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudget(b.id as any)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: budget === b.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: budget === b.id ? '#EFF6FF' : '#F8FAFC',
                    color: budget === b.id ? '#2563EB' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Recommendation Result */}
          {topMatch && (
            <div style={{
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={topMatch.image} alt={topMatch.name} loading="lazy" decoding="async" style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#2563EB" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>Recommended Match</span>
                  </div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block' }}>{topMatch.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>MSRP ${topMatch.msrpUsd} • Weight {topMatch.specs.weightGrams}g</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onSelectShoe(topMatch);
                }}
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                View Deep Specs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
