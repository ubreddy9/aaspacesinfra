import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Building2, 
  Weight, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react';
import type { Project } from '@/lib/projectStore';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestQuote: (project?: Project) => void;
}

export default function ProjectDetailModal({ project, onClose, onRequestQuote }: ProjectDetailModalProps) {
  if (!project) return null;

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    setActiveImgIdx(0);
  }, [project.id]);

  const nextImage = () => {
    setActiveImgIdx((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImgIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "hsl(194 70% 6% / 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            maxWidth: 780,
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            borderRadius: 22,
            boxShadow: "0 28px 72px hsl(194 70% 5% / 0.6)",
            border: "1px solid hsl(179 38% 75% / 0.3)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              background: "hsl(194 65% 12%)",
              borderBottom: "1px solid hsl(179 38% 75% / 0.18)",
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "hsl(42 54% 74%)",
                  background: "hsl(42 54% 74% / 0.14)",
                  border: "1px solid hsl(42 54% 74% / 0.3)",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                {project.code}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "hsl(180 20% 80%)" }}>
                {project.sector}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "hsl(194 50% 20%)",
                border: "1px solid hsl(179 38% 75% / 0.25)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(194 50% 26%)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(194 50% 20%)")}
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div style={{ overflowY: "auto", flex: 1, padding: "clamp(20px, 4vw, 32px)" }}>
            {/* Hero Image & Gallery Showcase */}
            <div
              style={{
                position: "relative",
                height: "clamp(240px, 40vh, 360px)",
                borderRadius: 16,
                overflow: "hidden",
                background: "hsl(194 65% 10%)",
                marginBottom: gallery.length > 1 ? 14 : 24,
                boxShadow: "0 10px 30px hsl(0 0% 0% / 0.15)",
              }}
            >
              <img
                key={gallery[activeImgIdx]}
                src={gallery[activeImgIdx]}
                alt={`${project.title} photo ${activeImgIdx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, hsl(194 70% 8% / 0.9) 0%, hsl(194 70% 8% / 0.2) 50%, transparent 80%)",
                }}
              />

              {/* Photo Counter Pill */}
              {gallery.length > 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "hsl(194 65% 12% / 0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid hsl(42 54% 74% / 0.4)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "hsl(42 54% 74%)",
                  }}
                >
                  <Camera size={12} /> Photo {activeImgIdx + 1} of {gallery.length}
                </div>
              )}

              {/* Prev / Next Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous photo"
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "hsl(194 65% 12% / 0.8)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid hsl(179 38% 75% / 0.3)",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(42 54% 74%)", e.currentTarget.style.color = "hsl(194 65% 15%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(194 65% 12% / 0.8)", e.currentTarget.style.color = "#fff")}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next photo"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "hsl(194 65% 12% / 0.8)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid hsl(179 38% 75% / 0.3)",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(42 54% 74%)", e.currentTarget.style.color = "hsl(194 65% 15%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(194 65% 12% / 0.8)", e.currentTarget.style.color = "#fff")}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Title & Client Overlay */}
              <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                {project.client && (
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: "hsl(42 54% 74%)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                    Client: {project.client}
                  </p>
                )}
                <h3
                  id="modal-project-title"
                  style={{
                    fontFamily: '"Sora", sans-serif',
                    fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  paddingBottom: 6,
                  marginBottom: 24,
                }}
              >
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    style={{
                      width: 76,
                      height: 52,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: activeImgIdx === idx ? "2px solid hsl(42 54% 74%)" : "1px solid hsl(180 20% 80%)",
                      opacity: activeImgIdx === idx ? 1 : 0.6,
                      cursor: "pointer",
                      padding: 0,
                      background: "none",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specifications Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
                background: "hsl(180 25% 97%)",
                border: "1px solid hsl(180 20% 88%)",
                borderRadius: 12,
                padding: "16px",
                marginBottom: 24,
              }}
            >
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "hsl(194 25% 45%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                  Location
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "hsl(194 65% 15%)" }}>
                  <MapPin size={13} color="hsl(194 68% 23%)" />
                  <span className="truncate">{project.location || "Hyderabad, Telangana"}</span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "hsl(194 25% 45%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                  Built-Up Area
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "hsl(194 65% 15%)" }}>
                  <Building2 size={13} color="hsl(194 68% 23%)" />
                  <span>{project.area || "Custom Span"}</span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "hsl(194 25% 45%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                  Structural Steel
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "hsl(194 65% 15%)" }}>
                  <Weight size={13} color="hsl(194 68% 23%)" />
                  <span>{project.tonnage || "E350 Grade"}</span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "hsl(194 25% 45%)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                  Turnkey Timeline
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "hsl(194 65% 15%)" }}>
                  <Clock size={13} color="hsl(194 68% 23%)" />
                  <span>{project.timeline || "Fast-Track"}</span>
                </div>
              </div>
            </div>

            {/* Narrative Overview */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "hsl(194 68% 23%)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8, fontFamily: '"Space Grotesk", sans-serif' }}>
                Engineering Overview
              </h4>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "hsl(215 25% 25%)" }}>
                {project.description}
              </p>
            </div>

            {/* Technical Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "hsl(194 68% 23%)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12, fontFamily: '"Space Grotesk", sans-serif' }}>
                  Structural & Execution Highlights
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        background: "hsl(180 20% 96%)",
                        padding: "10px 14px",
                        borderRadius: 8,
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: "hsl(194 65% 18%)",
                      }}
                    >
                      <CheckCircle2 size={16} color="hsl(194 68% 28%)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Design Standards & Request CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                paddingTop: 20,
                borderTop: "1px solid hsl(180 20% 88%)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "hsl(194 25% 45%)" }}>
                <ShieldCheck size={16} color="hsl(194 68% 28%)" />
                <span>Engineered to IS:800:2007 &amp; IS:875 (Part 3) Standards</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote(project);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)",
                  color: "hsl(194 65% 15%)",
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 18px hsl(42 54% 74% / 0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 24px hsl(42 54% 74% / 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 18px hsl(42 54% 74% / 0.35)";
                }}
              >
                Request Similar Project Proposal <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
