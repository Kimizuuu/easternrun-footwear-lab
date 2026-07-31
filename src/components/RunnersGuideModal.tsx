import React, { useState } from 'react';
import { X, BookOpen, Search, ChevronDown, ChevronRight } from 'lucide-react';

interface RunnersGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RunnersGuideModal: React.FC<RunnersGuideModalProps> = ({ isOpen, onClose }) => {
  const [guideSearch, setGuideSearch] = useState('');
  const [expandedTopic, setExpandedTopic] = useState<string | null>('topic-1');

  if (!isOpen) return null;

  const topics = [
    {
      id: 'topic-1',
      title: '1. Shoe Categories: Finding Your Rotation',
      category: 'Footwear Types',
      content: `Running shoes aren't one-size-fits-all. Building a 2 to 3 shoe rotation extends shoe lifespan and keeps your legs healthy.

• Daily Trainer (70–80% of your runs): The all-around workhorse. Built for 5–20 km daily miles. Durable, balanced, and comfortable (e.g., Li-Ning Red Hare 9 Ultra, 361° Furious 2.0, Pegasus).
• Recovery Shoe (Max Cushion): Maximum stack height for post-race legs or easy recovery jogs (e.g., ANTA Bellero 4 PLUS, 361° Fierce 6, Nimbus).
• Tempo Shoe (Speed Workouts): Lighter, firmer, and snappy for threshold reps and interval workouts (e.g., Li-Ning Feidian 5.0 Challenger, 361° Flame 5 MIX, Boston).
• Racing Super Shoe: Full carbon plate + premium PEBA supercritical foam for race day personal records (e.g., Li-Ning Feidian 6.0 Ultra, ANTA C202 6 Pro, 361° Furious Future 2.0, Vaporfly).
• Trail Shoe: Deep aggressive rubber lugs and upper stone protection for dirt and mud.`
    },
    {
      id: 'topic-2',
      title: '2. Midsole Foam: The Engine of the Shoe',
      category: 'Materials',
      content: `The foam compound dictates softness, bounce, weight, and energy return.

• Standard EVA: Traditional EVA foam. Durable and inexpensive, but offers basic energy rebound (~50-60%).
• Supercritical EVA (Gas-Expanded): Infused with nitrogen or CO2 gas during molding. Significantly lighter, softer, and more responsive (found in many performance daily trainers like ANTA Peak Gravity & 361° Qu!kFOAM).
• TPU / E-TPU (e.g. Boost): Expanded thermoplastic polyurethane. Extremely durable with great bounce, though slightly heavier.
• PEBA / Pebax (e.g., Li-Ning BOOM, ANTA NITROEDGE, 361° Qu!kFLAME, ZoomX): Premium supercritical racing foam. Offers the highest energy return (80–89%) while remaining featherweight.`
    },
    {
      id: 'topic-3',
      title: '3. Carbon Plates: Myth vs. Reality',
      category: 'Biomechanics',
      content: `A carbon plate does not magically propel you forward on its own. Instead, it works as a system alongside high-stack supercritical foam and toe rocker geometry.

• Purpose: Stabilizes soft, high-stack PEBA foam, prevents deep foam collapse, and increases forefoot bending stiffness for efficient toe-off.
• Variants:
  - Full 3D Spoon Carbon: Maximum rigidity for full 42K marathon racing.
  - Forked / Winged Carbon: Allows natural foot torsions while retaining forward pop.
  - Carbon Rods / Shanks: Targeted midfoot stiffness.
  - Nylon & Glass-Fiber Plates: Slightly more forgiving, durable alternatives for daily speed workouts (e.g., 361° Biospeed 3.5 Pro).`
    },
    {
      id: 'topic-4',
      title: '4. Stack Height: Cushion vs. Ground Feel',
      category: 'Geometry',
      content: `Stack height is the measured thickness of the shoe between your foot and the ground (including outsole, midsole, and sockliner).

• High Stack (35 mm – 40+ mm): Maximum impact absorption for marathon distances and heavy runners. Slightly less stable on sharp corners.
• Low to Mid Stack (20 mm – 30 mm): Superior ground feel, nimbler agility, and natural ankle stability.`
    },
    {
      id: 'topic-5',
      title: '5. Heel-to-Toe Drop: What Fits Your Stride',
      category: 'Geometry',
      content: `Drop is the difference in height between the heel and forefoot (e.g., 39 mm heel / 31 mm forefoot = 8 mm drop).

• High Drop (8 mm – 10+ mm): Shifts strain away from calves and Achilles onto knees/quads. Ideal for heel strikers and beginners.
• Low Drop (0 mm – 6 mm): Encourages midfoot or forefoot striking and engages calves more.
• Ground Truth: There is no single "best" drop—choose what feels comfortable for your biomechanics and injury history.`
    },
    {
      id: 'topic-6',
      title: '6. Rocker Geometry: Smooth Transitions',
      category: 'Geometry',
      content: `Rocker geometry refers to the upward curvature of the forefoot and heel sole.

• Aggressive Rocker: Forces a fast, forward rolling motion over the toes, saving calf energy during long runs.
• Flat Sole: Offers a traditional, natural foot roll for casual paces.`
    },
    {
      id: 'topic-7',
      title: '7. Weight: Balancing Protection & Speed',
      category: 'Specs',
      content: `Weight guidelines for Size US 9:
• Daily Trainers: 250 g – 320 g
• Tempo Shoes: 220 g – 270 g
• Race Super Shoes: 170 g – 230 g
• Trail Shoes: 280 g – 350 g

Note: Balance matters. A well-proportioned 250g shoe with high energy return often feels faster than a poorly balanced 210g shoe.`
    },
    {
      id: 'topic-8',
      title: '8. Stability: Modern Non-Intrusive Support',
      category: 'Biomechanics',
      content: `Modern running shoes have moved away from rigid medial posts. Instead, stability is achieved through:
• Wider Midsole Basenets: Broader landing platforms underfoot.
• Midsole Sidewalls: Foam walls that cup the heel and arch gently.
• Geometry & Firmer Carrier Foams: Dual-density structures that prevent excessive inward collapse without forcing your foot into unnatural positions.`
    },
    {
      id: 'topic-9',
      title: '9. Outsole Rubber: Wet Traction & Durability',
      category: 'Outsole',
      content: `footwear manufacturers excel at outsole rubber tech (e.g., Li-Ning GCU, ANTA Liquid Rubber, 361° RPU).

• Blown Rubber: Softer, cushioned, slightly faster wear.
• Liquid / RPU / GCU Rubber: Superior wet asphalt grip and high abrasion resistance (lasting 700–1000+ km).
• Coverage & Lug Depth: Full coverage lasts longer; strategic cutouts save weight.`
    },
    {
      id: 'topic-10',
      title: '10. Upper Materials: Lockdown & Breathability',
      category: 'Upper',
      content: `The upper holds your foot securely to the midsole platform.

• Engineered Jacquard Mesh: Soft, comfortable, durable for daily trainers.
• Translucent Mono Mesh: Ultralight, hydrophobic, best ventilation for hot summer runs.
• Woven / BOOM FIBER: High tensile strength, zero-stretch race lockdown.`
    },
    {
      id: 'topic-11',
      title: '11. Last Shape & Toe Box Dimensions',
      category: 'Fit',
      content: `A shoe's last dictates its internal shape.
• Narrow Last: Snug performance hug for narrow feet.
• Regular Last: Standard US width.
• Wide-Friendly (e.g., 361° ET series): Generous forefoot width allowing natural toe splay.`
    },
    {
      id: 'topic-12',
      title: '12. Durability & Mileage Expectations',
      category: 'Durability',
      content: `Realistic lifespan estimates based on foam compression and rubber wear:
• Daily Workhorse Trainers: ~600 km to 1,000+ km (e.g., Li-Ning Red Hare 9 Ultra with TUFF OS rubber).
• Speed & Tempo Trainers: ~500 km to 800 km.
• Carbon Super Shoes: ~300 km to 600 km (PEBA foams compress faster under race-pace impacts).`
    },
    {
      id: 'topic-13',
      title: '13. Running Gait & Foot Strike Mechanics',
      category: 'Biomechanics',
      content: `Foot strikes include Heel Strike, Midfoot Strike, and Forefoot Strike.
Modern sports science emphasizes that rather than forcing a heavy gait correction, runners perform best in shoes that align naturally with their stride comfort.`
    },
    {
      id: 'topic-14',
      title: '14. Energy Return Claims: Grounded Reality',
      category: 'Lab Metrics',
      content: `Brands frequently advertise rebound claims like "89% Energy Return".
While supercritical PEBA foams truly return more energy than old EVA, independent lab tests (measuring mechanical hysteresis) provide the most reliable benchmark. Treat unverified marketing claims with healthy skepticism.`
    },
    {
      id: 'topic-15',
      title: '15. Fit Checklist: Before You Run',
      category: 'Fit',
      content: `Always verify:
1. Heel Lockdown: Zero slipping when stepping forward.
2. Toe Box Clearance: 1/2 thumb width of space past your longest toe.
3. Midfoot Security: Saddle holds firmly without lace pressure points.`
    },
    {
      id: 'topic-16',
      title: '16. Pace Matching: Pairing Shoe to Speed',
      category: 'Rotation',
      content: `• Easy / Recovery Pace (> 6:00/km): Daily trainers & Max cushion shoes.
• Tempo / Threshold Pace (4:30 – 5:30/km): Responsive tempo trainers.
• Race Day Pace (< 4:15/km): Carbon super-shoes with high PEBA bounce.`
    },
    {
      id: 'topic-17',
      title: '17. De-Jargoning Marketing Terms',
      category: 'Glossary',
      content: `• Supercritical Foam: Foam expanded with gas injection (lighter, bouncier).
• PEBA / Pebax: Polyether block amide—the lightest, highest rebound foam polymer.
• TPEE / ATPU: Thermoplastic polyester elastomer—highly durable resilient foam.
• Meta-Rocker / Speedroll: Curved midsole geometry for smooth roll-through.`
    },
    {
      id: 'topic-18',
      title: '18. EasternRun 15-Point Lab Review Standard',
      category: 'Review Methodology',
      content: `Our database evaluates shoes across 15 core parameters rated on a 10-point scale:
1. Cushioning  2. Responsiveness  3. Stability  4. Comfort  5. Fit Security
6. Dry Grip  7. Wet Grip  8. Durability  9. Breathability  10. Weight Efficiency
11. Value for Money  12. Beginner Friendliness  13. Speed Work  14. Long Distance  15. Race Day Output.`
    }
  ];

