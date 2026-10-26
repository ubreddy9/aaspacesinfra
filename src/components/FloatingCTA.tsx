import { Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router';

const WHATSAPP_NUMBER = '918712207555'; // Replace with real number
const PHONE_NUMBER = '+91 87122 07555'; // Replace with real number

export default function FloatingCTA() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        right: 'clamp(14px, 3.5vw, 24px)',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Phone button — slides up when expanded */}
      <div
        style={{
          transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.7)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call AA Spaces"
          className="float-cta-btn"
          style={{
            background: 'hsl(215 72% 18%)',
            color: '#fff',
          }}
          title={PHONE_NUMBER}
        >
          <Phone size={20} />
        </a>
      </div>

      {/* WhatsApp button — always visible, with pulse ring */}
      <button
        className="float-cta-btn pulse-ring"
        aria-label={expanded ? 'Close contact options' : 'Contact via WhatsApp'}
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: '#25D366',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {expanded ? (
          <span style={{ fontSize: 22, lineHeight: 1, fontWeight: 700 }}>&times;</span>
        ) : (
          <MessageCircle size={22} fill="white" />
        )}
      </button>

      {/* WhatsApp link — shows below toggle when expanded */}
      <div
        style={{
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.8)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20AA%20Spaces%2C%20I%27d%20like%20to%20discuss%20a%20PEB%20project.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'hsl(var(--secondary) / 0.95)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 20px hsl(0 0% 0% / 0.25)',
            whiteSpace: 'nowrap',
          }}
        >
          <MessageCircle size={16} color="#25D366" fill="#25D366" />
          Chat with us
        </a>
      </div>
    </div>
  );
}

