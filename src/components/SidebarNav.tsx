import React, { useState } from 'react';
import { Menu, X, Scale } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileSelectShoe = (shoe: Shoe) => {
    onSelectShoe(shoe);
    setIsMobileMenuOpen(false);
  };

  const navContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      {/* Site Header Logo */}
      <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.4px' }}>
            Eastern<span style={{ color: 'var(--accent-primary)' }}>Run</span>
          </h1>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Shoe Review & Spec Database
          </span>
        </div>

        {/* Close Button on Mobile Drawer */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="mobile-close-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#0F172A',
            padding: '10px',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Auto-Suggest Omni Search Bar */}
      <div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
          Search Database
        </span>
        <SearchAutoComplete
          shoes={shoes}
          onSelectShoe={handleMobileSelectShoe}
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
            {['All', 'Li-Ning', 'Anta', 'Xtep', '361°', 'Qiaodan', 'Nike', 'Adidas', 'Saucony', 'ASICS'].map((b) => (
              <button
                key={b}
                onClick={() => {
                  setSelectedBrand(b);
                  setIsMobileMenuOpen(false);
                }}
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
            onClick={() => {
              onOpenGuide();
              setIsMobileMenuOpen(false);
            }}
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
          onClick={() => {
            onOpenWizard();
            setIsMobileMenuOpen(false);
          }}
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
        >
          Sector Advisor
        </button>

        <button
          onClick={() => {
            onOpenCompare();
            setIsMobileMenuOpen(false);
          }}
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
          onClick={() => {
            onOpenTop10();
            setIsMobileMenuOpen(false);
          }}
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
            onClick={() => {
              setSelectedCategory(cat);
              setIsMobileMenuOpen(false);
            }}
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
            onClick={() => handleMobileSelectShoe(shoe)}
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
    </div>
  );

  return (
    <>
      {/* Super-Optimized Mobile Sticky Top Header Bar (< 768px) */}
      <header className="mobile-header-bar" style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 16px',
        display: 'none', // Managed by responsive CSS
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0F172A',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Menu size={24} />
          </button>

          <h1 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.4px' }}>
            Eastern<span style={{ color: '#2563EB' }}>Run</span>
          </h1>
        </div>

        <button
          onClick={onOpenCompare}
          style={{
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '6px 10px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <Scale size={14} />
          <span>Compare ({compareCount})</span>
        </button>
      </header>

      {/* Touch-Optimized Mobile Slide-Over Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)', // Fast solid backdrop without blur lag
            zIndex: 999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '320px',
              background: '#FFFFFF',
              padding: '20px 16px',
              boxShadow: '10px 0 25px rgba(0,0,0,0.25)',
              overflowY: 'auto',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Sticky Left Sidebar (>= 768px) */}
      <aside className="desktop-sidebar" style={{
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
        zIndex: 90
      }}>
        {navContent}
      </aside>
    </>
  );
};
