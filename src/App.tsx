import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { INITIAL_SHOES_DATA } from './data/shoesData';
import type { Shoe, UserReview } from './types/shoe';
import { getShoeBySlug, getShoeSlug } from './utils/slugUtils';
import { SidebarNav } from './components/SidebarNav';
import { SpecDatabaseView } from './components/SpecDatabaseView';
import { ShoeDetailPage } from './components/ShoeDetailPage';
import { ShoeComparePage } from './components/ShoeComparePage';
import { CompareGSMArena } from './components/CompareGSMArena';
import { Top10Rankings } from './components/Top10Rankings';
import { ShoeFinderWizard } from './components/ShoeFinderWizard';
import { AddReviewModal } from './components/AddReviewModal';
import { LegalModal } from './components/LegalModal';
import { RunnersGuideModal } from './components/RunnersGuideModal';
import { SiteFooter } from './components/SiteFooter';
import { SEOHead } from './components/SEOHead';
import { BrandHubPage } from './components/BrandHubPage';
import { CategoryHubPage } from './components/CategoryHubPage';
import { NotFoundPage } from './components/NotFoundPage';
import { FloatingCompareTray } from './components/FloatingCompareTray';
import { Analytics } from '@vercel/analytics/react';
import { fetchAllReviews, submitReviewToSupabase } from './services/reviewService';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console so errors are visible in Vercel/browser logs
    console.error('[EasternRun] Uncaught error in component tree:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, sans-serif', background: '#0F172A', color: '#F8FAFC', padding: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ color: '#94A3B8', marginBottom: '24px' }}>An unexpected error occurred. Please refresh the page.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: '#3B82F6', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Helper component to handle Shoe Detail route with slug resolution
const ShoeDetailRouteWrapper: React.FC<{
  shoes: Shoe[];
  comparedShoes: Shoe[];
  onToggleCompare: (shoe: Shoe) => void;
  onOpenAddReview: (shoe: Shoe) => void;
}> = ({ shoes, comparedShoes, onToggleCompare, onOpenAddReview }) => {
  const { shoeSlug } = useParams<{ shoeSlug: string }>();
  const navigate = useNavigate();
  const shoe = getShoeBySlug(shoeSlug || '', shoes);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [shoeSlug]);

  if (!shoe) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '32px', textAlign: 'center', fontFamily: 'var(--font-main)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>Shoe Model Not Found (404)</h1>
        <p style={{ color: '#64748B', marginBottom: '24px' }}>The requested footwear model "{shoeSlug}" could not be found in our lab database.</p>
        <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: '#0F172A', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Return to Database Catalog</button>
      </div>
    );
  }

  return (
    <ShoeDetailPage
      shoe={shoe}
      onBack={() => navigate('/')}
      isCompared={comparedShoes.some((s) => s.id === shoe.id)}
      onToggleCompare={onToggleCompare}
      onOpenAddReview={onOpenAddReview}
    />
  );
};

// Scroll to top automatically on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

