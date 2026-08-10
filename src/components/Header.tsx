import React from 'react';
import { Scale, Award, Compass, Search } from 'lucide-react';
import type { Brand } from '../types/shoe';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedBrand: Brand | 'All';
  setSelectedBrand: (b: Brand | 'All') => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenTop10: () => void;
  onOpenWizard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  compareCount,
  onOpenCompare,
  onOpenTop10,
  onOpenWizard,
}) => {
  const BRANDS: (Brand | 'All')[] = ['All', 'Li-Ning', 'ANTA', 'Xtep', '361°', 'Qiaodan', 'Nike', 'Adidas', 'Saucony', 'ASICS', 'Mizuno', 'New Balance', 'HOKA', 'Brooks', 'Skechers', 'Salomon', 'On Running', 'Altra', 'La Sportiva'];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#E0E5EC',
      borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 8px 16px #b8c2cc'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Main Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setSelectedBrand('All')}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--accent-primary)',
              color: '#FFF',
              fontWeight: 900,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '-0.5px',
              boxShadow: '4px 4px 8px #b8c2cc'
            }}>
              ER
            </div>
            <div>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                Eastern<span style={{ color: 'var(--accent-primary)' }}>Run</span>
              </h1>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Independent Global Running Shoe Database
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1',
            maxWidth: '380px'
          }}>
            <Search 
              size={16} 
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} 
            />
            <input
              type="text"
              placeholder="Search shoe model, foam, carbon plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                borderRadius: '20px',
                background: '#E0E5EC',
                boxShadow: 'var(--neu-pressed)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onOpenWizard}
              className="neu-button"
              style={{
                borderRadius: '20px',
                padding: '7px 16px',
                minHeight: '40px',
                fontSize: '0.8rem',
                fontWeight: 700,
                gap: '6px'
              }}
            >
              <Compass size={15} color="#2563EB" /> Shoe Advisor
            </button>

            <button
              onClick={onOpenTop10}
              className="neu-button"
              style={{
                borderRadius: '20px',
                padding: '7px 16px',
                minHeight: '40px',
                fontSize: '0.8rem',
                fontWeight: 700,
                gap: '6px'
              }}
            >
              <Award size={15} color="#EAB308" /> Top Charts
            </button>

            <button
              onClick={onOpenCompare}
              className="neu-button"
              style={{
                position: 'relative',
                borderRadius: '20px',
                padding: '7px 16px',
                minHeight: '40px',
                fontSize: '0.8rem',
                fontWeight: 800,
                gap: '6px'
              }}
            >
              <Scale size={15} />
              Compare
              {compareCount > 0 && (
                <span style={{
                  background: '#2563EB',
                  color: '#FFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 900
                }}>
                  {compareCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Brand Selector Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginRight: '4px' }}>
            Brands:
          </span>
          {BRANDS.map((brand) => {
            const isActive = selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                style={{
                  background: isActive ? 'linear-gradient(145deg, #ffffff, #cbd5e1)' : 'linear-gradient(145deg, #ffffff, #e2e8f0)',
                  color: isActive ? '#0F172A' : '#475569',
                  border: isActive ? '1.5px solid #0F172A' : '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '20px',
                  boxShadow: isActive ? 'inset 2px 2px 4px #b4bec9, inset -2px -2px 4px #ffffff, 0 4px 10px rgba(15,23,42,0.1)' : 'var(--neu-shadow-sm)',
                  padding: '5px 15px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 900 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