  const filteredTopics = topics.filter((t) => {
    if (!guideSearch.trim()) return true;
    const q = guideSearch.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '12px'
    }}>
      <div className="animate-scale-in" style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          background: '#F8FAFC',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1, minWidth: 0 }}>
            <BookOpen size={22} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0, color: '#0F172A', lineHeight: 1.3 }}>
                Runner’s Footwear Intelligence & Tech Guide
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '2px', lineHeight: 1.4 }}>
                18 Essential Topics: Foams, Carbon Geometry, Drops, Category Rotations & Lab Standards
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Guide"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '6px',
              borderRadius: '4px',
              flexShrink: 0
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Search guide topics (e.g. PEBA, Carbon Plate, Drop, Stack)..."
              value={guideSearch}
              onChange={(e) => setGuideSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Accordion List Body */}
        <div style={{
          padding: '16px 20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#F8FAFC'
        }}>
          {filteredTopics.map((topic) => {
            const isExpanded = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                style={{
                  background: '#FFFFFF',
                  border: isExpanded ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'border 0.2s ease'
                }}
              >
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: isExpanded ? '#EFF6FF' : '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1, minWidth: 0 }}>
                    <span style={{
                      background: isExpanded ? '#2563EB' : '#F1F5F9',
                      color: isExpanded ? '#FFFFFF' : '#475569',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {topic.category}
                    </span>
                    <strong style={{
                      fontSize: '0.95rem',
                      color: isExpanded ? '#1E40AF' : '#0F172A',
                      fontWeight: 800,
                      lineHeight: 1.35,
                      wordBreak: 'break-word'
                    }}>
                      {topic.title}
                    </strong>
                  </div>

                  <div style={{ flexShrink: 0 }}>
                    {isExpanded ? <ChevronDown size={20} color="#2563EB" /> : <ChevronRight size={20} color="#64748B" />}
                  </div>
                </button>

                {isExpanded && (
                  <div style={{
                    padding: '16px',
                    borderTop: '1px solid #E2E8F0',
                    fontSize: '0.88rem',
                    color: '#334155',
                    lineHeight: 1.65,
                    whiteSpace: 'pre-line',
                    background: '#FFFFFF'
                  }}>
                    {topic.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #E2E8F0',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
            EasternRun Independent Running Lab Knowledge Base
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 18px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close Tech Guide
          </button>
        </div>
      </div>
    </div>
  );
};
