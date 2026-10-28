import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export interface ClientData {
  id: string;
  name: string;
  sector: string;
  location: string;
  logo: string;
  project: string;
  testimonial: {
    quote: string;
    author: string;
    rating: number;
  };
}

export const CLIENTS_DATA: ClientData[] = [
  {
    id: 'azad',
    name: 'Azad Engineering',
    sector: 'Aerospace & Precision Manufacturing',
    location: 'Jeedimetla, Hyderabad',
    logo: '/assets/clients/azad-logo.png',
    project: '65,000 sq.ft Turnkey Facility in 48 Days',
    testimonial: {
      quote: "We are thoroughly impressed with the ability to deliver our 65,000 sq.ft facility within just 48 days. From civil works to final PEB structure, the team ensured flawless execution while adhering to our stringent aerospace standards.",
      author: 'Head of Operations',
      rating: 5
    }
  },
  {
    id: 'reliance',
    name: 'Reliance Retail',
    sector: 'Commercial Retail & Superstores',
    location: 'Tirupati (Adjacent to Temple)',
    logo: '/assets/clients/reliance-logo.png',
    project: 'Night-Shift Commercial Hypermarket (2.5 Months)',
    testimonial: {
      quote: "Executing a project next to the temple in a bustling market under night-only work constraints was no small feat. The dedication, planning & professionalism helped us complete the project on time without disrupting the surrounding activity.",
      author: 'Senior Project Manager',
      rating: 5
    }
  },
  {
    id: 'geekay',
    name: 'Geekay Wires Limited',
    sector: 'Heavy Galvanized Steel Wires',
    location: 'Wadiram, Telangana',
    logo: '/assets/clients/geekay-logo.png',
    project: '95,000 sq.ft Plant with 15T Crane Gantry',
    testimonial: {
      quote: "From prefab structural design to turnkey site execution, everything was delivered ahead of schedule. The automated fabrication quality and crane integration were outstanding.",
      author: 'Director of Manufacturing',
      rating: 5
    }
  },
  {
    id: 'shri-raj',
    name: 'Shri Raj Udyog Pvt Ltd',
    sector: 'Iron & Steel Integrated Mega Plant',
    location: 'Cherkurda, Hyderabad',
    logo: '/assets/clients/sri-raj-logo.png',
    project: '250,000 sq.ft Integrated Steel Plant (30T Cranes)',
    testimonial: {
      quote: "A dependable structural partner for heavy industrial sheds and mega facilities. Their engineering quality, erection speed, and post-completion accountability are unmatched in the PEB sector.",
      author: 'Managing Director',
      rating: 5
    }
  },
  {
    id: 'ananda',
    name: 'Ananda Convention Center',
    sector: 'Commercial & Convention Infrastructure',
    location: 'Hyderabad, Telangana',
    logo: '/assets/clients/ananda-logo.png',
    project: '70,000 sq.ft Clear-Span Grand Event Center',
    testimonial: {
      quote: "Delivered a top-class 45m+ clear-span structure that perfectly balances aesthetics and functionality for our convention center. The attention to detail and adherence to strict deadlines made the experience effortless.",
      author: 'Executive Director',
      rating: 5
    }
  },
  {
    id: 'parle',
    name: 'Vivala Amrit (Parle Agro Bailley)',
    sector: 'Food & Beverage Processing Hub',
    location: 'Hyderabad, Telangana',
    logo: '/assets/projects/vivala-01.jpg',
    project: '85,000 sq.ft Food-Grade Beverage Plant',
    testimonial: {
      quote: "A high-performance industrial facility built to strict hygienic and 24/7 continuous operational standards. The custom engineering, insulated panels, and rapid erection exceeded all benchmarks.",
      author: 'Plant Operations Head',
      rating: 5
    }
  },
  {
    id: 'devi',
    name: 'Devi Function Hall',
    sector: 'Grand Convention & Hospitality',
    location: 'Shankarpally, Hyderabad',
    logo: '/assets/projects/devi-01.jpg',
    project: '70,000 sq.ft Architectural Convention Facility',
    testimonial: {
      quote: "Delivered a spacious and fully customized clear-span structure tailored for high-traffic public events and grand gatherings, with a strong emphasis on structural durability and design flexibility.",
      author: 'Managing Trustee',
      rating: 5
    }
  }
];

