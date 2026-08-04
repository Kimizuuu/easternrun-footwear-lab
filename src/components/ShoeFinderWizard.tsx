import React, { useState } from 'react';
import { Compass, X, ArrowRight } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface ShoeFinderWizardProps {
  shoes: Shoe[];
  onClose: () => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const ShoeFinderWizard: React.FC<ShoeFinderWizardProps> = ({ shoes, onClose, onSelectShoe }) => {
  const [useCase, setUseCase] = useState<'race' | 'speed' | 'daily' | 'walking'>('race');
  const [maxBudget, setMaxBudget] = useState<number>(300);
  const [platePreference, setPlatePreference] = useState<'any' | 'carbon' | 'nylon' | 'none'>('any');
  const [foamPreference, setFoamPreference] = useState<'any' | 'peba' | 'supercritical' | 'soft'>('any');

  // Filter & Score Algorithm
  const scoredShoes = shoes
    .filter((shoe) => shoe.msrpUsd <= maxBudget)
    .filter((shoe) => {
      if (platePreference === 'carbon') {
        return shoe.specs.carbonPlate && (shoe.specs.carbonPlate.toLowerCase().includes('full') || shoe.specs.carbonPlate.toLowerCase().includes('3d'));
      }
      if (platePreference === 'nylon') {
        return shoe.specs.carbonPlate && (shoe.specs.carbonPlate.toLowerCase().includes('shank') || shoe.specs.carbonPlate.toLowerCase().includes('nylon'));
      }
      if (platePreference === 'none') {
        return !shoe.specs.carbonPlate || shoe.specs.carbonPlate.toLowerCase().includes('none');
      }
      return true;
    })
    .filter((shoe) => {
      if (foamPreference === 'peba') {
        return shoe.specs.foamName.toLowerCase().includes('peba') || shoe.specs.foamName.toLowerCase().includes('boom pe') || shoe.specs.foamName.toLowerCase().includes('zoomx');
      }
      if (foamPreference === 'supercritical') {
        return shoe.specs.foamName.toLowerCase().includes('supercritical') || shoe.specs.foamName.toLowerCase().includes('nitroedge') || shoe.specs.foamName.toLowerCase().includes('cqt');
      }
      if (foamPreference === 'soft') {
        return shoe.specs.foamName.toLowerCase().includes('soft') || shoe.specs.foamName.toLowerCase().includes('gravity') || shoe.specs.foamName.toLowerCase().includes('react');
      }
      return true;
    })
    .map((shoe) => {
      let baseScore = 0;
      if (useCase === 'race') baseScore = shoe.useCaseValues.marathonRaceScore;
      else if (useCase === 'speed') baseScore = shoe.useCaseValues.speedWorkoutScore;
      else if (useCase === 'daily') baseScore = shoe.useCaseValues.dailyRunScore;
      else baseScore = shoe.useCaseValues.walkingScore;

      // Price weight bonus: lower price within budget earns bonus value
      const valueBonus = Math.max(0, (maxBudget - shoe.msrpUsd) / 20);
      const matchPercentage = Math.min(99, Math.round(baseScore * 0.9 + valueBonus));

      return { shoe, matchPercentage, baseScore };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const topMatch = scoredShoes[0]?.shoe || shoes[0];
  const runnerUps = scoredShoes.slice(1, 3).map(s => s.shoe);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(12px)',
      zIndex: 260,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          background: '#FFFFFF',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.2)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column'
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
            <Compass size={22} color="#38BDF8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Multi-Aspect Shoe Sector Advisor
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Interactive custom match engine based on lab specs & budget</span>
            </div>
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
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Advisor Form Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Aspect 1: Intended Usage */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              1. Primary Usage Sector
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '10px' }}>
              {[
                { id: 'race', label: '⚡ Marathon Race Day' },
                { id: 'speed', label: '🔥 Speed & Tempo Workouts' },
                { id: 'daily', label: '👟 Daily Training Miles' },
                { id: 'walking', label: '☁️ Casual Walking & All-Day' },
              ].map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUseCase(u.id as any)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: useCase === u.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    background: useCase === u.id ? '#EFF6FF' : '#F8FAFC',
                    color: useCase === u.id ? '#1D4ED8' : '#334155',
                    fontWeight: useCase === u.id ? 800 : 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    minHeight: '44px'
                  }}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect 2: Custom Budget Slider & Presets */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                2. Max MSRP Budget
              </label>
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#2563EB', background: '#EFF6FF', padding: '4px 10px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                Max ${maxBudget}
              </span>
            </div>

            {/* Custom Interactive Range Slider */}
            <input
              type="range"
              min="70"
              max="300"
              step="5"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer', marginBottom: '10px' }}
            />

            {/* Budget Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { label: 'Under $100 (Budget Value)', value: 100 },
                { label: 'Under $150 (Mid-Range)', value: 150 },
                { label: 'Under $200 (Performance)', value: 200 },
                { label: 'Under $300 (Any Budget)', value: 300 },
              ].map((b) => (
                <button
                  key={b.value}
                  onClick={() => setMaxBudget(b.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: maxBudget === b.value ? '1px solid #2563EB' : '1px solid #CBD5E1',
                    background: maxBudget === b.value ? '#2563EB' : '#FFFFFF',
                    color: maxBudget === b.value ? '#FFFFFF' : '#475569',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    minHeight: '44px'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect 3: Carbon Plate Architecture Preference */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              3. Carbon Plate & Shank Preference
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '8px' }}>
              {[
                { id: 'any', label: 'Any Plate Setup' },
                { id: 'carbon', label: 'Full 3D Carbon Plate Only' },
                { id: 'nylon', label: 'Carbon Shank / Nylon Plate' },
                { id: 'none', label: 'Plate-Less (Pure Foam)' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatePreference(p.id as any)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: platePreference === p.id ? '1px solid #0F172A' : '1px solid #E2E8F0',
                    background: platePreference === p.id ? '#0F172A' : '#F8FAFC',
                    color: platePreference === p.id ? '#FFFFFF' : '#475569',
                    fontWeight: platePreference === p.id ? 700 : 500,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    minHeight: '44px'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect 4: Midsole Superfoam Preference */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              4. Midsole Superfoam Chemistry
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '8px' }}>
              {[
                { id: 'any', label: 'Any Foam Type' },
                { id: 'peba', label: 'PEBA Superfoam (Max Energy Return)' },
                { id: 'supercritical', label: 'Supercritical EVA/TPU' },
                { id: 'soft', label: 'Plush Cushion Foam' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFoamPreference(f.id as any)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: foamPreference === f.id ? '1px solid #0F172A' : '1px solid #E2E8F0',
                    background: foamPreference === f.id ? '#0F172A' : '#F8FAFC',
                    color: foamPreference === f.id ? '#FFFFFF' : '#475569',
                    fontWeight: foamPreference === f.id ? 700 : 500,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    minHeight: '44px'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Match Results Display */}
          <div style={{ borderTop: '2px solid #E2E8F0', paddingTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Match Results ({scoredShoes.length} qualifying shoes)
              </span>
            </div>

            {topMatch ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* #1 Top Recommended Match */}
                <div style={{
                  background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                  border: '2px solid #3B82F6',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={topMatch.image}
                      alt={topMatch.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                      style={{ width: '90px', height: '65px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #93C5FD' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ background: '#2563EB', color: '#FFF', fontSize: '0.72rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          #1 BEST MATCH
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E40AF' }}>
                          {scoredShoes[0]?.matchPercentage || 98}% Match Score
                        </span>
                      </div>
                      <strong style={{ fontSize: '1.2rem', color: '#0F172A', display: 'block' }}>{topMatch.name}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                        MSRP ${topMatch.msrpUsd} • {topMatch.specs.weightGrams}g • {topMatch.specs.foamName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectShoe(topMatch);
                    }}
                    style={{
                      padding: '10px 18px',
                      background: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      minHeight: '44px'
                    }}
                  >
                    View Deep Specs <ArrowRight size={16} />
                  </button>
                </div>

                {/* Runner Up Alternatives */}
                {runnerUps.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Runner-Up Alternatives
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '10px' }}>
                      {runnerUps.map((runner) => (
                        <div
                          key={runner.id}
                          onClick={() => {
                            onClose();
                            onSelectShoe(runner);
                          }}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s ease'
                          }}
                        >
                          <img
                            src={runner.image}
                            alt={runner.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                            style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ fontSize: '0.85rem', color: '#0F172A', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {runner.name}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>${runner.msrpUsd} • {runner.specs.weightGrams}g</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ padding: '20px', background: '#FFF1F2', color: '#9F1239', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                No shoes found under ${maxBudget} matching these exact plate and foam criteria. Try increasing your max budget slider or selecting "Any Foam / Any Plate".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
