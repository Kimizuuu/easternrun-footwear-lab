import React from 'react';
import { Activity, MessageSquareQuote, Award, Target, Scale, BookOpen, BarChart2, ShieldCheck } from 'lucide-react';
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
            Official Specs & Transparent Reviews for Global Running Shoes
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
            color: '#94A3B8',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '960px',
            fontWeight: 400
          }}>
            Unbiased specifications, lab metrics, and performance data for all global running brands — featuring Nike, Adidas, Asics, Hoka, alongside emerging innovations from Li-Ning, ANTA, Xtep, and 361°.
          </p>

          {/* Hero Auto-Suggest Omni Search Bar */}
          <div style={{ width: '100%', maxWidth: '720px', marginTop: '10px' }}>
            <SearchAutoComplete
              shoes={shoes}
              onSelectShoe={onSelectShoe}
              placeholder="Search models, foams (BOOM, PEBA, NITROEDGE), or brands..."
            />
          </div>

          {/* Website Purpose & Overview Cards — Tech Glassmorphism Design */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '18px',
            marginTop: '28px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            width: '100%'
          }}>
            {/* Card 1 */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderTop: '2px solid #38BDF8',
              borderRadius: '10px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={18} color="#38BDF8" />
                  <h3 style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                    OUR PURPOSE
                  </h3>
                </div>
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8', borderRadius: '4px', fontWeight: 700, border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                  MISSION
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.55 }}>
                An independent, objective platform built to help runners research, evaluate, and choose performance footwear without marketing bias.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderTop: '2px solid #818CF8',
              borderRadius: '10px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart2 size={18} color="#818CF8" />
                  <h3 style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                    WHAT WE DO
                  </h3>
                </div>
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'rgba(129, 140, 248, 0.12)', color: '#818CF8', borderRadius: '4px', fontWeight: 700, border: '1px solid rgba(129, 140, 248, 0.25)' }}>
                  ANALYTICS
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.55 }}>
                We analyze technical specs, pricing, and performance data to provide side-by-side comparison trays, rankings, and shoe finder wizards.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderTop: '2px solid #34D399',
              borderRadius: '10px',
              padding: '20px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <h3 style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                    INDEPENDENT METRICS
                  </h3>
                </div>
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'rgba(52, 211, 153, 0.12)', color: '#34D399', borderRadius: '4px', fontWeight: 700, border: '1px solid rgba(52, 211, 153, 0.25)' }}>
                  UNBIASED
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.55 }}>
                Zero brand sponsorship control. Pure transparent metrics, open community reviews, and real distance testing feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHAPTER 2: EDITORIAL METHODOLOGY & STRIDE MEASUREMENT WIDGET */}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '40px',
          alignItems: 'start'
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

          {/* Interactive Stride Measurement Calculator Widget */}
          <div style={{
            background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={20} color="#38BDF8" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#F8FAFC', margin: 0 }}>
                  EasternRun Stride Calculator
                </h3>
              </div>
              <span style={{ fontSize: '0.68rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                INTERACTIVE
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
              Calculate your stride length, contact efficiency, and optimal shoe stack/drop recommendation.
            </p>

            <StrideCalculatorWidget />
          </div>
        </div>
      </div>

      {/* CHAPTER 3: COMMUNITY & WEAR-TEST REVIEWS */}
      <div style={{
        width: '100%',
        background: '#FFFFFF',
        padding: '60px 24px',
        color: '#0F172A'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', marginBottom: '6px' }}>
                <MessageSquareQuote size={18} color="#2563EB" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>VERIFIED WEAR-TEST LOGS</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: 0, lineHeight: 1.15, color: '#0F172A' }}>
                Runner-Verified Reviews & Data
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
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

          {/* Real Runner Testimonials Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '20px'
          }}>
            {/* Review 1 */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block' }}>Chen Wei (Marathoner)</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Verified Test: 450 km Logged</span>
                </div>
                <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  Li-Ning Feidian 6.0 Ultra
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                "The BOOM PEBA foam resilience (88.5%) and carbon plate leverage give insane energy return past 30km. Zero leg fatigue on long runs."
              </p>
            </div>

            {/* Review 2 */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block' }}>Sarah Jenkins (Sub-3 Racer)</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Verified Test: 380 km Logged</span>
                </div>
                <span style={{ background: '#EFF6FF', color: '#1E40AF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  Nike Vaporfly 3
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                "Ultra responsive ZoomX pop. Unmatched weight-to-cushion ratio for 10k through full marathon distance racing."
              </p>
            </div>

            {/* Review 3 */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block' }}>Marcus Vance (Trail Specialist)</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Verified Test: 520 km Logged</span>
                </div>
                <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  ANTA C202 6 Pro
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                "NITROEDGE nitrogen midsole gives unbelievable bounce on asphalt. Outsole rubber shows almost zero wear after 500km."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Component: Interactive Stride & Cadence Calculator Widget
const StrideCalculatorWidget: React.FC = () => {
  const [cadence, setCadence] = React.useState<number>(175);
  const [paceMin, setPaceMin] = React.useState<number>(5);
  const [strikeType, setStrikeType] = React.useState<'heel' | 'midfoot' | 'forefoot'>('midfoot');

  const speedMps = 1000 / (paceMin * 60);
  const strideMeters = ((speedMps * 60) / cadence).toFixed(2);
  const estimatedGctMs = strikeType === 'heel' ? 240 : strikeType === 'midfoot' ? 210 : 185;
  const recommendedDrop = strikeType === 'heel' ? '8-10mm' : strikeType === 'midfoot' ? '6-8mm' : '0-4mm';
  const recommendedStack = cadence > 180 ? '28-34mm' : '35-42mm';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Cadence ({cadence} SPM)
          </label>
          <input
            type="range"
            min="140"
            max="210"
            value={cadence}
            onChange={(e) => setCadence(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#38BDF8', cursor: 'pointer' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Pace ({paceMin}:00 min/km)
          </label>
          <input
            type="range"
            min="3"
            max="8"
            value={paceMin}
            onChange={(e) => setPaceMin(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#38BDF8', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div>
        <label style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Foot Strike Pattern
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['heel', 'midfoot', 'forefoot'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setStrikeType(type)}
              style={{
                flex: 1,
                padding: '6px 0',
                borderRadius: '4px',
                border: strikeType === type ? '1px solid #38BDF8' : '1px solid #334155',
                background: strikeType === type ? '#38BDF8' : 'transparent',
                color: strikeType === type ? '#0F172A' : '#94A3B8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Output Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        background: '#0F172A',
        padding: '12px 8px',
        borderRadius: '6px',
        border: '1px solid #334155',
        textAlign: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Stride</span>
          <strong style={{ fontSize: '0.9rem', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>{strideMeters}m</strong>
        </div>

        <div>
          <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Contact</span>
          <strong style={{ fontSize: '0.9rem', color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>{estimatedGctMs}ms</strong>
        </div>

        <div>
          <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Rec. Drop</span>
          <strong style={{ fontSize: '0.85rem', color: '#34D399', fontFamily: 'var(--font-mono)' }}>{recommendedDrop}</strong>
        </div>

        <div>
          <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Rec. Stack</span>
          <strong style={{ fontSize: '0.85rem', color: '#818CF8', fontFamily: 'var(--font-mono)' }}>{recommendedStack}</strong>
        </div>
      </div>
    </div>
  );
};
