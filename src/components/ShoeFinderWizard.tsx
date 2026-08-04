import React, { useState } from 'react';
import { Compass, X, ArrowRight, Check } from 'lucide-react';
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
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
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
          maxWidth: '780px',
          maxHeight: '90vh',
          background: '#FFFFFF',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
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
            <Compass size={20} color="#38BDF8" />
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Shoe Sector Advisor
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Select your requirements to identify optimal laboratory matches</span>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ 
              background: '#1E293B', 
              color: '#94A3B8',
              border: 'none', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Advisor Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Intended Usage */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1. Intended Usage Sector
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '8px' }}>
              {[
                { id: 'race', label: 'Marathon Race Day' },
                { id: 'speed', label: 'Speed & Tempo Workouts' },
                { id: 'daily', label: 'Daily Training Miles' },
                { id: 'walking', label: 'Casual Walking & All-Day' },
              ].map((u) => {
                const isActive = useCase === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => setUseCase(u.id as any)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      border: isActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
                      background: isActive ? '#EFF6FF' : '#F8FAFC',
                      color: isActive ? '#1D4ED8' : '#334155',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{u.label}</span>
                    {isActive && <Check size={16} color="#2563EB" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Budget Slider & Presets */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                2. Max MSRP Budget
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E40AF', background: '#EFF6FF', padding: '3px 10px', borderRadius: '4px', border: '1px solid #BFDBFE' }}>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { label: 'Under $100', value: 100 },
                { label: 'Under $150', value: 150 },
                { label: 'Under $200', value: 200 },
                { label: 'Under $300 (Any Budget)', value: 300 },
              ].map((b) => {
                const isActive = maxBudget === b.value;
                return (
                  <button
                    key={b.value}
                    onClick={() => setMaxBudget(b.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: isActive ? '1px solid #2563EB' : '1px solid #CBD5E1',
                      background: isActive ? '#2563EB' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      minHeight: '44px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Carbon Plate Preference */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              3. Plate Architecture
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '6px' }}>
              {[
                { id: 'any', label: 'Any Setup' },
                { id: 'carbon', label: 'Full 3D Carbon Plate' },
                { id: 'nylon', label: 'Carbon Shank / Nylon' },
                { id: 'none', label: 'Plate-Less (Pure Foam)' },
              ].map((p) => {
                const isActive = platePreference === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatePreference(p.id as any)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                      background: isActive ? '#0F172A' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      minHeight: '44px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Foam Chemistry */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              4. Midsole Foam Chemistry
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '6px' }}>
              {[
                { id: 'any', label: 'Any Foam' },
                { id: 'peba', label: 'PEBA Superfoam' },
                { id: 'supercritical', label: 'Supercritical EVA/TPU' },
                { id: 'soft', label: 'Plush Cushion Foam' },
              ].map((f) => {
                const isActive = foamPreference === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFoamPreference(f.id as any)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                      background: isActive ? '#0F172A' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      minHeight: '44px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Match Results Display */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                MATCH RESULTS ({scoredShoes.length} QUALIFYING MODELS)
              </span>
            </div>

            {topMatch ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* #1 Top Recommended Match */}
                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '16px 20px',
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
                      style={{ width: '85px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ background: '#0F172A', color: '#FFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          TOP MATCH
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563EB' }}>
                          {scoredShoes[0]?.matchPercentage || 98}% Match Rating
                        </span>
                      </div>
                      <strong style={{ fontSize: '1.1rem', color: '#0F172A', display: 'block' }}>{topMatch.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
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
                      background: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      minHeight: '44px'
                    }}
                  >
                    View Specs <ArrowRight size={16} />
                  </button>
                </div>

                {/* Runner Up Alternatives */}
                {runnerUps.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Alternative Matches
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '8px' }}>
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
                            borderRadius: '6px',
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            src={runner.image}
                            alt={runner.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                            style={{ width: '48px', height: '34px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ fontSize: '0.82rem', color: '#0F172A', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
              <div style={{ padding: '16px', background: '#F8FAFC', color: '#475569', borderRadius: '6px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #E2E8F0' }}>
                No shoes found under ${maxBudget} matching these exact criteria. Try adjusting your budget slider or selecting "Any Foam / Any Plate".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
