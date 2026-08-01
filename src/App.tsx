import { useState, useEffect } from 'react';
import { INITIAL_SHOES_DATA } from './data/shoesData';
import type { Shoe, UserReview } from './types/shoe';
import { SidebarNav } from './components/SidebarNav';
import { SpecDatabaseView } from './components/SpecDatabaseView';
import { ShoeDetailPage } from './components/ShoeDetailPage';
import { CompareGSMArena } from './components/CompareGSMArena';
import { Top10Rankings } from './components/Top10Rankings';
import { ShoeFinderWizard } from './components/ShoeFinderWizard';
import { AddReviewModal } from './components/AddReviewModal';
import { LegalModal } from './components/LegalModal';
import { RunnersGuideModal } from './components/RunnersGuideModal';
import { SiteFooter } from './components/SiteFooter';
import { Analytics } from '@vercel/analytics/react';

export function App() {
  const [shoes, setShoes] = useState<Shoe[]>(INITIAL_SHOES_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [comparedShoes, setComparedShoes] = useState<Shoe[]>([]);
  const [selectedShoeDetail, setSelectedShoeDetail] = useState<Shoe | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isTop10Open, setIsTop10Open] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [shoeForReview, setShoeForReview] = useState<Shoe | null>(null);

  // Automatic Scroll Restoration: Always scroll window to top when changing selected shoe detail or returning to catalog
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedShoeDetail]);

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

  const handleAddUserReview = (shoeId: string, newReview: UserReview) => {
    setShoes(shoes.map((s) => {
      if (s.id === shoeId) {
        return {
          ...s,
          userReviews: [newReview, ...s.userReviews]
        };
      }
      return s;
    }));

    if (selectedShoeDetail && selectedShoeDetail.id === shoeId) {
      setSelectedShoeDetail({
        ...selectedShoeDetail,
        userReviews: [newReview, ...selectedShoeDetail.userReviews]
      });
    }
  };

  const handleSelectShoe = (shoe: Shoe) => {
    setSelectedShoeDetail(shoe);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="app-root-container" style={{ display: 'flex', minHeight: '100vh', background: '#FFFFFF' }}>
      {/* Fixed Left Sidebar Nav on Desktop / Sticky Mobile Bar on Phone */}
      <SidebarNav
        shoes={shoes}
        selectedShoeId={selectedShoeDetail?.id || null}
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
        {selectedShoeDetail ? (
          /* INDIVIDUAL SHOE LAB REVIEW PAGE */
          <ShoeDetailPage
            shoe={selectedShoeDetail}
            onBack={() => handleSelectShoe(null as any)}
            isCompared={comparedShoes.some((s) => s.id === selectedShoeDetail.id)}
            onToggleCompare={handleToggleCompare}
            onOpenAddReview={(s) => setShoeForReview(s)}
          />
        ) : (
          /* STREAMLINED FULL-BLEED DOCUMENTARY LANDING CATALOG VIEW */
          <main style={{ flex: 1, padding: 0 }}>
            <SpecDatabaseView
              shoes={shoes}
              onSelectShoe={handleSelectShoe}
              comparedShoes={comparedShoes}
              onToggleCompare={handleToggleCompare}
              selectedBrand={selectedBrand}
              searchQuery={searchQuery}
              onOpenWizard={() => setIsWizardOpen(true)}
              onOpenCompare={() => setIsCompareOpen(true)}
              onOpenTop10={() => setIsTop10Open(true)}
              onOpenGuide={() => setIsGuideOpen(true)}
            />
          </main>
        )}

        {/* Comprehensive Multi-Column Site Footer */}
        <SiteFooter
          onOpenWizard={() => setIsWizardOpen(true)}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenTop10={() => setIsTop10Open(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenLegal={() => setIsLegalOpen(true)}
        />
      </div>

      {/* Modals */}
      {isCompareOpen && (
        <CompareGSMArena
          shoes={comparedShoes}
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

      <Analytics />
    </div>
  );
}

export default App;
