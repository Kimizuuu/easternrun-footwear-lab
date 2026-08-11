import React, { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  style?: React.CSSProperties;
  label?: string;
  totalModels?: number;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = '0000000000',
  format = 'auto',
  style,
  label = 'Advertisement',
  totalModels,
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // Ignore adblocker errors
    }
  }, []);

  if (slotId === '0000000000') {
    return (
      <div style={{
        width: '100%',
        margin: '16px 0 24px 0',
        padding: '14px 20px',
        background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '8px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        ...style
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#38BDF8',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            LAB DISCLOSURE
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
            EasternRun Footwear Lab — 100% Independent Specifications & Zero Brand Sponsorship Control
          </span>
        </div>
        <a
          href="#database-catalog-section"
          style={{
            fontSize: '0.78rem',
            color: '#38BDF8',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          View {totalModels ? `${totalModels} Tested Models` : 'Database'} ↓
        </a>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '16px 0',
      fontFamily: 'var(--font-main)',
      ...style
    }}>
      <span style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px', fontWeight: 600 }}>
        {label}
      </span>

      <div style={{
        width: '100%',
        maxWidth: format === 'horizontal' ? '970px' : format === 'rectangle' ? '336px' : '100%',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-4797992029063175"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
