import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from './SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', padding: '32px', textAlign: 'center', fontFamily: 'var(--font-main)' }}>
      <SEOHead
        title="Page Not Found (404) | EasternRun"
        description="The requested page could not be found in the EasternRun running shoe database."
        canonicalUrl="https://easternrun.fit/404"
      />
      <div style={{ fontSize: '4rem', fontWeight: 900, color: '#E2E8F0', marginBottom: '16px', letterSpacing: '-0.04em' }}>404</div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
        Page Not Found
      </h1>
      <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '24px', fontSize: '1rem' }}>
        The page you're looking for doesn't exist or has been moved. Explore our complete running shoe database below.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#0F172A',
          color: '#FFF',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.95rem'
        }}
      >
        Return to Database Catalog
      </Link>
    </div>
  );
};
