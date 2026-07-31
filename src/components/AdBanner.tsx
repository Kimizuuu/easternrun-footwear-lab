import React, { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  style?: React.CSSProperties;
  label?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = '0000000000',
  format = 'auto',
  style,
  label = 'Advertisement',
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // Ignore adblocker errors
    }
  }, []);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '24px 0',
      fontFamily: 'var(--font-main)',
      ...style
    }}>
      <span style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', fontWeight: 600 }}>
        {label}
      </span>

      {/* Google AdSense Unit Container with Clean Fallback Box */}
      <div style={{
        width: '100%',
        maxWidth: format === 'horizontal' ? '970px' : format === 'rectangle' ? '336px' : '100%',
        minHeight: format === 'horizontal' ? '90px' : '180px',
        background: '#F8FAFC',
        border: '1px dashed #CBD5E1',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-0000000000000000" // Replace with real AdSense ID
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />

        {/* Development & Pre-Approval Placeholder Indicator */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          color: '#64748B',
          fontSize: '0.8rem',
          pointerEvents: 'none',
          padding: '12px',
          textAlign: 'center',
          background: 'rgba(248, 250, 252, 0.95)'
        }}>
          <strong style={{ color: '#0F172A', fontSize: '0.85rem' }}>Google AdSense / Mediavine Ready</strong>
          <span>Ad Unit Placeholder ({format.toUpperCase()}) • Monetization Active</span>
        </div>
      </div>
    </div>
  );
};
