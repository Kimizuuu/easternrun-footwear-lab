import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Shoe } from '../types/shoe';
import { ShoeCardGSMArena } from './ShoeCardGSMArena';
import { SEOHead } from './SEOHead';
import { Shield, ArrowLeft } from 'lucide-react';

interface BrandHubPageProps {
  shoes: Shoe[];
  comparedShoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  onToggleCompare: (shoe: Shoe) => void;
}

const BRAND_TECH_OVERVIEWS: Record<string, { title: string; foamTech: string; plateTech: string; description: string }> = {
  'li-ning': {
    title: 'Li-Ning Performance Running',
    foamTech: 'BOOM Supercritical PEBA / TPU',
    plateTech: 'Full-Length 3D Carbon Fiber Plate / Carbon Shank',
    description: 'Li-Ning is a pioneer in elite super-shoes, featuring high-resilience BOOM supercritical foam (up to 89% energy return) and anatomical carbon plate architecture validated in World Athletics marathons.'
  },
  'anta': {
    title: 'ANTA Performance Footwear',
    foamTech: 'NITROEDGE Nitrogen-Infused PEBA',
    plateTech: '3D Carbon Fiber & Winged Stabilization Plates',
    description: 'ANTA delivers cutting-edge nitrogen-foamed midsoles engineered for extreme energy return, high durability, and maximum lateral stability across race and daily training sectors.'
  },
  '361-degrees': {
    title: '361° Running Lab',
    foamTech: 'Qu!kFLAME CQT PEBA Supercritical Foam',
    plateTech: 'Full 3D Bionic Carbon Fiber & Nylon Plates',
    description: '361° features Qu!kFLAME CQT foam chemistry engineered for ultra-lightweight propulsion, resilient bounce, and high marathon speed consistency.'
  },
  'qiaodan': {
    title: 'Qiaodan Sports Science',
    foamTech: 'Q-KUNGFU TURBO / PEBA Dual Foam',
    plateTech: 'Full 3D Spoon Carbon & TPU Speed Shanks',
    description: 'Qiaodan provides elite marathon racing performance with high-rebound Q-KUNGFU PEBA formulations and spoon-shaped carbon propulsion plates.'
  },
  'xtep': {
    title: 'Xtep Champion Running Lab',
    foamTech: 'X-TEP ACE Super-Critical PEBA Foam',
    plateTech: 'T700 Carbon Fiber & Nylon Propulsion Plates',
    description: 'Xtep is China’s marathon championship dominant brand, holding record-breaking podium finishes with high-rebound X-TEP ACE PEBA foam and indestructible military-grade CPU outsole traction.'
  },
  'nike': {
    title: 'Nike Running Benchmark',
    foamTech: 'ZoomX PEBA & ReactX Foam',
    plateTech: 'Full-Length Flyplate & Air Zoom Pods',
    description: 'Nike benchmark shoes featuring industry-defining ZoomX PEBA foam and carbon Flyplates, serving as baseline laboratory comparison standards.'
  },
  'adidas': {
    title: 'Adidas Adizero Performance',
    foamTech: 'Lightstrike Pro PEBA Compound',
    plateTech: 'Carbon ENERGYRODS 2.0 & Glass-Fiber Rods',
    description: 'Adidas Adizero series engineered with resilient Lightstrike Pro foam and stiff ENERGYRODS designed for smooth toe-off transition.'
  },
  'saucony': {
    title: 'Saucony Endorphin Lineup',
    foamTech: 'PWRRUN HG & PWRRUN PB Supercritical Foam',
    plateTech: 'Full Carbon Fiber & Winged Nylon Plates',
    description: 'Saucony Endorphin series featuring SPEEDROLL technology and responsive PWRRUN PB/HG foams for effortless race pace efficiency.'
  },
  'asics': {
    title: 'ASICS Stability & Cushion',
    foamTech: 'FF BLAST™ PLUS / FF BLAST™ TURBO+',
    plateTech: '4D Guidance System & PureGEL Rearfoot',
    description: 'ASICS premium mileage workhorses and race day speed demons featuring FlyteFoam Blast TURBO+ PEBA foam and PureGEL impact protection.'
  },
  'mizuno': {
    title: 'Mizuno Wave Performance',
    foamTech: 'MIZUNO ENERZY NXT & ENERZY LITE+ PEBA',
    plateTech: 'Pebax & Carbon-Infused Wave Plates',
    description: 'Mizuno combines innovative Smooth Speed Assist geometry with bio-based ENERZY NXT foam and structural Wave Plates for explosive forefoot efficiency.'
  },
  'new-balance': {
    title: 'New Balance FuelCell & Fresh Foam',
    foamTech: '100% PEBA FuelCell & Soft Fresh Foam X',
    plateTech: 'Energy Arc Carbon Fiber Plate System',
    description: 'New Balance delivers cloud-soft daily recovery training with Fresh Foam X alongside ultra-bouncy 100% PEBA FuelCell super-shoes.'
  },
  'hoka': {
    title: 'HOKA Max-Cushion & Rocker Lab',
    foamTech: 'Supercritical Gas-Injected EVA & Marshmallow Foam',
    plateTech: 'Early-Stage Meta-Rocker & Carbon Plates',
    description: 'HOKA pioneers max-cushion comfort and Meta-Rocker geometries, offering effortless leg-saving shock absorption for running, walking, and recovery.'
  },
  'brooks': {
    title: 'Brooks Run Happy Performance',
    foamTech: 'DNA LOFT v3 Supercritical Nitrogen-Infused Foam',
    plateTech: 'GuideRails Support & Speed Vault Plates',
    description: 'Brooks combines nitrogen-infused DNA LOFT v3 foam with GuideRails holistic support, creating America’s most trusted daily workhorses.'
  },
  'skechers': {
    title: 'Skechers Performance & Walking',
    foamTech: 'Hyper Burst Supercritical & ULTRA GO Foam',
    plateTech: 'Hyper Pillar Technology & Cushion Geometry',
    description: 'Skechers delivers world-renowned walking and daily standing comfort powered by high-rebound Hyper Pillar Technology and Air-Cooled Goga Mat insoles.'
  },
  'salomon': {
    title: 'Salomon Mountain & Trail Lab',
    foamTech: 'EnergyCell+ & Energy Foam Cushioning',
    plateTech: 'Profeel Film & Mud Contagrip Lugs',
    description: 'Salomon is the world benchmark for technical trail running and mountain racing, equipped with 5.5mm Mud Contagrip lugs and Sensifit foot wrap.'
  },
  'on-running': {
    title: 'On Running Swiss CloudTec',
    foamTech: 'CloudTec® Zero-Gravity & Dual-Density Helion™ Foam',
    plateTech: 'Speedboard® Flex & Carbon Propulsion Plates',
    description: 'Swiss-engineered CloudTec pod geometry paired with responsive Speedboards for effortless all-day walking, travel, and bouncy running performance.'
  },
  'altra': {
    title: 'Altra Zero Drop & FootShape',
    foamTech: 'Altra EGO™ & EGO MAX Responsive Cushioning',
    plateTech: 'StoneGuard™ Rock Protection & Zero Drop',
    description: 'Altra features 0mm Zero Drop positioning and wide FootShape™ toe boxes, encouraging natural foot splay and healthy posture on trails and roads.'
  },
  'la-sportiva': {
    title: 'La Sportiva Mountain Skyrunning',
    foamTech: 'Compressed EVA & Injection Molded Midsole',
    plateTech: 'STB Control Frame & FriXion Red Rubber',
    description: 'La Sportiva skyrunning performance footwear engineered for vertical mountain kilometer races, steep ridge scrambles, and rugged terrain.'
  }
};