export default function ClientsSection({ onOpenQuote }: { onOpenQuote?: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeClient = CLIENTS_DATA[activeIdx];

  return (
    <section style={{ background: "hsl(194 65% 10%)", padding: "88px 0", position: "relative", overflow: "hidden" }}>
      {/* Subtle ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(42 54% 74% / 0.08) 0%, hsl(179 38% 75% / 0.03) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="steel-grid" style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 56px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 16px",
              borderRadius: 999,
              background: "hsl(42 54% 74% / 0.14)",
              border: "1px solid hsl(42 54% 74% / 0.35)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "hsl(42 54% 74%)",
              fontFamily: '"Space Grotesk", sans-serif',
              marginBottom: 16,
            }}
          >
            <Award size={13} color="hsl(42 54% 74%)" /> Enterprise Trust & Performance
          </span>
          <h2
            style={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 800,
              fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Trusted by India’s Leading Industrial & Commercial Brands
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "hsl(180 20% 75%)", margin: "0 auto" }}>
            From high-tolerance aerospace manufacturing to fast-track commercial hypermarkets, AA Spaces delivers heavy-duty structural steel excellence on time and within budget.
          </p>
        </div>

        {/* Client Logos Strip */}
        <div
          style={{
            background: "hsl(194 60% 13% / 0.9)",
            border: "1px solid hsl(179 38% 75% / 0.2)",
            borderRadius: 18,
            padding: "24px 28px",
            marginBottom: 48,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 24,
            }}
          >
            {CLIENTS_DATA.map((client, idx) => (
              <button
                key={client.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                style={{
                  background: activeIdx === idx ? "hsl(42 54% 74% / 0.15)" : "transparent",
                  border: activeIdx === idx ? "1px solid hsl(42 54% 74% / 0.5)" : "1px solid transparent",
                  borderRadius: 12,
                  padding: "10px 18px",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: activeIdx === idx ? 1 : 0.65,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (activeIdx !== idx) e.currentTarget.style.opacity = "0.65";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: "#fff",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px hsl(0 0% 0% / 0.25)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
                    {client.name}
                  </p>
                  <p style={{ fontSize: 11, color: "hsl(42 54% 74%)", fontWeight: 600 }}>
                    {client.sector}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div
          style={{
            background: "linear-gradient(135deg, hsl(194 65% 14%) 0%, hsl(194 60% 11%) 100%)",
            border: "1px solid hsl(179 38% 75% / 0.22)",
            borderRadius: 20,
            padding: "clamp(24px, 5vw, 44px)",
            boxShadow: "0 16px 48px hsl(194 70% 5% / 0.45)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 340,
              height: 340,
              background: "radial-gradient(circle, hsl(42 54% 74% / 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="responsive-grid-2" style={{ alignItems: "center" }}>
            {/* Left: Testimonial Quote */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                {[...Array(activeClient.testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="hsl(42 54% 74%)" color="hsl(42 54% 74%)" />
                ))}
                <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(42 54% 74%)", marginLeft: 6 }}>
                  Verified Client Review
                </span>
              </div>

              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
                <Quote size={32} color="hsl(42 54% 74%)" style={{ flexShrink: 0, opacity: 0.8 }} />
                <p
                  style={{
                    fontFamily: '"Sora", sans-serif',
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    lineHeight: 1.6,
                    color: "#ffffff",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  &ldquo;{activeClient.testimonial.quote}&rdquo;
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "hsl(42 54% 74%)", letterSpacing: "0.01em" }}>
                    {activeClient.testimonial.author}
                  </h4>
                  <p style={{ fontSize: 13, color: "hsl(180 20% 75%)" }}>
                    {activeClient.name} &bull; <MapPin size={12} style={{ display: "inline", verticalAlign: "middle" }} /> {activeClient.location}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setActiveIdx((prev) => (prev - 1 + CLIENTS_DATA.length) % CLIENTS_DATA.length)}
                    aria-label="Previous testimonial"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "hsl(194 50% 20%)",
                      border: "1px solid hsl(179 38% 75% / 0.3)",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIdx((prev) => (prev + 1) % CLIENTS_DATA.length)}
                    aria-label="Next testimonial"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "hsl(194 50% 20%)",
                      border: "1px solid hsl(179 38% 75% / 0.3)",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Structural Execution Highlight */}
            <div
              style={{
                background: "hsl(194 60% 12% / 0.95)",
                border: "1px solid hsl(179 38% 75% / 0.25)",
                borderRadius: 16,
                padding: "28px 26px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: "hsl(42 54% 74% / 0.2)",
                    border: "1px solid hsl(42 54% 74% / 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShieldCheck size={18} color="hsl(42 54% 74%)" />
                </div>
                <div>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: "hsl(42 54% 74%)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Project Delivery Benchmark
                  </p>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                    {activeClient.project}
                  </h4>
                </div>
              </div>

              <div style={{ borderTop: "1px solid hsl(179 38% 75% / 0.15)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "hsl(180 20% 88%)" }}>
                  <CheckCircle2 size={15} color="hsl(42 54% 74%)" style={{ flexShrink: 0 }} />
                  <span>Tekla 3D Detailing & Built-Up Submerged Arc Welding</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "hsl(180 20% 88%)" }}>
                  <CheckCircle2 size={15} color="hsl(42 54% 74%)" style={{ flexShrink: 0 }} />
                  <span>100% In-House Medak Plant Fabrication QA</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "hsl(180 20% 88%)" }}>
                  <CheckCircle2 size={15} color="hsl(42 54% 74%)" style={{ flexShrink: 0 }} />
                  <span>Zero Incident On-Site Turnkey Erection</span>
                </div>
              </div>

              {onOpenQuote && (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  style={{
                    marginTop: 20,
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "12px 20px",
                    borderRadius: 9,
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
