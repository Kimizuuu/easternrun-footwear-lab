import React, { useState, useEffect } from 'react';
import type { Shoe } from '../types/shoe';
import { ShoeCardGSMArena } from './ShoeCardGSMArena';
import { LandingIntroSection } from './LandingIntroSection';
import { AdBanner } from './AdBanner';

interface SpecDatabaseViewProps {
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  comparedShoes: Shoe[];
  onToggleCompare: (shoe: Shoe) => void;
  selectedBrand: string;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
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
  selectedCategory = 'All',
  setSelectedCategory,
  searchQuery,
  onOpenWizard,
  onOpenCompare,
  onOpenTop10,
  onOpenGuide,
}) => {
  const [sortBy, setSortBy] = useState<'race' | 'speed' | 'daily' | 'walking' | 'overall' | 'weight' | 'resilience' | 'price'>('overall');

  useEffect(() => {
    if (selectedCategory === 'Marathon Super-Shoe') setSortBy('race');
    else if (selectedCategory === 'Tempo & Race') setSortBy('speed');
    else if (selectedCategory === 'Daily Trainer') setSortBy('daily');
    else if (selectedCategory === 'Max Cushion') setSortBy('walking');
    else setSortBy('overall');
  }, [selectedCategory]);

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
      <div id="database-catalog-section" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(14px, 3vw, 28px)', scrollMarginTop: '20px' }}>
        {/* Leaderboard Monetization Banner */}
        <AdBanner format="horizontal" label="Sponsored" />

        {/* Integrated 1-Selectable Option Control Bar */}
        <div 
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '12px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Integrated Unified Select Option */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              DATABASE VIEW & SORT:
            </span>

            <select
              value={
                selectedCategory === 'Marathon Super-Shoe' ? 'race' :
                selectedCategory === 'Tempo & Race' ? 'speed' :
                selectedCategory === 'Daily Trainer' ? 'daily' :
                selectedCategory === 'Max Cushion' ? 'walking' :
                sortBy
              }
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'race') {
                  setSelectedCategory('Marathon Super-Shoe');
                  setSortBy('race');
                } else if (val === 'speed') {
                  setSelectedCategory('Tempo & Race');
                  setSortBy('speed');
                } else if (val === 'daily') {
                  setSelectedCategory('Daily Trainer');
                  setSortBy('daily');
                } else if (val === 'walking') {
                  setSelectedCategory('Max Cushion');
                  setSortBy('walking');
                } else {
                  setSelectedCategory('All');
                  setSortBy(val as any);
                }
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#0F172A',
                outline: 'none',
                cursor: 'pointer',
                minHeight: '44px'
              }}
            >
              <option value="overall">All Shoes — Overall Rating</option>
              <option value="race">Marathon Super-Shoes — Race Day Score</option>
              <option value="speed">Tempo & Speed Workouts — Speed Score</option>
              <option value="daily">Daily Trainers — Daily Mileage Score</option>
              <option value="walking">Max Cushion — Walking & Cushion Score</option>
              <option value="weight">All Shoes — Lightest Weight First</option>
              <option value="price">All Shoes — Lowest Price First</option>
              <option value="resilience">All Shoes — Midsole Energy Return (%)</option>
            </select>
          </div>

          {/* Model Count Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', background: '#F1F5F9', padding: '6px 12px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              {sortedShoes.length} Models Displayed
            </span>
          </div>
        </div>

        {/* Grid of Shoe Cards (350px min-width = 3 per row on desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
          gap: '32px'
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