export function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Initial State with localStorage Persistence + Supabase Sync
  const [shoes, setShoes] = useState<Shoe[]>(() => {
    try {
      const savedReviewsRaw = localStorage.getItem('easternrun_user_reviews');
      if (!savedReviewsRaw) return INITIAL_SHOES_DATA;
      const savedReviews: Record<string, UserReview[]> = JSON.parse(savedReviewsRaw);

      return INITIAL_SHOES_DATA.map((s) => ({
        ...s,
        userReviews: [...(savedReviews[s.id] || []), ...(s.userReviews || [])]
      }));
    } catch {
      return INITIAL_SHOES_DATA;
    }
  });

  // Fetch live reviews from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    fetchAllReviews().then((liveReviews) => {
      if (!isMounted || !liveReviews || Object.keys(liveReviews).length === 0) return;
      setShoes((prevShoes) =>
        prevShoes.map((s) => {
          const shoeLiveReviews = liveReviews[s.id];
          if (!shoeLiveReviews || shoeLiveReviews.length === 0) return s;
          
          // Deduplicate reviews by ID
          const existingIds = new Set(s.userReviews.map((r) => r.id));
          const newToAdd = shoeLiveReviews.filter((r) => !existingIds.has(r.id));
          
          return {
            ...s,
            userReviews: [...newToAdd, ...s.userReviews]
          };
        })
      );
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const [comparedShoes, setComparedShoes] = useState<Shoe[]>(() => {
    try {
      const savedCompareIdsRaw = localStorage.getItem('easternrun_compare_list');
      if (!savedCompareIdsRaw) return [];
      const savedIds: string[] = JSON.parse(savedCompareIdsRaw);
      return INITIAL_SHOES_DATA.filter((s) => savedIds.includes(s.id));
    } catch {
      return [];
    }
  });

  // Sync searchQuery with URL query parameter ?q=...
  const urlSearchQuery = new URLSearchParams(location.search).get('q') || '';
  const [searchQuery, setSearchQueryState] = useState(urlSearchQuery);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    setSearchQueryState(q);
  }, [location.search]);

  const setSearchQuery = (q: string) => {
    setSearchQueryState(q);
    const searchParams = new URLSearchParams(location.search);
    if (q.trim().length > 0) {
      searchParams.set('q', q);
    } else {
      searchParams.delete('q');
    }
    const newSearch = searchParams.toString();
    navigate({ search: newSearch ? `?${newSearch}` : '' }, { replace: true });
  };

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isTop10Open, setIsTop10Open] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [shoeForReview, setShoeForReview] = useState<Shoe | null>(null);

  // Save compared shoes to localStorage on change
  useEffect(() => {
    try {
      const ids = comparedShoes.map((s) => s.id);
      localStorage.setItem('easternrun_compare_list', JSON.stringify(ids));
    } catch {
      // Ignore quota errors
    }
  }, [comparedShoes]);

  // Determine currently active shoe ID if on /shoe/:slug route
  const matchShoeSlug = location.pathname.startsWith('/shoe/')
    ? location.pathname.replace('/shoe/', '')
    : null;
  const currentActiveShoe = matchShoeSlug ? getShoeBySlug(matchShoeSlug, shoes) : null;

  const handleToggleCompare = (shoe: Shoe) => {
    if (comparedShoes.some((s) => s.id === shoe.id)) {
      setComparedShoes(comparedShoes.filter((s) => s.id !== shoe.id));
    } else {
      if (comparedShoes.length >= 3) {
        alert('You can compare up to 3 shoes.');
        return;
      }
      setComparedShoes([...comparedShoes, shoe]);
    }
  };

  const handleRemoveCompare = (shoeId: string) => {
    setComparedShoes(comparedShoes.filter((s) => s.id !== shoeId));
  };

  const handleAddUserReview = async (shoeId: string, newReview: UserReview) => {
    // 1. Optimistic update in state
    setShoes((prevShoes) =>
      prevShoes.map((s) => {
        if (s.id === shoeId) {
          return {
            ...s,
            userReviews: [newReview, ...s.userReviews]
          };
        }
        return s;
      })
    );

    // 2. Persist to Supabase (and localStorage fallback)
    const result = await submitReviewToSupabase(shoeId, newReview);
    if (!result.success && result.error) {
      console.warn('[EasternRun] Supabase sync warning:', result.error);
    }
  };

  const handleSelectShoe = (shoe: Shoe | null) => {
    if (shoe) {
      navigate(`/shoe/${getShoeSlug(shoe)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="app-root-container" style={{ display: 'flex', minHeight: '100vh', background: '#FFFFFF' }}>
      <ScrollToTop />

      {/* Default Root SEO Head */}
      {location.pathname === '/' && (
        <SEOHead
          title="EasternRun — Independent Global Running Shoe Database & Review Lab"
          description="Explore transparent specs, lab measurements, overall ratings, and independent runner reviews for global performance running shoes and emerging footwear innovations."
          canonicalUrl="https://easternrun.fit/"
        />
      )}

      {/* Fixed Left Sidebar Nav on Desktop / Sticky Mobile Bar on Phone */}
      <SidebarNav
        shoes={shoes}
        selectedShoeId={currentActiveShoe?.id || null}
        onSelectShoe={handleSelectShoe}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        compareCount={comparedShoes.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenTop10={() => setIsTop10Open(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Routes>
          {/* CATALOG HOME ROUTE */}
          <Route
            path="/"
            element={
              <main style={{ flex: 1, padding: 0 }}>
                <SpecDatabaseView
                  shoes={shoes}
                  onSelectShoe={handleSelectShoe}
                  comparedShoes={comparedShoes}
                  onToggleCompare={handleToggleCompare}
                  selectedBrand={selectedBrand}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onOpenWizard={() => setIsWizardOpen(true)}
                  onOpenCompare={() => setIsCompareOpen(true)}
                  onOpenTop10={() => setIsTop10Open(true)}
                  onOpenGuide={() => setIsGuideOpen(true)}
                />
              </main>
            }
          />

          {/* INDIVIDUAL SHOE REVIEW ROUTE */}
          <Route
            path="/shoe/:shoeSlug"
            element={
              <ShoeDetailRouteWrapper
                shoes={shoes}
                comparedShoes={comparedShoes}
                onToggleCompare={handleToggleCompare}
                onOpenAddReview={(s) => setShoeForReview(s)}
              />
            }
          />

          {/* DYNAMIC HEAD-TO-HEAD COMPARISON ROUTE */}
          <Route
            path="/compare/:compareSlug"
            element={<ShoeComparePage shoes={shoes} />}
          />

          {/* BRAND HUB PAGE ROUTE */}
          <Route
            path="/brand/:brandSlug"
            element={
              <BrandHubPage
                shoes={shoes}
                comparedShoes={comparedShoes}
                onSelectShoe={handleSelectShoe}
                onToggleCompare={handleToggleCompare}
              />
            }
          />

          {/* BEST OF CATEGORY HUB PAGE ROUTE */}
          <Route
            path="/best/:categorySlug"
            element={
              <CategoryHubPage
                shoes={shoes}
                comparedShoes={comparedShoes}
                onSelectShoe={handleSelectShoe}
                onToggleCompare={handleToggleCompare}
              />
            }
          />

          {/* CATCH-ALL ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Site Footer */}
        <SiteFooter
          onOpenWizard={() => setIsWizardOpen(true)}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenTop10={() => setIsTop10Open(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenLegal={() => setIsLegalOpen(true)}
        />
      </div>

      {isCompareOpen && (
        <CompareGSMArena
          shoes={comparedShoes}
          allShoes={shoes}
          onClose={() => setIsCompareOpen(false)}
          onRemoveShoe={handleRemoveCompare}
          onSelectShoe={handleSelectShoe}
        />
      )}

      {isTop10Open && (
        <Top10Rankings
          shoes={shoes}
          onClose={() => setIsTop10Open(false)}
          onSelectShoe={handleSelectShoe}
        />
      )}

      {isWizardOpen && (
        <ShoeFinderWizard
          shoes={shoes}
          onClose={() => setIsWizardOpen(false)}
          onSelectShoe={handleSelectShoe}
        />
      )}

      {shoeForReview && (
        <AddReviewModal
          shoe={shoeForReview}
          onClose={() => setShoeForReview(null)}
          onSubmitReview={handleAddUserReview}
        />
      )}

      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
      />

      <RunnersGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <FloatingCompareTray
        comparedShoes={comparedShoes}
        onRemoveShoe={handleRemoveCompare}
        onClearAll={() => setComparedShoes([])}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <Analytics />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
