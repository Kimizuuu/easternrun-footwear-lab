import React, { useState } from 'react';
import type { Shoe, Category } from '../types/shoe';
import { ShoeCardGSMArena } from './ShoeCardGSMArena';
import { LandingIntroSection } from './LandingIntroSection';
import { AdBanner } from './AdBanner';

interface SpecDatabaseViewProps {
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  comparedShoes: Shoe[];
  onToggleCompare: (shoe: Shoe) => void;
  selectedBrand: string;
  searchQuery: string;
  onOpenWizard: () => void;
  onOpenCompare: () => void;
  onOpenTop10: () => void;
  onOpenGuide: () => void;
}

export const SpecDatabaseView: React.FC<SpecDatabaseViewProps> = ({
  shoes,
  onSelectShoe,
  comparedShoes,
  onToggleCompare,
  selectedBrand = 'All',
  searchQuery,
  onOpenWizard,
  onOpenCompare,
  onOpenTop10,
  onOpenGuide,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'race' | 'speed' | 'daily' | 'walking' | 'overall' | 'weight' | 'resilience' | 'price'>('overall');

  const handleCategorySelect = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    if (cat === 'Marathon Super-Shoe') setSortBy('race');
    else if (cat === 'Tempo & Race') setSortBy('speed');
    else if (cat === 'Daily Trainer') setSortBy('daily');
    else if (cat === 'Max Cushion') setSortBy('walking');
  };

  // Filtering logic
  const filteredShoes = shoes.filter((shoe) => {
    // Brand Filter
    if (selectedBrand !== 'All' && shoe.brand !== selectedBrand) {
      return false;
    }

    // Category Filter
    if (selectedCategory !== 'All' && shoe.category !== selectedCategory) {
      return false;
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = shoe.name.toLowerCase().includes(q);
      const matchBrand = shoe.brand.toLowerCase().includes(q);
      const matchFoam = shoe.specs.foamName.toLowerCase().includes(q);
      const matchTagline = shoe.tagline.toLowerCase().includes(q);
      const matchCategory = shoe.category.toLowerCase().includes(q);

      if (!matchName && !matchBrand && !matchFoam && !matchTagline && !matchCategory) return false;
    }

    return true;
  });

  // Sort logic
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortBy === 'race') return b.useCaseValues.marathonRaceScore - a.useCaseValues.marathonRaceScore;
    if (sortBy === 'speed') return b.useCaseValues.speedWorkoutScore - a.useCaseValues.speedWorkoutScore;
    if (sortBy === 'daily') return b.useCaseValues.dailyRunScore - a.useCaseValues.dailyRunScore;
    if (sortBy === 'walking') return b.useCaseValues.walkingScore - a.useCaseValues.walkingScore;
    if (sortBy === 'overall') return b.overallRating - a.overallRating;
    if (sortBy === 'weight') return a.specs.weightGrams - b.specs.weightGrams;
    if (sortBy === 'resilience') return b.specs.foamResiliencePercent - a.specs.foamResiliencePercent;
    if (sortBy === 'price') return a.msrpUsd - b.msrpUsd;
    return 0;
  });

  const getShoeDisplayScore = (shoe: Shoe): { score: number; label: string } => {
    if (sortBy === 'race') return { score: shoe.useCaseValues.marathonRaceScore, label: 'Race' };
    if (sortBy === 'speed') return { score: shoe.useCaseValues.speedWorkoutScore, label: 'Speed' };
    if (sortBy === 'daily') return { score: shoe.useCaseValues.dailyRunScore, label: 'Daily' };
    if (sortBy === 'walking') return { score: shoe.useCaseValues.walkingScore, label: 'Cushion' };
    if (sortBy === 'overall') return { score: shoe.overallRating, label: 'Overall' };
    
    if (selectedCategory === 'Marathon Super-Shoe') return { score: shoe.useCaseValues.marathonRaceScore, label: 'Race' };
    if (selectedCategory === 'Tempo & Race') return { score: shoe.useCaseValues.speedWorkoutScore, label: 'Speed' };
    if (selectedCategory === 'Daily Trainer') return { score: shoe.useCaseValues.dailyRunScore, label: 'Daily' };
    if (selectedCategory === 'Max Cushion') return { score: shoe.useCaseValues.walkingScore, label: 'Cushion' };

    return { score: shoe.overallRating, label: 'Overall' };
  };

  const categories: (Category | 'All')[] = [
    'All',
    'Marathon Super-Shoe',
    'Tempo & Race',
    'Daily Trainer',
    'Max Cushion'
  ];

  return (
    <div style={{ width: '100%', padding: '0 0 40px 0' }}>
      {/* Full-Width Unconstrained Documentary Introduction Experience */}
      <LandingIntroSection
        shoes={shoes}
        onSelectShoe={onSelectShoe}
        onOpenWizard={onOpenWizard}
        onOpenCompare={onOpenCompare}
        onOpenTop10={onOpenTop10}
        onOpenGuide={onOpenGuide}
      />

      {/* Catalog Filter & Grid Container */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(14px, 3vw, 28px)' }}>
        {/* Leaderboard Monetization Banner */}
        <AdBanner format="horizontal" label="Sponsored" />

        {/* Clean Filter & Sort Bar */}
        <div 
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Category Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: selectedCategory === cat ? '1px solid #0F172A' : '1px solid #E2E8F0',
                  background: selectedCategory === cat ? '#0F172A' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#0F172A',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="overall">Overall Rating</option>
              <option value="race">Race Day Score</option>
              <option value="speed">Speed Workout Score</option>
              <option value="daily">Daily Training Score</option>
              <option value="walking">Max Cushion / Walking</option>
              <option value="weight">Lightest Weight</option>
              <option value="price">Lowest Price</option>
              <option value="resilience">Midsole Energy Return</option>
            </select>
          </div>
        </div>

        {/* Grid of Shoe Cards (280px min-width) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '28px'
        }}>
          {sortedShoes.map((shoe) => {
            const { score, label } = getShoeDisplayScore(shoe);
            return (
              <ShoeCardGSMArena
                key={shoe.id}
                shoe={shoe}
                onSelect={onSelectShoe}
                isCompared={comparedShoes.some((s) => s.id === shoe.id)}
                onToggleCompare={onToggleCompare}
                displayScore={score}
                displayScoreLabel={label}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
