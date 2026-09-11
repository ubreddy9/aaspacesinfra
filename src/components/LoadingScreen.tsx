import { useEffect, useState } from "react";

/**
 * Cinematic PEB Loading Screen
 *
 * Animation sequence:
 * 0.0s — Screen appears (dark navy)
 * 0.2s — Horizontal chords draw left-to-right
 * 0.7s — Vertical columns rise top-to-bottom
 * 1.1s — Diagonal web members stroke in alternately
 * 2.0s — "AA SPACES" logotype fades in from below
 * 2.4s — Tagline letter-spaces in
 * 2.6s — Progress bar races to 100%
 * 3.0s — Entire screen scales & fades out
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("aa_loader_seen")) return;
    setVisible(true);
    const t1 = setTimeout(() => setExiting(true), 3000);
    const t2 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("aa_loader_seen", "1");
    }, 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loading-screen"
      className={exiting ? "exit" : ""}
      aria-hidden="true"
    >
      {/* Radial glow behind truss */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 460,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, hsl(28 95% 52% / 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ─── TRUSS SVG ─────────────────────────────────────────── */}
      <svg
        viewBox="0 0 500 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "min(500px, 88vw)", height: "auto", overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Outer glow filter */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Top chord (amber, draws left → right) ── */}
        <rect
          x="20" y="28" width="460" height="5"
          rx="2.5"
          fill="hsl(28 95% 58%)"
          filter="url(#glow)"
          style={{
            transformOrigin: "20px 28px",
            animation: "beam-h 0.7s cubic-bezier(0.22,1,0.36,1) forwards 0.1s",
            transform: "scaleX(0)",
          }}
        />

        {/* ── Bottom chord (amber, draws left → right) ── */}
        <rect
          x="20" y="147" width="460" height="5"
          rx="2.5"
          fill="hsl(28 95% 58%)"
          filter="url(#glow)"
          style={{
            transformOrigin: "20px 147px",
            animation: "beam-h 0.7s cubic-bezier(0.22,1,0.36,1) forwards 0.25s",
            transform: "scaleX(0)",
          }}
        />

        {/* ── Left column ── */}
        <rect
          x="20" y="28" width="5" height="119"
          rx="2.5"
          fill="hsl(215 72% 55%)"
          style={{
            transformOrigin: "20px 28px",
            animation: "beam-v 0.45s cubic-bezier(0.22,1,0.36,1) forwards 0.7s",
            transform: "scaleY(0)",
          }}
        />

        {/* ── Right column ── */}
        <rect
          x="475" y="28" width="5" height="119"
          rx="2.5"
          fill="hsl(215 72% 55%)"
          style={{
            transformOrigin: "475px 28px",
            animation: "beam-v 0.45s cubic-bezier(0.22,1,0.36,1) forwards 0.75s",
            transform: "scaleY(0)",
          }}
        />

        {/* ── Inner vertical posts ── */}
        {[115, 210, 305, 400].map((x, i) => (
          <rect
            key={x}
            x={x}
            y="28"
            width="4"
            height="119"
            rx="2"
            fill="hsl(215 72% 40%)"
            filter="url(#glow)"
            style={{
              transformOrigin: `${x}px 28px`,
              animation: `beam-v 0.38s cubic-bezier(0.22,1,0.36,1) forwards ${0.82 + i * 0.08}s`,
              transform: "scaleY(0)",
            }}
          />
        ))}

        {/* ── Diagonal web members ── */}
        {[
          { x1: 22,  y1: 30, x2: 113, y2: 150 },
          { x1: 117, y1: 30, x2: 208, y2: 150 },
          { x1: 212, y1: 30, x2: 303, y2: 150 },
          { x1: 307, y1: 30, x2: 398, y2: 150 },
          { x1: 402, y1: 30, x2: 473, y2: 150 },
          // Alternating direction
          { x1: 113, y1: 150, x2: 212, y2: 30 },
          { x1: 208, y1: 150, x2: 307, y2: 30 },
          { x1: 303, y1: 150, x2: 402, y2: 30 },
          { x1: 398, y1: 150, x2: 475, y2: 30 },
        ].map(({ x1, y1, x2, y2 }, i) => {
          const len = Math.hypot(x2 - x1, y2 - y1);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i < 5 ? "hsl(215 55% 65%)" : "hsl(28 85% 65%)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len}
              filter="url(#glow)"
              style={{
                animation: `beam-diag 0.4s ease forwards ${1.15 + i * 0.07}s`,
              }}
            />
          );
        })}

        {/* ── Truss glow animation overlay ── */}
        <rect
          x="20" y="25" width="460" height="130"
          rx="4"
          fill="none"
          stroke="hsl(28 95% 52% / 0.15)"
          strokeWidth="1"
          style={{ animation: "loader-glow 2s ease-in-out 1.8s infinite" }}
        />
      </svg>

      {/* ─── BRAND LOGOTYPE ─────────────────────────────────────── */}
      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          opacity: 0,
          animation: "logo-rise 0.75s cubic-bezier(0.22,1,0.36,1) forwards 2.0s",
        }}
      >
        {/* "AA SPACES" text (fallback if logo image missing) */}
        <img
          src="/airo-assets/images/logo/horizontal/dark"
          alt="AA Spaces"
          style={{
            height: 36,
            maxHeight: 36,
            width: "auto",
            maxWidth: 160,
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
          }}
          onError={(e) => {
            // Fallback to text if image 404s
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const sibling = e.currentTarget.nextElementSibling as HTMLElement;
            if (sibling) sibling.style.display = "block";
          }}
        />
        {/* Text fallback */}
        <div
          style={{
            display: "none",
            fontFamily: '"Sora", sans-serif',
            fontWeight: 800,
            fontSize: "1.8rem",
            letterSpacing: "0.06em",
            color: "#ffffff",
          }}
        >
          AA SPACES
        </div>

        {/* Tagline */}
        <p
          style={{
            marginTop: 10,
            fontSize: 10.5,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
            color: "hsl(28 95% 58%)",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            opacity: 0,
            animation: "tagline-in 0.8s ease forwards 2.4s",
          }}
        >
          Pre-Engineered Buildings
        </p>
      </div>

      {/* ─── PROGRESS BAR ──────────────────────────────────────── */}
      <div
        style={{
          marginTop: 36,
          width: "min(220px, 60vw)",
          height: 2,
          background: "hsl(215 40% 20%)",
          borderRadius: 999,
          overflow: "hidden",
          opacity: 0,
          animation: "logo-rise 0.5s ease forwards 2.5s",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, hsl(215 72% 45%), hsl(28 95% 58%))",
            borderRadius: 999,
            animation: "progress-bar 2.8s cubic-bezier(0.4,0,0.2,1) forwards 0.3s",
          }}
        />
      </div>

      {/* ─── INLINE KEYFRAME OVERRIDES FOR RECT ANIMATION ──────── */}
      <style>{`
        @keyframes loader-glow {
          0%, 100% { stroke: hsl(28 95% 52% / 0.1); }
          50%       { stroke: hsl(28 95% 52% / 0.4); }
        }
        @keyframes tagline-in {
          0%   { opacity: 0; letter-spacing: 0.6em; }
          100% { opacity: 1; letter-spacing: 0.22em; }
        }
        @keyframes beam-h {
          0%   { transform: scaleX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes beam-v {
          0%   { transform: scaleY(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes beam-diag {
          0%   { stroke-dashoffset: 300; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
