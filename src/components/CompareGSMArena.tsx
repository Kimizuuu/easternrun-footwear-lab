import React, { useState } from 'react';
import { X, ExternalLink, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Shoe } from '../types/shoe';
import { getCompareSlug } from '../utils/slugUtils';

interface CompareGSMArenaProps {
  shoes: Shoe[];
  allShoes?: Shoe[];
  onClose: () => void;
  onRemoveShoe: (shoeId: string) => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const CompareGSMArena: React.FC<CompareGSMArenaProps> = ({
  shoes: selectedTrayShoes,
  allShoes = [],
  onClose,
}) => {
  const navigate = useNavigate();
  const availableList = allShoes.length > 0 ? allShoes : selectedTrayShoes;

  // Initialize slots: use tray shoes or fallback to default top flagship models
  const initialShoe1 = selectedTrayShoes[0] || availableList[0];
  const initialShoe2 = selectedTrayShoes[1] || availableList[1] || availableList[0];
  const initialShoe3 = selectedTrayShoes[2] || null;

  const [slot1, setSlot1] = useState<Shoe | null>(initialShoe1 || null);
  const [slot2, setSlot2] = useState<Shoe | null>(initialShoe2 || null);
  const [slot3, setSlot3] = useState<Shoe | null>(initialShoe3 || null);

  const activeCompareList = [slot1, slot2, slot3].filter((s): s is Shoe => s !== null);

  const handleOpenFullPageCompare = () => {
    if (activeCompareList.length >= 2) {
      const slug = getCompareSlug(activeCompareList[0], activeCompareList[1]);
      onClose();
      navigate(`/compare/${slug}`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(8px)',
      zIndex: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '92vh',
          background: '#FFFFFF',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)',
          border: '1px solid #E2E8F0'
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
          flexWrap: 'wrap',
          gap: '12px',
          flexShrink: 0
        }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              Side-by-Side Shoe Spec Comparison
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Select models below to compare lab specs, foams, and ratings</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeCompareList.length >= 2 && (
              <button
                onClick={handleOpenFullPageCompare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#2563EB',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                Shareable Link <ExternalLink size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: '#1E293B',
                color: '#94A3B8',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Model Selector Slots Bar */}
        <div style={{
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '12px',
          flexShrink: 0
        }}>
          {/* Slot 1 */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Shoe A
            </label>
            <select
              value={slot1?.id || ''}
              onChange={(e) => setSlot1(availableList.find(s => s.id === e.target.value) || null)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0F172A',
                minHeight: '44px'
              }}
            >
              {availableList.map((s) => (
                <option key={s.id} value={s.id}>{s.brand} {s.name} (${s.msrpUsd})</option>
              ))}
            </select>
          </div>

          {/* Slot 2 */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Shoe B
            </label>
            <select
              value={slot2?.id || ''}
              onChange={(e) => setSlot2(availableList.find(s => s.id === e.target.value) || null)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0F172A',
                minHeight: '44px'
              }}
            >
              {availableList.map((s) => (
                <option key={s.id} value={s.id}>{s.brand} {s.name} (${s.msrpUsd})</option>
              ))}
            </select>
          </div>

          {/* Slot 3 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                Shoe C (Optional)
              </label>
              {slot3 && (
                <button
                  onClick={() => setSlot3(null)}
                  style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.72rem', cursor: 'pointer', padding: 0 }}
                >
                  Clear
                </button>
              )}
            </div>
            {slot3 ? (
              <select
                value={slot3.id}
                onChange={(e) => setSlot3(availableList.find(s => s.id === e.target.value) || null)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  minHeight: '44px'
                }}
              >
                {availableList.map((s) => (
                  <option key={s.id} value={s.id}>{s.brand} {s.name} (${s.msrpUsd})</option>
                ))}
              </select>
            ) : (
              <button
                onClick={() => setSlot3(availableList[2] || availableList[0])}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px dashed #CBD5E1',
                  background: '#FFFFFF',
                  color: '#2563EB',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={16} /> Add 3rd Model
              </button>
            )}
          </div>
        </div>

        {/* Matrix Comparison Table */}
        <div style={{ overflowY: 'auto', overflowX: 'auto', flex: 1, padding: '20px' }}>
          {activeCompareList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              Select models in the dropdowns above to compare specifications.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '24%', textAlign: 'left', padding: '12px 16px', background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#64748B', fontWeight: 800 }}>
                    SPEC / METRIC
                  </th>
                  {activeCompareList.map((shoe) => (
                    <th key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', width: `${76 / activeCompareList.length}%` }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                          style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0' }}
                        />
                        <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>{shoe.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{shoe.brand}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* OVERALL RATING */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0F172A', borderBottom: '1px solid #E2E8F0' }}>OVERALL RATING</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontWeight: 900, fontSize: '1rem', color: '#2563EB', fontFamily: 'var(--font-mono)' }}>
                      {shoe.overallRating} / 100
                    </td>
                  ))}
                </tr>

                {/* MSRP PRICE */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>MSRP PRICE</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                      ${shoe.msrpUsd}
                    </td>
                  ))}
                </tr>

                {/* WEIGHT */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>WEIGHT (US 9)</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                      {shoe.specs.weightGrams}g ({shoe.specs.weightOz} oz)
                    </td>
                  ))}
                </tr>

                {/* STACK / DROP */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>STACK / DROP</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)' }}>
                      {shoe.specs.heelStackMm}mm / {shoe.specs.dropMm}mm
                    </td>
                  ))}
                </tr>

                {/* MIDSOLE FOAM */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>MIDSOLE FOAM</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>
                      <strong style={{ color: '#0F172A' }}>{shoe.specs.foamName}</strong>
                      <br />
                      <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>{shoe.specs.foamResiliencePercent}% Energy Return</span>
                    </td>
                  ))}
                </tr>

                {/* CARBON PLATE */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>CARBON PLATE</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>
                      {shoe.specs.carbonPlate}
                    </td>
                  ))}
                </tr>

                {/* MARATHON RACE SCORE */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#DC2626', borderBottom: '1px solid #E2E8F0' }}>MARATHON RACE DAY</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#DC2626' }}>
                      {shoe.useCaseValues.marathonRaceScore} / 100
                    </td>
                  ))}
                </tr>

                {/* SPEED WORKOUT SCORE */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#D97706', borderBottom: '1px solid #E2E8F0' }}>SPEED & TEMPO</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#D97706' }}>
                      {shoe.useCaseValues.speedWorkoutScore} / 100
                    </td>
                  ))}
                </tr>

                {/* DAILY RUNNING SCORE */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#059669', borderBottom: '1px solid #E2E8F0' }}>DAILY MILEAGE</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#059669' }}>
                      {shoe.useCaseValues.dailyRunScore} / 100
                    </td>
                  ))}
                </tr>

                {/* CUSHIONING SCORE */}
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2563EB', borderBottom: '1px solid #E2E8F0' }}>MAX CUSHION / WALKING</td>
                  {activeCompareList.map((shoe) => (
                    <td key={shoe.id} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#2563EB' }}>
                      {shoe.useCaseValues.walkingScore} / 100
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
