import React from 'react';
import { Activity, MessageSquareQuote, Award, Target, Scale, BookOpen, ChevronDown } from 'lucide-react';
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
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A',
        color: '#FFFFFF',
        overflow: 'hidden',
        padding: '60px 32px'
      }}>
        {/* Background Sunset Photography with Overlay Gradient */}
        <img
          src="/images/landing/landing_runner_sunset.jpg"
          alt="EasternRun Marathon Performance Lab"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.38,
            filter: 'brightness(0.85) contrast(1.1)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%), linear-gradient(to bottom, transparent 60%, #0F172A 100%)'
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', backdropFilter: 'blur(6px)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F8FAFC' }}>
              FOOTWEAR PERFORMANCE INTELLIGENCE
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            margin: 0,
            letterSpacing: '-0.03em',
            color: '#F8FAFC',
            maxWidth: '1100px'
          }}>
            Performance Footwear Intelligence: Independent Lab Science Meets Real-World Road Truth
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            color: '#CBD5E1',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '960px',
            fontWeight: 300
          }}>
            Welcome to <strong>EasternRun</strong>. We exist to strip away footwear marketing hype. By pairing mechanical lab testing with synthesized community wear-tester feedback across Li-Ning, ANTA, and 361°, we deliver unbiased data-driven benchmarks for marathon super-shoes and daily workhorses.
          </p>

          {/* Hero Auto-Suggest Omni Search Bar */}
          <div style={{ width: '100%', maxWidth: '720px', marginTop: '10px' }}>
            <SearchAutoComplete
              shoes={shoes}
              onSelectShoe={onSelectShoe}
              placeholder="Search 33 models, foams (BOOM, PEBA, NITROEDGE), or brands..."
            />
          </div>

          {/* Clean Metric Counters Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            marginTop: '16px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            width: '100%'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', letterSpacing: '0.05em' }}>LAB DATABASE</span>
              <strong style={{ fontSize: '2rem', color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>33 Models</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', letterSpacing: '0.05em' }}>PEBA REBOUND</span>
              <strong style={{ fontSize: '2rem', color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>89% Max Return</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', letterSpacing: '0.05em' }}>PURPOSE RATING</span>
              <strong style={{ fontSize: '2rem', color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>0–100 Scale</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', letterSpacing: '0.05em' }}>INDEPENDENCE</span>
              <strong style={{ fontSize: '2rem', color: '#F8FAFC', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>100% Unbiased</strong>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 2: FULL-WIDTH DARK EDITORIAL STRIP — LAB METRICS & SHOE STRIDE */}
      <div style={{
        width: '100%',
        background: '#0F172A',
        borderTop: '1px solid #1E293B',
        borderBottom: '1px solid #1E293B',
        padding: '70px 32px',
        color: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Narrative Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
              <Activity size={20} />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>CHAPTER II • MECHANICAL LAB BENCHMARKS</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 900, lineHeight: 1.2, margin: 0, color: '#F8FAFC' }}>
              Measuring What Matters: Energy Return, Stack Heights & Durometers
            </h2>

            <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              Marketing departments love throwing around buzzwords like "Supercritical Nitrogen" and "Propulsive Launch Pads". At EasternRun, we measure the physical reality. We cut through specs to record exact heel and forefoot stack heights, calculate Shore C durometer foam softness, test wet-asphalt rubber friction grip, and measure mechanical hysteresis rebound (PEBA foams delivering up to 89% energy return).
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginTop: '10px',
              padding: '20px',
              background: '#1E293B',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#F8FAFC', display: 'block', marginBottom: '4px' }}>Supercritical PEBA Labs</strong>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4, display: 'block' }}>Precise rebound metrics for BOOM, NITROEDGE, and Qu!kFLAME foams.</span>
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#F8FAFC', display: 'block', marginBottom: '4px' }}>Carbon Plate Rigidity</strong>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4, display: 'block' }}>Rigidity indices (1-10) for 3D Spoon plates, Winged shanks, and Glass-fiber.</span>
              </div>
            </div>
          </div>

          {/* Full Photo 2 (Shoe Stride) */}
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
            <img
              src="/images/landing/landing_shoe_stride.jpg"
              alt="EasternRun Lab Shoe Stride Measurement"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              inset: 'auto 0 0 0',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)',
              color: '#FFFFFF'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em' }}>LAB TEST READOUT</span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '1rem', fontWeight: 700 }}>Outsole Rubber Friction & Forefoot Toe-Off Compression Analysis</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 3: FULL-WIDTH LIGHT EDITORIAL STRIP — WEAR-TESTER TRUTHS & TRACK START */}
      <div style={{
        width: '100%',
        background: '#FFFFFF',
        padding: '70px 32px',
        color: '#0F172A'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Full Photo 3 (Track Start Stance) */}
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <img
              src="/images/landing/landing_track_start.jpg"
              alt="Track & Marathon Road Wear Testing"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              inset: 'auto 0 0 0',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)',
              color: '#FFFFFF'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#CBD5E1', letterSpacing: '0.05em' }}>COMMUNITY WEAR-TESTS</span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '1rem', fontWeight: 700 }}>Real-World Marathon Race Day & Track Interval Validation</h4>
            </div>
          </div>

          {/* Narrative Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
              <MessageSquareQuote size={20} />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>CHAPTER III • COMMUNITY WEAR-TESTER TRUTHS</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 900, lineHeight: 1.2, margin: 0, color: '#0F172A' }}>
              Authentic Runner Consensus & Realistic Ratings
            </h2>

            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              A lab test is only half the story. The true test happens over hundreds of kilometers on road asphalt, track rubber, and wet concrete. We aggregate community feedback from r/RunningShoeGeeks alongside verified wear-testers to provide realistic 0–100 ratings based strictly on intended purpose—whether you're hunting a 42K marathon PR, crushing 400m track reps, or cruising recovery miles.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginTop: '10px',
              padding: '20px',
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Honest Pros & Cons</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, display: 'block' }}>Unfiltered callouts on tongue slip, heel lockdown, and durability.</span>
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0F172A', display: 'block', marginBottom: '4px' }}>Sizing & Width Matrix</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, display: 'block' }}>Accurate wide-friendly guidance across Li-Ning, ANTA, and 361°.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 4: EXPANSIVE FULL-BLEED ACTION BANNER */}
      <div style={{
        width: '100%',
        background: '#0F172A',
        color: '#FFFFFF',
        padding: '48px 32px',
        borderTop: '1px solid #1E293B',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '1280px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.08em' }}>INTERACTIVE LAB TOOLS</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 0 0', color: '#F8FAFC' }}>
              Explore the EasternRun Footwear Intelligence System
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={onOpenWizard}
              style={{
                padding: '10px 18px',
                borderRadius: '6px',
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1px solid #475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Target size={16} />
              <span>Sector Advisor</span>
            </button>

            <button
              onClick={onOpenCompare}
              style={{
                padding: '10px 18px',
                borderRadius: '6px',
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1px solid #475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Scale size={16} />
              <span>Compare Tray</span>
            </button>

            <button
              onClick={onOpenTop10}
              style={{
                padding: '10px 18px',
                borderRadius: '6px',
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1px solid #475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Award size={16} />
              <span>Benchmark Rankings</span>
            </button>

            <button
              onClick={onOpenGuide}
              style={{
                padding: '10px 18px',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <BookOpen size={16} />
              <span>Runner's Tech Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEAMLESS TRANSITION HEADER TO FULL CATALOG DATABASE BELOW */}
      <div style={{
        width: '100%',
        padding: '36px 32px 12px 32px',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            FULL DATABASE CATALOG
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '4px 0 0 0' }}>
            Browse All 33 Footwear Models
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
          <span>Filter & Sort Below</span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
};
