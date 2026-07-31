import React, { useState } from 'react';
import { X, Ruler, Info, CheckCircle2 } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose, brandName = 'All' }) => {
  const [activeBrandTab, setActiveBrandTab] = useState<'Li-Ning' | 'Anta' | '361°'>(
    brandName === 'Li-Ning' ? 'Li-Ning' : brandName === 'Anta' ? 'Anta' : '361°'
  );

  if (!isOpen) return null;

  const sizeTable = [
    { usMen: '7.0', usWomen: '8.5', eur: '40.0', uk: '6.5', cm: '25.0 cm', mm: '250 mm' },
    { usMen: '7.5', usWomen: '9.0', eur: '40.5', uk: '7.0', cm: '25.5 cm', mm: '255 mm' },
    { usMen: '8.0', usWomen: '9.5', eur: '41.5', uk: '7.5', cm: '26.0 cm', mm: '260 mm' },
    { usMen: '8.5', usWomen: '10.0', eur: '42.0', uk: '8.0', cm: '26.5 cm', mm: '265 mm' },
    { usMen: '9.0', usWomen: '10.5', eur: '42.5', uk: '8.5', cm: '26.5 cm', mm: '265 mm' },
    { usMen: '9.5', usWomen: '11.0', eur: '43.0', uk: '9.0', cm: '27.0 cm', mm: '270 mm' },
    { usMen: '10.0', usWomen: '11.5', eur: '44.0', uk: '9.5', cm: '27.5 cm', mm: '275 mm' },
    { usMen: '10.5', usWomen: '12.0', eur: '44.5', uk: '10.0', cm: '28.0 cm', mm: '280 mm' },
    { usMen: '11.0', usWomen: '12.5', eur: '45.0', uk: '10.5', cm: '28.5 cm', mm: '285 mm' },
    { usMen: '11.5', usWomen: '13.0', eur: '46.0', uk: '11.0', cm: '29.0 cm', mm: '290 mm' },
    { usMen: '12.0', usWomen: '13.5', eur: '46.5', uk: '11.5', cm: '29.5 cm', mm: '295 mm' },
  ];

  const brandGuides = {
    'Li-Ning': {
      title: 'Li-Ning Sizing & Fit Benchmark',
      description: 'Li-Ning race shoes (Feidian 6.0 Ultra/Elite) feature an aggressive BOOM FIBER race lockdown. Fits true to US Men’s sizing. Runners with wider feet or thick socks prefer true-to-size for race days, or +0.5 size for daily training (Chitu 9 Ultra).',
      tips: [
        'Uses standard CM foot length labeling (e.g. 265mm = US 9 / EUR 42.5).',
        'Feidian carbon race line has a snug race heel counter for zero slip.',
        'Red Hare (Chitu) daily series has generous forefoot volume.'
      ]
    },
    'Anta': {
      title: 'ANTA Sizing & Fit Benchmark',
      description: 'ANTA carbon race models (C202 6 Pro / GT) feature a sleek aerodynamic A-WEB upper. ANTA sizing aligns closely with Nike/Adidas US sizing, with a secure locked-in midfoot.',
      tips: [
        'PG7 Travel & Classic daily models have wide-friendly toe boxes.',
        'C202 carbon racing line features structured arch support and locked heel collar.',
        'If between sizes on race shoes, order your standard Nike marathon size.'
      ]
    },
    '361°': {
      title: '361° Sizing & Fit Benchmark',
      description: '361° running shoes (Furious Future 2.0, Flame 5, Flame 3.0) are widely acclaimed on Reddit for their accommodating forefoot width. They run true to US size with zero toe pinch.',
      tips: [
        'ET series (Flame 4 ET, Flame 3 ET) explicitly features wider last dimensions.',
        'Qu!kSKIN upper mesh stretches comfortably around forefoot bony points.',
        'Sub-185g race models fit securely through midfoot saddle.'
      ]
    }
  };

  const currentGuide = brandGuides[activeBrandTab];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      padding: '20px'
    }}>
      <div className="animate-scale-in" style={{
        background: '#FFFFFF',
        borderRadius: '8px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          background: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ruler size={20} color="#2563EB" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>
              International Size Conversion & Fit Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          fontSize: '0.85rem',
          color: '#334155'
        }}>
          {/* Brand Selector Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
            {(['Li-Ning', 'Anta', '361°'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setActiveBrandTab(b)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: activeBrandTab === b ? '1px solid #0F172A' : '1px solid #E2E8F0',
                  background: activeBrandTab === b ? '#0F172A' : '#F8FAFC',
                  color: activeBrandTab === b ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {b} Size Guide
              </button>
            ))}
          </div>

          {/* Brand Guide Banner */}
          <div style={{ background: '#EFF6FF', padding: '14px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Info size={16} color="#2563EB" />
              <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1E40AF' }}>
                {currentGuide.title}
              </h4>
            </div>
            <p style={{ margin: '0 0 8px 0', color: '#1E3A8A', lineHeight: 1.5, fontSize: '0.82rem' }}>
              {currentGuide.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {currentGuide.tips.map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#1E40AF' }}>
                  <CheckCircle2 size={13} color="#2563EB" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Table */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>
              Standard US / EUR / UK / CM Size Conversion Matrix
            </h4>
            <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textWrap: 'nowrap' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#0F172A', textAlign: 'left' }}>
                    <th style={{ padding: '8px 10px', fontWeight: 800 }}>US Men</th>
                    <th style={{ padding: '8px 10px', fontWeight: 800 }}>US Women</th>
                    <th style={{ padding: '8px 10px', fontWeight: 800 }}>EUR Size</th>
                    <th style={{ padding: '8px 10px', fontWeight: 800 }}>UK Size</th>
                    <th style={{ padding: '8px 10px', fontWeight: 800 }}>Foot Length (CM)</th>
                    <th style={{ padding: '8px 10px', fontWeight: 800 }}>Foot Length (MM)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeTable.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #F1F5F9', background: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                      <td style={{ padding: '7px 10px', fontWeight: 700, color: '#2563EB' }}>{row.usMen}</td>
                      <td style={{ padding: '7px 10px', color: '#475569' }}>{row.usWomen}</td>
                      <td style={{ padding: '7px 10px', fontWeight: 600, color: '#0F172A' }}>{row.eur}</td>
                      <td style={{ padding: '7px 10px', color: '#475569' }}>{row.uk}</td>
                      <td style={{ padding: '7px 10px', fontWeight: 600, color: '#059669' }}>{row.cm}</td>
                      <td style={{ padding: '7px 10px', color: '#64748B' }}>{row.mm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 18px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close Sizing Guide
          </button>
        </div>
      </div>
    </div>
  );
};
