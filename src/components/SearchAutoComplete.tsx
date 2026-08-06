import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import type { Shoe } from '../types/shoe';

interface SearchAutoCompleteProps {
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({
  shoes,
  onSelectShoe,
  placeholder = "Search 105 models, foams (ZoomX, BOOM, PEBA), or brands...",
  autoFocus = false,
  style,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter matching shoes
  const suggestions = query.trim() === '' ? [] : shoes.filter((shoe) => {
    const q = query.toLowerCase();
    const matchName = shoe.name.toLowerCase().includes(q);
    const matchBrand = shoe.brand.toLowerCase().includes(q);
    const matchFoam = shoe.specs.foamName.toLowerCase().includes(q);
    const matchCategory = shoe.category.toLowerCase().includes(q);
    const matchTagline = shoe.tagline.toLowerCase().includes(q);
    return matchName || matchBrand || matchFoam || matchCategory || matchTagline;
  }).slice(0, 7); // Show top 7 matches

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selectedIndex on query change
  useEffect(() => {
    setSelectedIndex(-1);
    if (query.trim().length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleChoose(suggestions[selectedIndex]);
      } else if (suggestions.length > 0) {
        handleChoose(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleChoose = (shoe: Shoe) => {
    onSelectShoe(shoe);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        fontFamily: 'var(--font-main)',
        ...style
      }}
    >
      {/* Search Input Box */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
        border: isOpen ? '2px solid #0F172A' : '1px solid #CBD5E1',
        borderRadius: '8px',
        padding: '2px 14px',
        boxShadow: isOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.15s ease'
      }}>
        <Search size={18} color="#64748B" style={{ flexShrink: 0, marginRight: '10px' }} />

        <input
          ref={inputRef}
          type="text"
          aria-label="Search shoes by name, brand, or category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={{
            width: '100%',
            height: '42px',
            border: 'none',
            outline: 'none',
            fontSize: '0.92rem',
            color: '#0F172A',
            background: 'transparent',
            fontWeight: 500
          }}
        />

        {query.length > 0 && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Auto-Suggestion Dropdown Popup */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
          overflow: 'hidden',
          zIndex: 999,
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {suggestions.length > 0 ? (
            <div style={{ padding: '6px 0' }}>
              <div style={{
                padding: '8px 16px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#64748B',
                textTransform: 'uppercase',
                borderBottom: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Matching Footwear Models ({suggestions.length})</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 500, color: '#94A3B8' }}>Use ↑ ↓ + Enter to select</span>
              </div>

              {suggestions.map((shoe, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={shoe.id}
                    onClick={() => handleChoose(shoe)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '10px 16px',
                      background: isSelected ? '#F8FAFC' : '#FFFFFF',
                      borderLeft: isSelected ? '3px solid #0F172A' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s ease'
                    }}
                  >
                    {/* Small Thumbnail */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: '#F1F5F9',
                      flexShrink: 0,
                      border: '1px solid #E2E8F0'
                    }}>
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Shoe Details */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{
                          fontSize: '0.9rem',
                          color: '#0F172A',
                          fontWeight: 800,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {shoe.name}
                        </strong>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#0F172A'
                        }}>
                          ${shoe.msrpUsd}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748B' }}>
                        <span style={{ fontWeight: 600 }}>{shoe.brand}</span>
                        <span>•</span>
                        <span>{shoe.category}</span>
                        <span>•</span>
                        <span style={{ color: '#2563EB', fontWeight: 600 }}>{shoe.specs.foamName}</span>
                      </div>
                    </div>

                    {/* Rating Badge & Arrow */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        background: '#0F172A',
                        color: '#FFFFFF',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}>
                        <Star size={10} fill="#EAB308" color="#EAB308" />
                        <span>{shoe.overallRating}</span>
                      </div>

                      <ArrowRight size={14} color={isSelected ? '#0F172A' : '#94A3B8'} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
              No footwear models found matching "<strong>{query}</strong>". Try searching for <em>Feidian</em>, <em>C202</em>, <em>Flame</em>, or <em>BOOM</em>.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
