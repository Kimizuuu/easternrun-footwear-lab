import React, { useState } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileSelectShoe = (shoe: Shoe) => {
    onSelectShoe(shoe);
    setIsMobileMenuOpen(false);
  };

  const scrollToCatalog = () => {
    setTimeout(() => {
      const catalogElem = document.getElementById('database-catalog-section');
      if (catalogElem) {
        catalogElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
    scrollToCatalog();
  };

  const handleBrandClick = (b: string) => {
    if (setSelectedBrand) {
      setSelectedBrand(b);
    }
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
    scrollToCatalog();
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
            minHeight: '44px',
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

      {/* Brand Selection Dropdown */}
      {setSelectedBrand && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Filter by Brand
          </span>
          <select
            aria-label="Filter database by brand"
            value={selectedBrand}
            onChange={(e) => handleBrandClick(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              minHeight: '44px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              color: '#0F172A',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {['All', 'Li-Ning', 'ANTA', 'Xtep', '361°', 'Qiaodan', 'Nike', 'Adidas', 'Saucony', 'ASICS', 'Mizuno', 'New Balance', 'HOKA', 'Brooks', 'Skechers', 'Salomon', 'On Running', 'Altra', 'La Sportiva'].map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Brands (105 Models)' : b}
              </option>
            ))}
          </select>
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
              minHeight: '44px',
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
            minHeight: '44px',
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
            minHeight: '44px',
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
            minHeight: '44px',
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

      {/* Category Filter Buttons (1-by-1 List) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
          CATEGORIES
        </span>

        {['All', 'Marathon Super-Shoe', 'Daily Trainer', 'Tempo & Race', 'Max Cushion', 'Mountain & Trail'].map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                minHeight: '44px',
                borderRadius: '6px',
                background: isActive ? '#0F172A' : '#F8FAFC',
                color: isActive ? '#FFFFFF' : '#334155',
                border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Shoe Directory Dropdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Quick Shoe Directory ({shoes.length})
        </span>
        <select
          aria-label="Jump directly to shoe model"
          defaultValue=""
          onChange={(e) => {
            const targetShoe = shoes.find(s => s.id === e.target.value);
            if (targetShoe) {
              handleMobileSelectShoe(targetShoe);
            }
          }}
          style={{
            width: '100%',
            padding: '10px 12px',
            minHeight: '44px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            background: '#F8FAFC',
            color: '#334155',
            fontSize: '0.82rem',
            fontWeight: 600,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="" disabled>Select shoe model...</option>
          {shoes.map((shoe) => (
            <option key={shoe.id} value={shoe.id}>
              {shoe.name} • ${shoe.msrpUsd}
            </option>
          ))}
        </select>
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
              minHeight: '44px',
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
            minHeight: '44px',
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
        minWidth: 'min(80vw, 260px)',
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
