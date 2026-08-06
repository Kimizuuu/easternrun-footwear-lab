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
  const BRANDS: (Brand | 'All')[] = ['All', 'Li-Ning', 'Anta', 'Xtep', '361°', 'Qiaodan', 'Nike', 'Adidas', 'Saucony', 'ASICS', 'Mizuno', 'New Balance', 'HOKA', 'Brooks', 'Skechers', 'Salomon', 'On Running', 'Altra', 'La Sportiva'];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
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
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-primary)',
              color: '#FFF',
              fontWeight: 900,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '-0.5px'
            }}>
              RA
            </div>
            <div>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                RUN<span style={{ color: 'var(--accent-primary)' }}>ARENA</span>
              </h1>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Global & Chinese Running Shoes Database
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
                borderRadius: 'var(--radius-full)',
                background: '#F1F5F9',
                border: '1px solid transparent',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'var(--transition-fast)'
              }}
              onFocus={(e) => {
                e.target.style.background = '#FFF';
                e.target.style.borderColor = 'var(--accent-primary)';
              }}
              onBlur={(e) => {
                e.target.style.background = '#F1F5F9';
                e.target.style.borderColor = 'transparent';
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onOpenWizard}
              style={{
                background: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
                borderRadius: 'var(--radius-full)',
                padding: '7px 14px',
                minHeight: '44px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Compass size={15} /> Shoe Advisor
            </button>

            <button
              onClick={onOpenTop10}
              style={{
                background: '#FFF',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 14px',
                minHeight: '44px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Award size={15} color="#EAB308" /> Top Charts
            </button>

            <button
              onClick={onOpenCompare}
              style={{
                position: 'relative',
                background: compareCount > 0 ? 'var(--accent-primary)' : '#FFF',
                color: compareCount > 0 ? '#FFF' : 'var(--text-primary)',
                border: compareCount > 0 ? 'none' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 14px',
                minHeight: '44px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Scale size={15} />
              Compare
              {compareCount > 0 && (
                <span style={{
                  background: '#FFF',
                  color: 'var(--accent-primary)',
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
          gap: '6px',
          overflowX: 'auto'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginRight: '4px' }}>
            Brands:
          </span>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              style={{
                background: selectedBrand === brand ? 'var(--accent-primary)' : '#F1F5F9',
                color: selectedBrand === brand ? '#FFF' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '4px 14px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-fast)'
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
