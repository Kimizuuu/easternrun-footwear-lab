import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  shoeName: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onSelectIndex,
  shoeName,
}) => {
  const [zoomScale, setZoomScale] = useState<number>(1);
  useBodyScrollLock(isOpen);

  // Reset zoom scale when index or modal changes
  useEffect(() => {
    setZoomScale(1);
  }, [currentIndex, isOpen]);

  // Handle keyboard navigation — handlers defined inside effect to avoid stale closures
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onSelectIndex]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.5, 0.8));
  const handleResetZoom = () => setZoomScale(1);
  const handleNext = () => onSelectIndex((currentIndex + 1) % photos.length);
  const handlePrev = () => onSelectIndex((currentIndex - 1 + photos.length) % photos.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery: ${shoeName}`}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        padding: '16px'
      }}
    >
      {/* Top Action Toolbar */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        color: '#FFFFFF',
        zIndex: 1001
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{shoeName} — High-Def Studio View</h3>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
            Angle {currentIndex + 1} of {photos.length} • Zoom: {Math.round(zoomScale * 100)}%
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1E293B', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom in"
            style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px', borderRadius: '4px', minHeight: '44px', minWidth: '44px' }}
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom out"
            style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px', borderRadius: '4px', minHeight: '44px', minWidth: '44px' }}
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Zoom"
            aria-label="Rotate image"
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '8px', borderRadius: '4px', minHeight: '44px', minWidth: '44px' }}
          >
            <RotateCcw size={16} />
          </button>
          <div style={{ width: '1px', height: '16px', background: '#475569', margin: '0 4px' }} />
          <button
            onClick={onClose}
            title="Close Zoom Lightbox (Esc)"
            aria-label="Close zoom"
            style={{ background: '#DC2626', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, minHeight: '44px', minWidth: '44px' }}
          >
            <X size={16} /> Close
          </button>
        </div>
      </div>

      {/* Main Image Viewer with Interactive Click Zoom & Pan */}
      <div style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: zoomScale > 1 ? 'grab' : 'zoom-in'
      }}>
        <img
          src={currentPhoto}
          alt={`${shoeName} High Res Zoom View`}
          loading="lazy"
          decoding="async"
          onClick={() => {
            // Cycle zoom: 1 → 1.8 → 2.5 → 1, relative to current scale.
            // Using threshold bands so toolbar zoom changes don't break the cycle.
            setZoomScale((prev) => {
              if (prev < 1.4) return 1.8;
              if (prev < 2.2) return 2.5;
              return 1;
            });
          }}
          style={{
            maxWidth: '90%',
            maxHeight: '80vh',
            objectFit: 'contain',
            transform: `scale(${zoomScale})`,
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            userSelect: 'none'
          }}
        />

        {/* Carousel Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                zIndex: 1002
              }}
            >
              <ChevronLeft size={24} color="#0F172A" />
            </button>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                zIndex: 1002
              }}
            >
              <ChevronRight size={24} color="#0F172A" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div style={{
        display: 'flex',
        gap: '10px',
        maxWidth: '1000px',
        overflowX: 'auto',
        padding: '10px 0',
        zIndex: 1001
      }}>
        {photos.map((photoUrl, idx) => (
          <div
            key={idx}
            onClick={() => onSelectIndex(idx)}
            style={{
              width: '70px',
              height: '50px',
              minWidth: '70px',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: currentIndex === idx ? '2px solid #60A5FA' : '1px solid #475569',
              opacity: currentIndex === idx ? 1 : 0.5,
              background: '#0F172A'
            }}
          >
            <img src={photoUrl} alt={`Thumbnail ${idx + 1}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
