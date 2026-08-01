import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface SiteFooterProps {
  onOpenWizard: () => void;
  onOpenCompare: () => void;
  onOpenTop10: () => void;
  onOpenGuide: () => void;
  onOpenLegal: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onOpenWizard,
  onOpenCompare,
  onOpenTop10,
  onOpenGuide,
  onOpenLegal,
}) => {
  return (
    <footer style={{
      width: '100%',
      background: '#0F172A',
      color: '#94A3B8',
      borderTop: '1px solid #1E293B',
      paddingTop: '60px',
      paddingBottom: '40px',
      fontFamily: 'var(--font-main)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 clamp(16px, 3vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px'
      }}>
        {/* Main 4-Column Footer Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          alignItems: 'flex-start'
        }}>
          {/* Column 1: Brand & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>
              Eastern<span style={{ color: '#3B82F6' }}>Run</span>
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Footwear Intelligence & Lab Database
            </span>
            <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              EasternRun bridges mechanical laboratory testing with authentic community wear-tester feedback across Li-Ning, ANTA, and 361° footwear models. Providing objective, data-driven benchmarks for runners worldwide.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                System Online • v2.4.0 Engine
              </span>
            </div>
          </div>

          {/* Column 2: Platform Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Interactive Tools
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <button
                  onClick={onOpenWizard}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '8px 0', fontSize: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ChevronRight size={14} color="#3B82F6" />
                  <span>Sector Advisor (Shoe Finder)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCompare}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '8px 0', fontSize: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ChevronRight size={14} color="#3B82F6" />
                  <span>Head-to-Head Compare Tray</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTop10}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '8px 0', fontSize: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ChevronRight size={14} color="#3B82F6" />
                  <span>Benchmark Rankings (Top 10)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '8px 0', fontSize: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ChevronRight size={14} color="#3B82F6" />
                  <span>Runner's Tech Guide (18 Topics)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Technical Knowledge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Footwear Science & Metrics
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>Supercritical PEBA Energy Return (80–89%)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>3D Spoon & Winged Carbon Plate Rigidity</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>Shore C Foam Durometer Hardness Labs</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>Outsole Rubber Wet-Asphalt Friction Scores</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span>Wide Last Sizing Matrix (265mm = US 9)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Proprietary & Legal Rights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Rights & Attribution
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
              All rating algorithms, database schemas, and lab comparison methodologies are protected under copyright. Product imagery and brand trademarks belong to Li-Ning Co., Ltd., ANTA Sports Products Ltd., and 361 Degrees International Limited, hosted under Fair Use (17 U.S.C. § 107) for non-commercial review.
            </p>
            <button
              onClick={onOpenLegal}
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              <ShieldCheck size={16} color="#3B82F6" />
              <span>Legal Policy & Fair Use</span>
            </button>
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div style={{
          borderTop: '1px solid #1E293B',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.78rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 EasternRun Footwear Intelligence System. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Independent Lab Analysis</span>
            <span>r/RunningShoeGeeks Consensus</span>
            <span>Fair Use Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
