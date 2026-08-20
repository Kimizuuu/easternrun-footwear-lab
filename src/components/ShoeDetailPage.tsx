import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Scale, ThumbsUp, ThumbsDown, Ruler, ZoomIn, Activity, Star, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Shoe } from '../types/shoe';
import { SizeChartModal } from './SizeChartModal';
import { ImageZoomModal } from './ImageZoomModal';
import { SEOHead } from './SEOHead';
import { getShoeSlug, getBrandSlug } from '../utils/slugUtils';

interface ShoeDetailPageProps {
  shoe: Shoe;
  onBack: () => void;
  isCompared: boolean;
  onToggleCompare: (shoe: Shoe) => void;
  onOpenAddReview: (shoe: Shoe) => void;
}

export const ShoeDetailPage: React.FC<ShoeDetailPageProps> = ({
  shoe,
  onBack,
  isCompared,
  onToggleCompare,
  onOpenAddReview,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Automatically scroll window to top when shoe detail page mounts or shoe changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [shoe.id]);

  const photos = shoe.galleryImages && shoe.galleryImages.length > 0 ? shoe.galleryImages : [shoe.image];
  const activePhoto = photos[selectedPhotoIndex] || shoe.image;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const shoeSlug = getShoeSlug(shoe);
  const brandSlug = getBrandSlug(shoe.brand);
  const canonicalUrl = `https://easternrun.fit/shoe/${shoeSlug}`;
  const title = `${shoe.brand} ${shoe.name} Spec Review & Performance Database | EasternRun`;
  const description = `Full technical breakdown for ${shoe.brand} ${shoe.name}: $${shoe.msrpUsd} MSRP, ${shoe.specs?.weightGrams ? shoe.specs.weightGrams + 'g' : ''}, ${shoe.specs?.foamName || 'Superfoam'}, overall rating ${shoe.overallRating}/100.`;

  const productSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': canonicalUrl + '#product',
    name: shoe.name,
    image: `https://easternrun.fit${shoe.image}`,
    description: shoe.description,
    brand: { '@type': 'Brand', name: shoe.brand },
    category: shoe.category,
    sku: shoe.id,
    color: 'Multiple',
    material: shoe.specs?.upperMaterial || 'Synthetic',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: shoe.msrpUsd,
      availability: 'https://schema.org/InStock',
      url: canonicalUrl
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: 'EasternRun Footwear Lab'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: (shoe.overallRating / 20).toFixed(1),
        bestRating: '5'
      },
      reviewBody: shoe.finalConsensusVerdict
    }
  };

  // AggregateRating intentionally omitted — user reviews are localStorage-only
  // and cannot be verified by crawlers. Will be re-enabled with a reviews backend.

  const jsonLdBase: object[] = [
    productSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://easternrun.fit/' },
        { '@type': 'ListItem', position: 2, name: shoe.brand, item: `https://easternrun.fit/brand/${brandSlug}` },
        { '@type': 'ListItem', position: 3, name: shoe.name, item: canonicalUrl }
      ]
    }
  ];

  const jsonLd = shoe.faqItems && shoe.faqItems.length > 0
    ? [
        ...jsonLdBase,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: shoe.faqItems.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      ]
    : jsonLdBase;

  return (
    <article className="animate-fade-in" style={{
      width: '100%',
      paddingBottom: '80px',
      fontFamily: 'var(--font-main)',
      color: '#1E293B',
      background: '#FFFFFF'
    }}>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={`https://easternrun.fit${shoe.image}`}
        jsonLd={jsonLd}
      />
      {/* Top Fixed Breadcrumb Bar */}
      <div style={{
        background: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px clamp(16px, 3vw, 32px)'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              color: '#0F172A',
              border: 'none',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '44px'
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setIsSizeChartOpen(true)}
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px'
              }}
            >
              <Ruler size={16} />
              <span>Size Guide</span>
            </button>

            <button
              onClick={() => onToggleCompare(shoe)}
              style={{
                background: isCompared ? '#0F172A' : '#FFFFFF',
                color: isCompared ? '#FFFFFF' : '#0F172A',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px'
              }}
            >
              <Scale size={16} />
              {isCompared ? 'In Compare Tray' : 'Compare Shoe'}
            </button>

            {/* Share Button */}
            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert('Copied review link to clipboard!');
              }}
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px'
              }}
            >
              <Share2 size={16} />
              <span>Share Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Expansive Content Layout */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Header Title Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              TECH SPECS & REVIEW
            </span>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>•</span>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>{shoe.brand} Performance Footwear</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {shoe.name}
            </h1>

            <div style={{
              background: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
              <Star size={18} fill="#EAB308" color="#EAB308" />
              <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>{shoe.overallRating}</span>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', color: '#475569', margin: '12px 0 0 0', lineHeight: 1.6, fontWeight: 400 }}>
            {shoe.tagline}
          </p>
        </div>

        {/* SECTION 1: STUDIO GALLERY & HIGH-DEFINITION LIGHTBOX STAGE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Main HD Photo Stage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(260px, 50vw, 440px)',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setIsZoomModalOpen(true)}
            >
              <img
                src={activePhoto}
                alt={`${shoe.name} Angle ${selectedPhotoIndex + 1}`}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  mixBlendMode: 'multiply',
                  margin: 'auto',
                  display: 'block'
                }}
              />

              {/* Overlay Zoom Trigger */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(4px)'
              }}>
                <ZoomIn size={16} />
                <span>Click Photo to Zoom</span>
              </div>

              {/* Angle Switch Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '16px',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid #CBD5E1',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={20} color="#0F172A" />
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '16px',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid #CBD5E1',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronRight size={20} color="#0F172A" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedPhotoIndex === idx ? '3px solid #0F172A' : '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = '/images/fallback-shoe.jpg'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specifications Overview Table */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>
              Key Specs
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '16px', fontSize: '0.9rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>MSRP PRICE</span>
                <strong style={{ fontSize: '1.2rem', color: '#0F172A', fontFamily: 'var(--font-mono)' }}>${shoe.msrpUsd}</strong>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>¥{shoe.msrpRmb}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>WEIGHT (US 9)</span>
                <strong style={{ fontSize: '1.2rem', color: '#2563EB', fontFamily: 'var(--font-mono)' }}>{shoe.specs.weightGrams}g</strong>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>{shoe.specs.weightOz} oz</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>STACK HEIGHTS</span>
                <strong style={{ color: '#0F172A' }}>{shoe.specs.heelStackMm}mm Heel / {shoe.specs.forefootStackMm}mm Forefoot</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>HEEL-TO-TOE DROP</span>
                <strong style={{ color: '#0F172A' }}>{shoe.specs.dropMm} mm</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>FOAM COMPOUND</span>
                <strong style={{ color: '#0F172A' }}>{shoe.specs.foamName} ({shoe.specs.foamType})</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>ENERGY RETURN</span>
                <strong style={{ color: '#2563EB', fontFamily: 'var(--font-mono)' }}>{shoe.specs.foamResiliencePercent}% Rebound</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>CARBON PLATE</span>
                <strong style={{ color: '#0F172A' }}>{shoe.specs.carbonPlate}</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>RIGIDITY INDEX</span>
                <strong style={{ color: '#0F172A' }}>{shoe.specs.carbonStiffnessIndex} / 10 Stiffness</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>LIFESPAN</span>
              <strong style={{ fontSize: '1rem', color: '#0F172A' }}>{shoe.specs.estimatedLifespanKm} Kilometers</strong>
              <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                Outsole Rubber: {shoe.specs.outsoleRubber} (Wet Grip Score: {shoe.specs.wetTractionScore}/10)
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: DETAILED MECHANICAL ANALYSIS & FOAM SCIENCE */}
        <div style={{
          background: '#0F172A',
          color: '#FFFFFF',
          borderRadius: '12px',
          padding: 'clamp(20px, 4vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={24} color="#60A5FA" />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: '#F8FAFC' }}>
              Midsole & Structure
            </h2>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
            {shoe.description}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #1E293B'
          }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px 0' }}>Energy Return</h4>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                {shoe.specs.foamName} supercritical foam compound yields {shoe.specs.foamResiliencePercent}% energy return in mechanical laboratory drop-compression tests.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px 0' }}>Carbon Plate</h4>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Features a {shoe.specs.carbonPlate} with a rigidity score of {shoe.specs.carbonStiffnessIndex}/10, controlling foam compression and increasing forefoot toe-off lever efficiency.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px 0' }}>Upper & Fit</h4>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Constructed from {shoe.specs.upperMaterial} (Breathability Score: {shoe.specs.breathabilityScore}/10). Fit profile: {shoe.specs.fitWidth}.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: 4 BIOMECHANICAL SECTOR SUITABILITY CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Performance Scores
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px'
          }}>
            {/* Sector 1: Walking */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>Walking</h4>
                <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>{shoe.useCaseValues.walkingScore}/100</strong>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                {shoe.useCaseValues.walkingAnalysis}
              </p>
            </div>

            {/* Sector 2: Daily Miles */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>Daily Training</h4>
                <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>{shoe.useCaseValues.dailyRunScore}/100</strong>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                {shoe.useCaseValues.dailyRunAnalysis}
              </p>
            </div>

            {/* Sector 3: Tempo */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>Speed Work</h4>
                <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: '#0F172A' }}>{shoe.useCaseValues.speedWorkoutScore}/100</strong>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                {shoe.useCaseValues.speedWorkoutAnalysis}
              </p>
            </div>

            {/* Sector 4: Marathon Race Day */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>Race Day</h4>
                <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: '#2563EB' }}>{shoe.useCaseValues.marathonRaceScore}/100</strong>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                {shoe.useCaseValues.marathonRaceAnalysis}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: WEAR-TESTER PROS, CONS & VERDICT REPORT */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: 'clamp(20px, 4vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Verdict
          </h2>

          <div style={{
            background: '#F8FAFC',
            borderLeft: '4px solid #0F172A',
            padding: '20px',
            borderRadius: '0 8px 8px 0',
            fontSize: '1rem',
            color: '#334155',
            lineHeight: 1.6
          }}>
            <strong>Verdict:</strong> {shoe.finalConsensusVerdict}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '32px'
          }}>
            {/* EasternRun Pros */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#166534', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ThumbsUp size={18} /> EasternRun Pros
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {shoe.communityPros?.map((pro, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={16} color="#166534" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EasternRun Cons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#991B1B', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ThumbsDown size={18} /> EasternRun Cons
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {shoe.communityCons?.map((con, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#991B1B', fontWeight: 900, lineHeight: 1 }}>•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 5: USER REVIEWS & COMMUNITY FEEDBACK */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Reviews ({shoe.userReviews?.length || 0})
              </h2>
              
            </div>

            <button
              onClick={() => onOpenAddReview(shoe)}
              aria-label="Add a review"
              style={{
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Add Review
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {shoe.userReviews && shoe.userReviews.length > 0 ? (
              shoe.userReviews.map((rev) => (
                <div key={rev.id} style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>{rev.userName}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
                        Verified {rev.verifiedDistanceKm} km
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < rev.rating ? "#EAB308" : "none"} color={i < rev.rating ? "#EAB308" : "#CBD5E1"} />
                      ))}
                      <span style={{ fontSize: '0.8rem', color: '#64748B', marginLeft: '6px' }}>{rev.date}</span>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>{rev.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{rev.comment}</p>
                </div>
              ))
            ) : (
              <div style={{ padding: '32px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', textAlign: 'center', color: '#64748B' }}>
                No user reviews submitted yet. Be the first runner to add a verified wear-tester review for {shoe.name}!
              </div>
            )}
          </div>
        </div>

        {/* SECTION 6: EDITOR REVIEW */}
        {shoe.editorReview && (
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              📝 EasternRun Editor Review
            </h2>
            <article style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8 }}>
              {shoe.editorReview}
            </article>
          </div>
        )}

        {/* SECTION 7: FAQ ACCORDION */}
        {shoe.faqItems && shoe.faqItems.length > 0 && (
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              ❓ Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {shoe.faqItems.map((faq, index) => (
                <div key={index} style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    style={{
                      width: '100%',
                      background: '#F8FAFC',
                      border: 'none',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      textAlign: 'left'
                    }}
                  >
                    {faq.question}
                    {openFaqIndex === index ? <ChevronUp size={20} color="#64748B" /> : <ChevronDown size={20} color="#64748B" />}
                  </button>
                  {openFaqIndex === index && (
                    <div style={{ padding: '16px 20px', background: '#FFFFFF', fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #E2E8F0' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        brandName={shoe.brand}
      />

      <ImageZoomModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        photos={photos}
        currentIndex={selectedPhotoIndex}
        onSelectIndex={(idx) => setSelectedPhotoIndex(idx)}
        shoeName={shoe.name}
      />
    </article>
  );
};
