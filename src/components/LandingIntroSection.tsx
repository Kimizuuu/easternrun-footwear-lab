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
      {/* CHAPTER 1: FULL-BLEED CINEMATIC HERO DOCUMENTARY BANNER */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A',
        color: '#FFFFFF',
        overflow: 'hidden',
        padding: '48px 24px'
      }}>
        {/* Background Sunset Photography with Overlay Gradient */}
        <img
          src="/images/landing/landing_runner_sunset.jpg"
          alt="EasternRun Marathon Performance Lab"
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.35,
            filter: 'brightness(0.85) contrast(1.1)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.96) 100%), linear-gradient(to bottom, transparent 60%, #0F172A 100%)'
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '4px 12px', borderRadius: '20px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F8FAFC' }}>
              SHOE DATABASE
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.02em',
            color: '#F8FAFC',
            maxWidth: '1100px'
          }}>
            Independent Lab Reviews for Chinese Running Shoes
          </h1>

          <p style={{
            fontSize: 'clamp(0.98rem, 1.5vw, 1.25rem)',
            color: '#CBD5E1',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '960px',
            fontWeight: 300
          }}>
            Unbiased lab testing and real runner reviews for Li-Ning, ANTA, Xtep, and 361° running shoes. Compare specs, energy return, and race performance.
          </p>

          {/* Hero Auto-Suggest Omni Search Bar */}
          <div style={{ width: '100%', maxWidth: '720px', marginTop: '10px' }}>
            <SearchAutoComplete
              shoes={shoes}
              onSelectShoe={onSelectShoe}
              placeholder="Search 33 models, foams (BOOM, PEBA, NITROEDGE), or brands..."
            />
          </div>

          {/* Website Purpose & Overview Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            width: '100%'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '16px',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.2rem', color: '#F8FAFC', fontWeight: 900, letterSpacing: '-0.2px' }}>OUR PURPOSE</span>
                <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA', borderRadius: '4px', fontWeight: 700 }}>MISSION</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
                An independent, objective platform built to help runners research, evaluate, and choose performance footwear without marketing bias.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '16px',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.2rem', color: '#60A5FA', fontWeight: 900, letterSpacing: '-0.2px' }}>WHAT WE DO</span>
                <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', borderRadius: '4px', fontWeight: 700 }}>TOOLS</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
                We analyze technical specs, pricing, and performance data to provide side-by-side comparison trays, rankings, and shoe finder wizards.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '16px',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.2rem', color: '#F8FAFC', fontWeight: 900, letterSpacing: '-0.2px' }}>INDEPENDENT</span>
                <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(245, 158, 11, 0.2)', color: '#FBBF24', borderRadius: '4px', fontWeight: 700 }}>UNBIASED</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
                Zero brand sponsorship control. Pure transparent metrics, open community reviews, and real distance testing feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 2: FULL-WIDTH DARK ETERNAL EDITORIAL STRIP — LAB METHODOLOGY & STRIDE */}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Narrative Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA' }}>
              <Activity size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>HOW IT WORKS</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: 0, lineHeight: 1.15, color: '#F8FAFC' }}>
              Lab-Tested Foam & Plate Technology
            </h2>

            <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.65, margin: 0 }}>
              We test midsole energy return, carbon plate stiffness, and outsole grip in controlled lab conditions. Every shoe gets the same rigorous benchmarks so you can compare fairly.
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
                  border: '1px solid #475569',
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
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '340px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
            <img
              src="/images/landing/landing_shoe_stride.jpg"
              alt="EasternRun Lab Shoe Stride Measurement"
              loading="lazy"
              decoding="async"
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
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em' }}>LAB TESTING</span>
              <h4 style={{ margin: '2px 0 0 0', fontSize: '0.95rem', fontWeight: 700 }}>Foam rebound and outsole grip testing</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 3: FULL-WIDTH LIGHT EDITORIAL STRIP — WEAR-TESTER TRUTHS & TRACK START */}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Photo Panel (Track Start Stance) */}
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '340px', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}>
            <img
              src="/images/landing/landing_track_start.jpg"
              alt="Track & Marathon Road Wear Testing"
              loading="lazy"
              decoding="async"
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
              <h4 style={{ margin: '2px 0 0 0', fontSize: '0.95rem', fontWeight: 700 }}>Road-tested by marathon and track runners</h4>
            </div>
          </div>

          {/* Narrative Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
              <MessageSquareQuote size={20} color="#2563EB" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>COMMUNITY DATA</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: 0, lineHeight: 1.15, color: '#0F172A' }}>
              Runner-Verified Reviews & Data
            </h2>

            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              Every shoe is reviewed by real runners logging serious distance. We combine lab data with on-road feedback for the full picture.
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
