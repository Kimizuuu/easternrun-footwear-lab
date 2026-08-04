import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Shoe } from '../types/shoe';
import { getCompareSlug } from '../utils/slugUtils';

interface CompareGSMArenaProps {
  shoes: Shoe[];
  onClose: () => void;
  onRemoveShoe: (shoeId: string) => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const CompareGSMArena: React.FC<CompareGSMArenaProps> = ({
  shoes,
  onClose,
  onRemoveShoe,
}) => {
  const navigate = useNavigate();

  if (shoes.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ background: '#FFF', padding: 'clamp(16px, 4vw, 32px)', borderRadius: 'var(--radius-lg)', textAlign: 'center', maxWidth: '400px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 800 }}>No Shoes in Compare Tray</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Tap "+ Add to Compare" on shoe cards to compare up to 3 shoes side by side.
          </p>
          <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>Close</button>
        </div>
      </div>
    );
  }

  const handleOpenFullPageCompare = () => {
    if (shoes.length >= 2) {
      const slug = getCompareSlug(shoes[0], shoes[1]);
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
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '92vh',
          background: '#FFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Side-by-Side Specifics & Dominance Matrix
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Comparing {shoes.length} model(s)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {shoes.length >= 2 && (
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
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                Open Shareable SEO Page <ExternalLink size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: '#F1F5F9',
                color: 'var(--text-secondary)',
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
        </div>


        {/* Matrix Content */}
        <div style={{ overflowY: 'auto', overflowX: 'auto', flex: 1, padding: 'clamp(12px, 3vw, 24px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr>
                <th style={{ width: '22%', textAlign: 'left', padding: '12px', background: '#F8FAFC', borderBottom: '2px solid var(--border-subtle)' }}>
                  SPEC / SECTOR
                </th>
                {shoes.map((shoe) => (
                  <th key={shoe.id} style={{ textAlign: 'center', padding: '12px', background: '#F8FAFC', borderBottom: '2px solid var(--border-subtle)', width: `${78 / shoes.length}%` }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img src={shoe.image} alt={shoe.name} loading="lazy" decoding="async" style={{ width: '90px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{shoe.name}</strong>
                      <button
                        onClick={() => onRemoveShoe(shoe.id)}
                        style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '4px', padding: '8px 12px', minHeight: '44px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* DOMINANT SECTOR */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)' }}>DOMINANT SECTOR</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span className="badge badge-green">{shoe.dominantSector}</span>
                  </td>
                ))}
              </tr>

              {/* PRICE */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>MSRP PRICE</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>
                    ${shoe.msrpUsd} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(¥{shoe.msrpRmb})</span>
                  </td>
                ))}
              </tr>

              {/* WEIGHT */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>WEIGHT (US 9)</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 900, color: 'var(--accent-primary)' }}>
                    {shoe.specs.weightGrams}g ({shoe.specs.weightOz} oz)
                  </td>
                ))}
              </tr>

              {/* STACK & DROP */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>STACK / DROP</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
                    {shoe.specs.heelStackMm}mm / {shoe.specs.dropMm}mm Drop
                  </td>
                ))}
              </tr>

              {/* FOAM COMPOUND */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>MIDSOLE FOAM</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <strong>{shoe.specs.foamName}</strong>
                    <br />
                    <span style={{ color: '#059669', fontSize: '0.78rem', fontWeight: 700 }}>{shoe.specs.foamResiliencePercent}% Rebound</span>
                  </td>
                ))}
              </tr>

              {/* CARBON PLATE */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>CARBON PLATE</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    {shoe.specs.carbonPlate} (Index {shoe.specs.carbonStiffnessIndex}/10)
                  </td>
                ))}
              </tr>

              {/* MARATHON RACE SUITABILITY */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: '#DC2626', borderBottom: '1px solid var(--border-subtle)' }}>MARATHON RACE SCORE</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#DC2626' }}>
                    {shoe.useCaseValues.marathonRaceScore} / 10
                  </td>
                ))}
              </tr>

              {/* WALKING SUITABILITY */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: '#2563EB', borderBottom: '1px solid var(--border-subtle)' }}>WALKING SUITABILITY</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#2563EB' }}>
                    {shoe.useCaseValues.walkingScore} / 10
                  </td>
                ))}
              </tr>

              {/* CONSENSUS VERDICT */}
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>CONSENSUS VERDICT</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} style={{ textAlign: 'center', padding: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {shoe.finalConsensusVerdict}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
