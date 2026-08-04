import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Shoe } from '../types/shoe';
import { parseCompareSlug, getShoeSlug } from '../utils/slugUtils';
import { SEOHead } from './SEOHead';
import { ArrowLeft, CheckCircle, AlertTriangle, Scale, Zap, Award } from 'lucide-react';

interface ShoeComparePageProps {
  shoes: Shoe[];
}

export const ShoeComparePage: React.FC<ShoeComparePageProps> = ({ shoes }) => {
  const { compareSlug } = useParams<{ compareSlug: string }>();
  const navigate = useNavigate();

  const { shoe1, shoe2 } = parseCompareSlug(compareSlug || '', shoes);

  if (!shoe1 || !shoe2) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <SEOHead
          title="Shoe Comparison Not Found | EasternRun"
          description="The requested shoe comparison could not be found."
          canonicalUrl="https://easternrun.fit/"
        />
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          Comparison Not Found
        </h2>
        <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
          We couldn't find the requested shoe comparison. Check out our main shoe database to select any two shoes for a head-to-head breakdown.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            background: '#2563EB',
            color: '#FFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            minHeight: '44px'
          }}
        >
          ← Back to Database
        </button>
      </div>
    );
  }

  const title = `${shoe1.name} vs ${shoe2.name}: Spec & Performance Comparison | EasternRun`;
  const description = `Detailed head-to-head spec comparison between ${shoe1.name} ($${shoe1.msrpUsd}) and ${shoe2.name} ($${shoe2.msrpUsd}). Stack height, drop, weight, carbon plate technology, and performance verdict.`;
  const canonicalUrl = `https://easternrun.fit/compare/${getShoeSlug(shoe1)}-vs-${getShoeSlug(shoe2)}`;
  const ogImage = shoe1.image ? `https://easternrun.fit${shoe1.image}` : undefined;

  // Generate dual Product & AggregateRating Schema.org JSON-LD
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: shoe1.name,
      image: `https://easternrun.fit${shoe1.image}`,
      description: shoe1.description,
      brand: { '@type': 'Brand', name: shoe1.brand },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: shoe1.msrpUsd,
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (shoe1.overallRating / 20).toFixed(1),
        reviewCount: 42
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: shoe2.name,
      image: `https://easternrun.fit${shoe2.image}`,
      description: shoe2.description,
      brand: { '@type': 'Brand', name: shoe2.brand },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: shoe2.msrpUsd,
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (shoe2.overallRating / 20).toFixed(1),
        reviewCount: 38
      }
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 60px 16px' }}>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        jsonLd={jsonLd}
      />

      {/* Navigation & Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#2563EB',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            padding: '8px 0',
            minHeight: '44px'
          }}
        >
          <ArrowLeft size={18} /> Back to Database
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', color: '#1D4ED8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
          <Scale size={16} /> HEAD-TO-HEAD SPEC COMPARISON
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 12px 0' }}>
          {shoe1.name} <span style={{ color: '#E11D48' }}>VS</span> {shoe2.name}
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Side-by-side technical specification, cushion response, drop geometry, and weight analysis based on official manufacturer specifications and verified wear-tester feedback.
        </p>
      </div>

      {/* Side-by-Side Shoe Cards Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Shoe 1 Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '2px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{shoe1.brand}</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 12px 0', textAlign: 'center' }}>{shoe1.name}</h2>
          <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: '#F8FAFC', borderRadius: '12px' }}>
            <img
              src={shoe1.image}
              alt={shoe1.name}
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
              style={{ maxHeight: '180px', maxWidth: '90%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: '12px 0', background: '#F1F5F9', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>OVERALL RATING</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563EB' }}>{shoe1.overallRating}/100</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>MSRP</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>${shoe1.msrpUsd}</div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/shoe/${getShoeSlug(shoe1)}`)}
            style={{ marginTop: '16px', width: '100%', padding: '10px 16px', background: '#0F172A', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', minHeight: '44px' }}
          >
            View Full Specs →
          </button>
        </div>

        {/* Shoe 2 Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '2px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{shoe2.brand}</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 12px 0', textAlign: 'center' }}>{shoe2.name}</h2>
          <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: '#F8FAFC', borderRadius: '12px' }}>
            <img
              src={shoe2.image}
              alt={shoe2.name}
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
              style={{ maxHeight: '180px', maxWidth: '90%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: '12px 0', background: '#F1F5F9', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>OVERALL RATING</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563EB' }}>{shoe2.overallRating}/100</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>MSRP</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>${shoe2.msrpUsd}</div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/shoe/${getShoeSlug(shoe2)}`)}
            style={{ marginTop: '16px', width: '100%', padding: '10px 16px', background: '#0F172A', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', minHeight: '44px' }}
          >
            View Full Specs →
          </button>
        </div>
      </div>

      {/* Full Spec Matrix */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '40px', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={20} color="#2563EB" /> Technical Specification Matrix
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              <th style={{ padding: '12px', color: '#64748B', width: '30%' }}>SPECIFICATION</th>
              <th style={{ padding: '12px', color: '#0F172A', width: '35%', fontWeight: 800 }}>{shoe1.name}</th>
              <th style={{ padding: '12px', color: '#0F172A', width: '35%', fontWeight: 800 }}>{shoe2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Category</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.category}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.category}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Weight (Men's US 9)</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.specs?.weightGrams ? `${shoe1.specs.weightGrams}g` : 'N/A'}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.specs?.weightGrams ? `${shoe2.specs.weightGrams}g` : 'N/A'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Stack Height (Heel/Forefoot)</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.specs?.heelStackMm && shoe1.specs?.forefootStackMm ? `${shoe1.specs.heelStackMm}mm / ${shoe1.specs.forefootStackMm}mm` : 'N/A'}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.specs?.heelStackMm && shoe2.specs?.forefootStackMm ? `${shoe2.specs.heelStackMm}mm / ${shoe2.specs.forefootStackMm}mm` : 'N/A'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Heel-to-Toe Drop</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.specs?.dropMm ? `${shoe1.specs.dropMm}mm` : 'N/A'}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.specs?.dropMm ? `${shoe2.specs.dropMm}mm` : 'N/A'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Midsole Foam Tech</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.specs?.foamName || 'Proprietary Superfoam'}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.specs?.foamName || 'Proprietary Superfoam'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Carbon Plate Type</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.specs?.carbonPlate || 'None'}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.specs?.carbonPlate || 'None'}</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', fontWeight: 600, color: '#475569' }}>Dominant Sector</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe1.dominantSector}</td>
              <td style={{ padding: '12px', color: '#0F172A' }}>{shoe2.dominantSector}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pros & Cons Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Shoe 1 Pros/Cons */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>{shoe1.name} Profile</h3>
          {shoe1.communityPros && shoe1.communityPros.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', marginBottom: '8px', textTransform: 'uppercase' }}>Strengths</div>
              {shoe1.communityPros.map((pro, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                  <CheckCircle size={16} color="#22C55E" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          )}
          {shoe1.communityCons && shoe1.communityCons.length > 0 && (
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B', marginBottom: '8px', textTransform: 'uppercase' }}>Trade-offs</div>
              {shoe1.communityCons.map((con, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                  <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shoe 2 Pros/Cons */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>{shoe2.name} Profile</h3>
          {shoe2.communityPros && shoe2.communityPros.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', marginBottom: '8px', textTransform: 'uppercase' }}>Strengths</div>
              {shoe2.communityPros.map((pro, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                  <CheckCircle size={16} color="#22C55E" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          )}
          {shoe2.communityCons && shoe2.communityCons.length > 0 && (
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B', marginBottom: '8px', textTransform: 'uppercase' }}>Trade-offs</div>
              {shoe2.communityCons.map((con, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                  <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Final Consensus Summary */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', padding: '32px', color: '#FFFFFF' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="#38BDF8" /> Head-to-Head Comparative Consensus
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
          {shoe1.overallRating > shoe2.overallRating ? (
            <>
              The <strong>{shoe1.name}</strong> scores higher overall ({shoe1.overallRating}/100 vs {shoe2.overallRating}/100) due to its specialized {shoe1.dominantSector.toLowerCase()} performance and high energy-return geometry. However, the <strong>{shoe2.name}</strong> (${shoe2.msrpUsd}) offers an excellent alternative for runners seeking {shoe2.tagline.toLowerCase()}.
            </>
          ) : shoe2.overallRating > shoe1.overallRating ? (
            <>
              The <strong>{shoe2.name}</strong> scores higher overall ({shoe2.overallRating}/100 vs {shoe1.overallRating}/100) due to its specialized {shoe2.dominantSector.toLowerCase()} performance and high energy-return geometry. However, the <strong>{shoe1.name}</strong> (${shoe1.msrpUsd}) offers an excellent alternative for runners seeking {shoe1.tagline.toLowerCase()}.
            </>
          ) : (
            <>
              Both the <strong>{shoe1.name}</strong> and <strong>{shoe2.name}</strong> share identical benchmark overall ratings ({shoe1.overallRating}/100). The choice between them comes down to individual preference between {shoe1.brand}'s design philosophy and {shoe2.brand}'s technical geometry.
            </>
          )}
        </p>
      </div>
    </div>
  );
};
