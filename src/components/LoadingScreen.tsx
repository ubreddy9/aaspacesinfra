import { useEffect, useState } from "react";

/**
 * Architectural Luxury Loading Screen
 *
 * Fast, decisive, executive presentation:
 * - Large, crisp AA Spaces Infra brand insignia
 * - Subtle ambient architectural lighting
 * - Precision engineering beam progress bar
 * - Completes in ~1.7s without holding the visitor hostage
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem("aa_loader_seen")) return;
    setVisible(true);

    const t1 = setTimeout(() => setExiting(true), 1300);
    const t2 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("aa_loader_seen", "1");
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loading-screen"
      className={exiting ? "exit" : ""}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "hsl(194 65% 9%)",
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.02)" : "scale(1)",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Ambient architectural atmosphere glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 520,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(42 54% 74% / 0.12) 0%, hsl(179 38% 75% / 0.04) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle fine steel-grid watermark */}
      <div
        className="steel-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      {/* Main Brand Presentation */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Large, Commanding AA Spaces Infra Logo */}
        <div
          style={{
            animation: "loader-logo-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            filter: "drop-shadow(0 12px 36px hsl(194 70% 5% / 0.6))",
          }}
        >
          <img
            src="/assets/brand/logo-light.png"
            alt="AA Spaces Infra"
            style={{
              height: 105,
              maxHeight: 115,
              width: "auto",
              maxWidth: 380,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Tracked Architectural Tagline */}
        <p
          style={{
            marginTop: 22,
            fontSize: "clamp(9px, 2.5vw, 11px)",
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            color: "hsl(42 54% 74%)",
            textTransform: "uppercase",
            letterSpacing: "clamp(0.12em, 2vw, 0.22em)",
            padding: "0 16px",
            maxWidth: "90vw",
            animation: "loader-sub-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both",
          }}
        >
          Pre-Engineered Steel Infrastructure
        </p>

        {/* Precision Engineering Beam Progress Line */}
        <div
          style={{
            marginTop: 32,
            width: "min(220px, 65vw)",
            height: 2,
            background: "hsl(194 40% 18%)",
            borderRadius: 999,
            overflow: "hidden",
            position: "relative",
            animation: "loader-sub-reveal 0.8s ease 0.25s both",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              background: "linear-gradient(90deg, hsl(179 38% 75%), hsl(42 54% 74%), hsl(179 38% 75%))",
              borderRadius: 999,
              animation: "precision-beam 1.25s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-logo-reveal {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes loader-sub-reveal {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes precision-beam {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}