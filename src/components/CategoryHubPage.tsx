import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Shoe } from '../types/shoe';
import { ShoeCardGSMArena } from './ShoeCardGSMArena';
import { SEOHead } from './SEOHead';
import { Trophy, ArrowLeft } from 'lucide-react';

interface CategoryHubPageProps {
  shoes: Shoe[];
  comparedShoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  onToggleCompare: (shoe: Shoe) => void;
}

const CATEGORY_HUB_INFO: Record<string, { title: string; subtitle: string; description: string; filterFn: (s: Shoe) => boolean; sortFn: (a: Shoe, b: Shoe) => number }> = {
  'marathon-super-shoes': {
    title: 'Best Marathon Super-Shoes (2026)',
    subtitle: 'Elite Race Day Carbon Plated Racers',
    description: 'Top-ranked marathon super-shoes evaluated by race day score, energy return percentage, carbon plate rigidity, and stack height compliance.',
    filterFn: (s) => s.category === 'Marathon Super-Shoe',
    sortFn: (a, b) => b.useCaseValues.marathonRaceScore - a.useCaseValues.marathonRaceScore
  },
  'budget-running-shoes': {
    title: 'Best Budget Running Shoes Under $100',
    subtitle: 'High Performance, Sub-$100 Footwear',
    description: 'Top value-for-money running shoes priced at or under $100 featuring supercritical foams and durable rubber outsoles without premium markup.',
    filterFn: (s) => s.msrpUsd <= 100,
    sortFn: (a, b) => b.overallRating - a.overallRating
  },
  'daily-trainers': {
    title: 'Best Daily Trainers & Workhorses',
    subtitle: 'Versatile High-Mileage Daily Run Shoes',
    description: 'Durable, comfortable daily running shoes engineered for high weekly mileage, easy recovery runs, and long-term outsole longevity.',
    filterFn: (s) => s.category === 'Daily Trainer',
    sortFn: (a, b) => b.useCaseValues.dailyRunScore - a.useCaseValues.dailyRunScore
  },
  'max-cushion': {
    title: 'Best Max Cushion & Recovery Shoes',
    subtitle: 'Plush Impact Protection & Easy Walking',
    description: 'Maximum stack height shoes engineered with soft foam compounds for joint impact absorption, standing comfort, and recovery miles.',
    filterFn: (s) => s.category === 'Max Cushion',
    sortFn: (a, b) => b.useCaseValues.walkingScore - a.useCaseValues.walkingScore
  }
};

export const CategoryHubPage: React.FC<CategoryHubPageProps> = ({
  shoes,
  comparedShoes,
  onSelectShoe,
  onToggleCompare,
}) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const normalizedSlug = (categorySlug || '').toLowerCase();

  const info = CATEGORY_HUB_INFO[normalizedSlug] || {
    title: 'Best Performance Running Shoes',
    subtitle: 'Top Rated Models',
    description: 'Explore curated rankings and lab spec evaluations across performance running footwear.',
    filterFn: () => true,
    sortFn: (a, b) => b.overallRating - a.overallRating
  };

  const categoryShoes = shoes.filter(info.filterFn).sort(info.sortFn);
  const canonicalUrl = `https://easternrun.fit/best/${normalizedSlug}`;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px clamp(14px, 3vw, 28px)', fontFamily: 'var(--font-main)' }}>
      <SEOHead
        title={`${info.title} | EasternRun`}
        description={info.description}
        canonicalUrl={canonicalUrl}
      />

      {/* Back Link */}
      <Link 
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#64748B',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={16} /> Back to Spec Database
      </Link>

      {/* Category Hero Header */}
      <div style={{
        background: '#0F172A',
        color: '#F8FAFC',
        borderRadius: '12px',
        padding: 'clamp(24px, 4vw, 40px)',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '4px', marginBottom: '14px' }}>
          <Trophy size={14} color="#EAB308" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EAB308', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            LAB TESTED RANKINGS & GUIDES
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          {info.title}
        </h1>

        <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '900px', margin: 0 }}>
          {info.description}
        </p>
      </div>

      {/* Shoe Cards Grid */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
        Top {categoryShoes.length} Matched Models
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
        gap: '32px'
      }}>
        {categoryShoes.map(shoe => (
          <ShoeCardGSMArena
            key={shoe.id}
            shoe={shoe}
            onSelect={onSelectShoe}
            isCompared={comparedShoes.some(s => s.id === shoe.id)}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </div>
  );
};
