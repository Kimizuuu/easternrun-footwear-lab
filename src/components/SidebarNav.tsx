import React from 'react';
import type { Shoe } from '../types/shoe';
import { SearchAutoComplete } from './SearchAutoComplete';

interface SidebarNavProps {
  shoes: Shoe[];
  selectedShoeId: string | null;
  onSelectShoe: (shoe: Shoe) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenTop10: () => void;
  onOpenWizard: () => void;
  onOpenGuide?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedBrand?: string;
  setSelectedBrand?: (brand: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  shoes,
  onSelectShoe,
  selectedCategory,
  setSelectedCategory,
  compareCount,
  onOpenCompare,
  onOpenTop10,
  onOpenWizard,
  onOpenGuide,
  selectedBrand = 'All',
  setSelectedBrand,
}) => {
  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: '#FFFFFF',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '22px 18px',
      gap: '20px',
      zIndex: 90
    }}>
      {/* Site Header Logo */}
      <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.4px' }}>
          Eastern<span style={{ color: 'var(--accent-primary)' }}>Run</span>
        </h1>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Shoe Review & Lab Database
        </span>
      </div>

      {/* Auto-Suggest Omni Search Bar */}
      <div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
          Search Lab Database
        </span>
        <SearchAutoComplete
          shoes={shoes}
          onSelectShoe={onSelectShoe}
          placeholder="Search models..."
        />
      </div>

      {/* Brand Selection Tabs */}
      {setSelectedBrand && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
            Brands
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['All', 'Li-Ning', 'Anta', '361°'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                style={{
                  flex: '1 1 44%',
                  padding: '6px 0',
                  borderRadius: 'var(--radius-sm)',
                  border: selectedBrand === b ? '1px solid #0F172A' : '1px solid var(--border-subtle)',
                  background: selectedBrand === b ? '#0F172A' : '#FFFFFF',
                  color: selectedBrand === b ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: selectedBrand === b ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
          Menu
        </span>

        {onOpenGuide && (
          <button
            onClick={onOpenGuide}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: '#F8FAFC',
              color: '#0F172A',
              border: '1px solid #E2E8F0',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '2px'
            }}
          >
            Runner's Tech Guide
          </button>
        )}

        <button
          onClick={onOpenWizard}
          style={{
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            color: 'var(--text-primary)',
            border: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Sector Advisor
        </button>

        <button
          onClick={onOpenCompare}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            color: 'var(--text-primary)',
            border: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span>Compare Tray</span>
          {compareCount > 0 && (
            <span style={{
              background: '#111827',
              color: '#FFF',
              borderRadius: 'var(--radius-full)',
              padding: '2px 8px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {compareCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenTop10}
          style={{
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            color: 'var(--text-primary)',
            border: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Benchmark Rankings
        </button>
      </div>

      {/* Category Filter Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
          Categories
        </span>

        {['All', 'Marathon Super-Shoe', 'Daily Trainer', 'Tempo & Race', 'Max Cushion'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: selectedCategory === cat ? '#F3F4F6' : 'transparent',
              color: selectedCategory === cat ? '#111827' : 'var(--text-secondary)',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Models Quick List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: 'auto', overflowY: 'auto', maxHeight: '180px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
          Database Models ({shoes.length})
        </span>

        {shoes.map((shoe) => (
          <div
            key={shoe.id}
            onClick={() => onSelectShoe(shoe)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
              {shoe.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ${shoe.msrpUsd}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
