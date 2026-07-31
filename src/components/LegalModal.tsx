import React from 'react';
import { X, ShieldCheck, Copyright, AlertCircle, Mail } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      padding: '20px'
    }}>
      <div className="animate-scale-in" style={{
        background: '#FFFFFF',
        borderRadius: '8px',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          background: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#2563EB" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>
              Proprietary Rights, Copyright & Trademark Attribution
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: '#334155'
        }}>
          {/* Section 1: Proprietary Rights */}
          <div style={{ background: '#F1F5F9', padding: '16px', borderRadius: '6px', borderLeft: '4px solid #0F172A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Copyright size={16} color="#0F172A" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                1. Proprietary Rights & Site Copyright
              </h3>
            </div>
            <p style={{ margin: 0 }}>
              All original content, database architecture, rating algorithms, comparison logic, text analyses, UI/UX designs, and software source code on <strong>EasternRun</strong> are the exclusive proprietary property of EasternRun (© 2026 EasternRun. All Rights Reserved). Unauthorized copying, web scraping, redistribution, or reverse engineering of this website’s proprietary structure without express written consent is strictly prohibited.
            </p>
          </div>

          {/* Section 2: Trademark & Image Ownership Disclaimer */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>
              2. Product Photography & Trademark Attribution
            </h3>
            <p style={{ margin: 0 }}>
              All brand names, product names, logos, registered trademarks, and official footwear photography featured on this platform belong to their respective copyright and trademark owners, including but not limited to <strong>Li-Ning Co. Ltd.</strong>, <strong>ANTA Sports Products Ltd.</strong>, and <strong>361 Degrees International Limited</strong>. EasternRun does not claim ownership or exclusive copyright over third-party product photography or manufacturer brand logos.
            </p>
          </div>

          {/* Section 3: Fair Use Declaration */}
          <div style={{ background: '#EFF6FF', padding: '16px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <AlertCircle size={16} color="#2563EB" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#1E40AF' }}>
                3. Fair Use & Non-Commercial Review Disclaimer
              </h3>
            </div>
            <p style={{ margin: 0, color: '#1E3A8A' }}>
              Product images are utilized strictly under the <strong>Fair Use Doctrine</strong> (17 U.S.C. § 107) for independent editorial review, non-commercial educational analysis, consumer commentary, and comparative database benchmark purposes. EasternRun is an independent athletic footwear lab database and is not affiliated with, sponsored by, or endorsed by any listed footwear manufacturer.
            </p>
          </div>

          {/* Section 4: DMCA Takedown & Rights Inquiries */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>
              4. DMCA Copyright & Takedown Requests
            </h3>
            <p style={{ margin: '0 0 10px 0' }}>
              If you are a copyright holder or authorized trademark representative and believe that any image or content hosted on this site infringes upon your copyright, please contact our legal team directly. We commit to reviewing and resolving valid takedown requests promptly.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              padding: '6px 12px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: '#0F172A'
            }}>
              <Mail size={14} color="#2563EB" />
              <span>Legal Contact: copyright@easternrun.com</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 18px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