export const BrandHubPage: React.FC<BrandHubPageProps> = ({
  shoes,
  comparedShoes,
  onSelectShoe,
  onToggleCompare,
}) => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const normalizedSlug = (brandSlug || '').toLowerCase();

  // Match brand shoes dynamically
  const brandShoes = shoes.filter(s => {
    const b = s.brand.toLowerCase().replace(/[^a-z0-9]/g, '');
    const target = normalizedSlug.replace(/[^a-z0-9]/g, '').replace('degrees', '361');
    return b.includes(target) || target.includes(b) || (target.includes('361') && b.includes('361'));
  }).sort((a, b) => b.overallRating - a.overallRating);

  const info = BRAND_TECH_OVERVIEWS[normalizedSlug] || {
    title: `${brandSlug?.toUpperCase()} Running Shoes`,
    foamTech: 'Supercritical Midsole Compounds',
    plateTech: 'Carbon & TPU Propulsion Plates',
    description: `Explore detailed specs, lab scores, and runner reviews for ${brandSlug} performance running shoes.`
  };

  const canonicalUrl = `https://easternrun.fit/brand/${normalizedSlug}`;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px clamp(14px, 3vw, 28px)', fontFamily: 'var(--font-main)' }}>
      <SEOHead
        title={`${info.title} Specs & Reviews | EasternRun`}
        description={info.description}
        canonicalUrl={canonicalUrl}
      />

      {/* Back Link */}
      <Link 
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#64748B',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={16} /> Back to Spec Database
      </Link>

      {/* Brand Hero Header */}
      <div style={{
        background: '#0F172A',
        color: '#F8FAFC',
        borderRadius: '12px',
        padding: 'clamp(24px, 4vw, 40px)',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '4px', marginBottom: '14px' }}>
          <Shield size={14} color="#38BDF8" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            OFFICIAL BRAND TECH HUB
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          {info.title}
        </h1>

        <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '900px', margin: '0 0 24px 0' }}>
          {info.description}
        </p>

        {/* Tech Specs Badges */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '10px 14px' }}>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Midsole Foam Tech</span>
            <strong style={{ fontSize: '0.85rem', color: '#F8FAFC' }}>{info.foamTech}</strong>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '10px 14px' }}>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Plate Architecture</span>
            <strong style={{ fontSize: '0.85rem', color: '#38BDF8' }}>{info.plateTech}</strong>
          </div>
        </div>
      </div>

      {/* Brand Shoe Catalog Grid */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
        {brandShoes.length} Models in {info.title}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
        gap: '32px'
      }}>
        {brandShoes.map(shoe => (
          <ShoeCardGSMArena
            key={shoe.id}
            shoe={shoe}
            onSelect={onSelectShoe}
            isCompared={comparedShoes.some(s => s.id === shoe.id)}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </div>
  );
};
