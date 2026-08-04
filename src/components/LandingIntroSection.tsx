import React from 'react';
import { Activity, MessageSquareQuote, Award, Target, Scale, BookOpen } from 'lucide-react';
import type { Shoe } from '../types/shoe';
import { SearchAutoComplete } from './SearchAutoComplete';

interface LandingIntroSectionProps {
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  onOpenWizard: () => void;
  onOpenCompare: () => void;
  onOpenTop10: () => void;
  onOpenGuide: () => void;
}

export const LandingIntroSection: React.FC<LandingIntroSectionProps> = ({
  shoes,
  onSelectShoe,
  onOpenWizard,
  onOpenCompare,
  onOpenTop10,
  onOpenGuide,
}) => {
  return (
    <section style={{
      width: '100%',
      marginBottom: '40px',
      fontFamily: 'var(--font-main)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0'
    }}>
      {/* CHAPTER 1: HERO DOCUMENTARY BANNER */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A',
        color: '#FFFFFF',
        overflow: 'hidden',
        padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 24px)'
      }}>
        {/* Background Sunset Photography with Overlay Gradient */}
        <img
          src="/images/landing/landing_runner_sunset.jpg"
          alt="EasternRun Footwear Lab"
          loading="lazy"
          decoding="async"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.25,
            filter: 'brightness(0.8) contrast(1.1)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.98) 100%), linear-gradient(to bottom, transparent 60%, #0F172A 100%)'
        }} />

        {/* Documentary Main Header Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 12px', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8' }}>
              DATABASE & REVIEWS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.02em',
            color: '#F8FAFC',
            maxWidth: '1100px'
          }}>
            Official Specs & Runner Reviews for Chinese Running Shoes
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
            color: '#94A3B8',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '960px',
            fontWeight: 400
          }}>
            Unbiased specifications and performance data for Li-Ning, ANTA, Xtep, 361°, and Qiaodan footwear alongside Western benchmark references.
          </p>

          {/* Hero Auto-Suggest Omni Search Bar */}
          <div style={{ width: '100%', maxWidth: '720px', marginTop: '10px' }}>
            <SearchAutoComplete
              shoes={shoes}
              onSelectShoe={onSelectShoe}
              placeholder="Search models, foams (BOOM, PEBA, NITROEDGE), or brands..."
            />
          </div>

          {/* Website Purpose & Overview Cards — Clean Monochrome */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '18px',
              backdropFilter: 'blur(8px)'
            }}>
              <h3 style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                OUR PURPOSE
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                An independent, objective platform built to help runners research, evaluate, and choose performance footwear without marketing bias.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '18px',
              backdropFilter: 'blur(8px)'
            }}>
              <h3 style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                WHAT WE DO
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                We analyze technical specs, pricing, and performance data to provide side-by-side comparison trays, rankings, and shoe finder wizards.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '18px',
              backdropFilter: 'blur(8px)'
            }}>
              <h3 style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                INDEPENDENT METRICS
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Zero brand sponsorship control. Pure transparent metrics, open community reviews, and real distance testing feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 2: EDITORIAL METHODOLOGY */}
      <div style={{
        width: '100%',
        background: '#0F172A',
        color: '#F8FAFC',
        padding: '60px 24px',
        borderTop: '1px solid #1E293B',
        borderBottom: '1px solid #1E293B'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Narrative Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
              <Activity size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>LAB METHODOLOGY</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: 0, lineHeight: 1.15, color: '#F8FAFC' }}>
              Manufacturer Specs & Performance Data
            </h2>

            <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
              We compile official specifications, laboratory disclosures, and runner testing metrics into a standardized database for fair comparisons.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <button
                onClick={onOpenGuide}
                style={{
                  background: '#F8FAFC',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <BookOpen size={16} /> Read Guide
              </button>

              <button
                onClick={onOpenWizard}
                style={{
                  background: 'transparent',
                  color: '#F8FAFC',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Target size={16} /> Find Your Shoe
              </button>
            </div>
          </div>

          {/* Photo Panel (Shoe Stride) */}
          <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '320px', border: '1px solid #1E293B' }}>
            <img
              src="/images/landing/landing_shoe_stride.jpg"
              alt="EasternRun Stride Measurement"
              loading="lazy"
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              inset: 'auto 0 0 0',
              padding: '16px',
              background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)',
              color: '#FFFFFF'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em' }}>SPECIFICATION DATABASE</span>
              <h4 style={{ margin: '2px 0 0 0', fontSize: '0.9rem', fontWeight: 700 }}>Official foam specs, plate stiffness, and rubber grip data</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 3: COMMUNITY & WEAR-TEST DATA */}
      <div style={{
        width: '100%',
        background: '#FFFFFF',
        padding: '60px 24px',
        color: '#0F172A'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Photo Panel (Track Start Stance) */}
          <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '320px', border: '1px solid #E2E8F0' }}>
            <img
              src="/images/landing/landing_track_start.jpg"
              alt="Road & Track Testing"
              loading="lazy"
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              inset: 'auto 0 0 0',
              padding: '16px',
              background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)',
              color: '#FFFFFF'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#CBD5E1', letterSpacing: '0.05em' }}>REAL REVIEWS</span>
              <h4 style={{ margin: '2px 0 0 0', fontSize: '0.9rem', fontWeight: 700 }}>Road-tested by marathon and track runners</h4>
            </div>
          </div>

          {/* Narrative Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
              <MessageSquareQuote size={18} color="#2563EB" />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>COMMUNITY EVALUATIONS</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: 0, lineHeight: 1.15, color: '#0F172A' }}>
              Runner-Verified Reviews & Data
            </h2>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              Every shoe model combines manufacturer technical specifications with verified community feedback for an objective evaluation.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <button
                onClick={onOpenCompare}
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Scale size={16} /> Compare Shoes
              </button>

              <button
                onClick={onOpenTop10}
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Award size={16} /> Top 10
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
