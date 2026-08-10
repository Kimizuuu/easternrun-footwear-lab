import React, { useState } from 'react';
import { X, Star, ShieldAlert } from 'lucide-react';
import type { Shoe, UserReview } from '../types/shoe';
import { sanitizeText, rateLimiter } from '../utils/security';

interface AddReviewModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onSubmitReview: (shoeId: string, review: UserReview) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  shoe,
  onClose,
  onSubmitReview,
}) => {
  if (!shoe) return null;

  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [distanceKm, setDistanceKm] = useState(150);
  const [errorMessage, setErrorMessage] = useState('');
  const pros = ['Propulsion', 'Traction'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Form Submission Throttle (Prevent accidental double clicks)
    if (!rateLimiter.isAllowed('submit_review', 3000)) {
      setErrorMessage('Please wait a moment before submitting another review.');
      return;
    }

    if (!userName.trim() || !title.trim() || !comment.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // 2. Input XSS Sanitization Security Processing
    const cleanUserName = sanitizeText(userName.trim().slice(0, 40));
    const cleanTitle = sanitizeText(title.trim().slice(0, 100));
    const cleanComment = sanitizeText(comment.trim().slice(0, 1000));

    const newReview: UserReview = {
      id: `user-rev-${Date.now()}`,
      userName: cleanUserName,
      rating,
      date: new Date().toISOString().split('T')[0],
      title: cleanTitle,
      comment: cleanComment,
      pros,
      cons: [],
      verifiedDistanceKm: Math.min(Math.max(distanceKm, 0), 10000),
      helpfulCount: 1
    };

    onSubmitReview(shoe.id, newReview);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(10px)',
      zIndex: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#FFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          padding: 'clamp(16px, 4vw, 28px)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Write Review for {shoe.name}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Share your training & race experience (Protected Submission)
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close review modal"
            style={{
              background: '#F1F5F9',
              color: 'var(--text-secondary)',
              border: 'none',
              borderRadius: '50%',
              padding: '10px',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {errorMessage && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#DC2626',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldAlert size={16} /> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Your Name / Handle
            </label>
            <input
              type="text"
              required
              maxLength={40}
              placeholder="e.g. Sub3Marathoner"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: '#F8FAFC',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Rating
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px', minHeight: '44px', minWidth: '44px' }}
                >
                  <Star
                    size={22}
                    fill={star <= rating ? '#EAB308' : 'none'}
                    color={star <= rating ? '#EAB308' : '#CBD5E1'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Distance Logged in Pair (KM)
            </label>
            <input
              type="number"
              min="0"
              max="10000"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: '#F8FAFC',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Review Title
            </label>
            <input
              type="text"
              required
              maxLength={100}
              placeholder="e.g. Incredible wet grip & bouncy energy return"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: '#F8FAFC',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Detailed Review
            </label>
            <textarea
              required
              rows={3}
              maxLength={1000}
              placeholder="Comment on foam bounciness, carbon snap, traction, and fit..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: '#F8FAFC',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#0F172A',
              color: '#FFF',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};
