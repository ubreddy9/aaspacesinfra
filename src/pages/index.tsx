import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, MapPin, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { home } from "virtual:content";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getActiveProjects, type Project } from "@/lib/projectStore";

const site = "https://aaspacesinfra.com";
const url = `${site}/`;
const title = "Pre-Engineered Building Solutions | AA Spaces Infra";
const description = "AA Spaces delivers precision-engineered steel building solutions for warehouse, industrial, commercial, and hospitality projects across India.";


// Organization JSON-LD - tells Google to show the logo in search results
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aaspacesinfra.com/#organization",
  name: "AA Spaces Infra",
  url: "https://aaspacesinfra.com",
  logo: {
    "@type": "ImageObject",
    url: "https://aaspacesinfra.com/assets/brand/logo.png",
    width: 1063,
    height: 508,
  },
  image: "https://aaspacesinfra.com/assets/brand/logo.png",
  email: "info@aaspacesinfra.com",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "M+", label: "Sq Ft Constructed" },
  { value: 15, suffix: "+", label: "States Across India" },
  { value: 12, suffix: "+", label: "Years of Expertise" },
];

const trustMarquee = [
  "IS:800 Certified", "Earthquake Resistant", "Wind Rated Design", "Fast Erection",
  "Clear-Span Frames", "Crane-Ready Bays", "Energy Efficient Cladding", "Turnkey Delivery",
  "IS:800 Certified", "Earthquake Resistant", "Wind Rated Design", "Fast Erection",
  "Clear-Span Frames", "Crane-Ready Bays", "Energy Efficient Cladding", "Turnkey Delivery",
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
    const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    getActiveProjects().then((list) => setProjects(list.slice(0, 4)));
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://aaspacesinfra.com/assets/brand/logo.png" />
        <meta property="og:image:width" content="1063" />
        <meta property="og:image:height" content="508" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aaspacesinfra.com/assets/brand/logo.png" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd).replace(/</g, "\u003c")}</script>
      </Helmet>
      <main>
        {/* HERO */}
        <section ref={heroRef} style={{ position: "relative", minHeight: "94vh", overflow: "hidden", display: "flex", alignItems: "center", background: "hsl(215 40% 7%)" }}>
          {/* Parallax image */}
          <motion.div style={{ y: heroY, opacity: heroOpacity, position: "absolute", inset: 0 }}>
            <img
              src="/airo-assets/images/pages/home/hero"
              alt="Pre-engineered steel warehouse"
              width={1920} height={1080}
              loading="eager" fetchPriority="high"
              style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center" }}
            />
            {/* Gradient overlays */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, hsl(215 40% 7% / 0.96) 0%, hsl(215 40% 7% / 0.72) 45%, hsl(215 40% 7% / 0.35) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(215 40% 7%) 0%, transparent 55%)" }} />
          </motion.div>

          {/* Amber accent glow in BG */}
          <div style={{ position: "absolute", top: "30%", left: "5%", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, hsl(28 95% 52% / 0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Content */}
          <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 760 }}>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "6px 14px", borderRadius: 999,
                  background: "hsl(28 95% 52% / 0.12)",
                  border: "1px solid hsl(28 95% 52% / 0.3)",
                  fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "hsl(42 54% 74%)",
                  marginBottom: 28, fontFamily: '"Space Grotesk", sans-serif',
                }}>
                  <Star size={11} fill="hsl(28 95% 62%)" />
                  India&apos;s Trusted PEB Partner
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 5.5vw, 4.8rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  marginBottom: 28,
                }}
              >
                {home.hero.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.8, color: "hsl(215 20% 65%)", maxWidth: 580, marginBottom: 44 }}
              >
                {home.hero.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
              >
                <Link
                  to="/proposal"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 30px", borderRadius: 10,
                    background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)", color: "hsl(194 65% 15%)", fontSize: 14, fontWeight: 700,
                    textDecoration: "none", letterSpacing: "0.01em",
                    transition: "all 0.25s",
                    boxShadow: "0 4px 24px hsl(42 54% 74% / 0.35)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, hsl(42 54% 78%) 0%, hsl(42 50% 68%) 100%)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px hsl(28 95% 52% / 0.55)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px hsl(28 95% 52% / 0.45)"; }}
                >
                  {home.hero.cta} <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/projects"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 28px", borderRadius: 10,
                    background: "hsl(194 60% 16% / 0.8)", border: "1px solid hsl(179 38% 75% / 0.3)", color: "hsl(180 20% 92%)", fontSize: 14, fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(215 40% 22%)"; e.currentTarget.style.borderColor = "hsl(215 35% 35%)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(215 40% 18%)"; e.currentTarget.style.borderColor = "hsl(215 35% 28%)"; e.currentTarget.style.color = "hsl(215 15% 85%)"; }}
                >
                  View Projects <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* Rail trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              style={{ marginTop: "clamp(32px, 6vh, 48px)", display: "flex", flexWrap: "wrap", gap: 8 }}
            >
              {home.hero.rail.map((item: string) => (
                <span key={item} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 8,
                  background: "hsl(215 40% 13%)",
                  border: "1px solid hsl(215 35% 22%)",
                  fontSize: 11.5, fontWeight: 600, color: "hsl(215 20% 68%)",
                  fontFamily: '"Space Grotesk", sans-serif',
                }}>
                  <CheckCircle2 size={11} color="hsl(28 95% 55%)" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ background: "hsl(194 60% 12%)", borderTop: "1px solid hsl(179 38% 75% / 0.15)", borderBottom: "1px solid hsl(179 38% 75% / 0.15)", padding: "13px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            {trustMarquee.map((item, i) => (
              <span key={i} style={{ padding: "0 32px", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: i % 2 === 0 ? "hsl(42 54% 74%)" : "hsl(180 20% 45%)", whiteSpace: "nowrap" }}>
                {i % 2 === 0 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(42 54% 74%)", display: "inline-block", marginRight: 8 }} />}{item}
              </span>
            ))}
          </div>
        </div>

        {/* SECTORS */}
        <section style={{ background: "hsl(210 20% 97%)", padding: "88px 0" }}>
          <div className="site-container">
            <motion.div {...reveal} style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(194 68% 23%)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, fontFamily: '"Space Grotesk", sans-serif' }}>
                What We Build
              </p>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "hsl(215 35% 12%)", maxWidth: 600 }}>
                Practical building systems. Clear project thinking.
              </h2>
            </motion.div>

            <div className="responsive-grid-cards">
              {home.sectors.map((sector: { number: string; name: string; detail: string }, i: number) => (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.1 }}
                  key={sector.number}
                  className="glass-card interactive-card"
                  style={{ padding: "32px" }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  {/* Number badge */}
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "hsl(194 65% 23% / 0.08)", border: "1px solid hsl(179 38% 75% / 0.3)", marginBottom: 22 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "hsl(194 68% 23%)", fontFamily: '"Sora", sans-serif' }}>{sector.number}</span>
                  </div>
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em", color: "hsl(215 35% 12%)", marginBottom: 12 }}>{sector.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "hsl(215 15% 48%)", marginBottom: 22 }}>{sector.detail}</p>
                  <Link to="/capabilities" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "hsl(194 68% 28%)", textDecoration: "none" }}>
                    Explore <ChevronRight size={14} />
                  </Link>
                </motion.article>
              ))}

              {/* CTA card */}
              <motion.article
                {...reveal}
                transition={{ ...reveal.transition, delay: home.sectors.length * 0.1 }}
                style={{ padding: "32px", borderRadius: 16, background: "linear-gradient(135deg, hsl(194 68% 23%) 0%, hsl(194 60% 14%) 100%)", border: "1px solid hsl(179 38% 75% / 0.25)", position: "relative", overflow: "hidden" }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className="stripe-accent" style={{ position: "absolute", inset: 0, borderRadius: "inherit" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(42 54% 74% / 0.2)", border: "1px solid hsl(42 54% 74% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                    <ArrowUpRight size={18} color="hsl(28 95% 62%)" />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(42 54% 74%)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: '"Space Grotesk", sans-serif' }}>From brief to build</p>
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>Coordinated approach for every stage.</h3>
                  <Link to="/proposal" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "hsl(42 54% 74%)", textDecoration: "none", marginTop: 8 }}>
                    Start conversation <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="steel-grid" style={{ padding: "80px 0" }}>
          <div className="site-container">
            <div className="responsive-grid-4" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid hsl(179 38% 75% / 0.18)" }}>
              {stats.map((s, i) => (
                <motion.div
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.12 }}
                  key={s.label}
                  style={{
                    padding: "48px 32px",
                    textAlign: "center",
                    borderRight: i < stats.length - 1 ? "1px solid hsl(179 38% 75% / 0.12)" : "none", background: "hsl(194 62% 11%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle amber top border on hover */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: i === 0 ? "hsl(42 54% 74%)" : "transparent" }} />
                  <div style={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: "clamp(2.6rem, 4vw, 3.8rem)", lineHeight: 1, color: "#fff", letterSpacing: "-0.04em", marginBottom: 10 }}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} duration={1800} />
                  </div>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: "hsl(215 25% 45%)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: '"Space Grotesk", sans-serif' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APPROACH / PROCESS */}
        <section style={{ background: "hsl(210 20% 97%)", padding: "88px 0" }}>
          <div className="site-container">
            <div className="responsive-grid-2" style={{ alignItems: "start" }}>
              <motion.div {...reveal}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(194 68% 23%)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, fontFamily: '"Space Grotesk", sans-serif' }}>{home.approach.eyebrow}</p>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: "clamp(1.9rem, 3vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20, color: "hsl(215 35% 12%)" }}>{home.approach.title}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "hsl(215 15% 45%)", marginBottom: 32 }}>
                  Our delivery approach connects every stage &mdash; from the initial brief to the completed structure &mdash; with one coordinated team.
                </p>
                <Link
                  to="/capabilities"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 9, background: "hsl(215 72% 18%)", color: "#fff", fontSize: 13.5, fontWeight: 700, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(215 72% 22%)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(215 72% 18%)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  How we work <ArrowRight size={15} />
                </Link>
              </motion.div>

              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {home.approach.steps.map((step: { number: string; title: string; text: string }, i: number) => (
                  <motion.li
                    {...reveal}
                    transition={{ ...reveal.transition, delay: i * 0.12 }}
                    key={step.number}
                    style={{ display: "flex", gap: 18, paddingBottom: 32, position: "relative" }}
                  >
                    {i < home.approach.steps.length - 1 && (
                      <div style={{ position: "absolute", left: 17, top: 44, bottom: 0, width: 1, background: "linear-gradient(to bottom, hsl(215 72% 35%), transparent)" }} />
                    )}
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "hsl(28 95% 52%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0, position: "relative", zIndex: 1, fontFamily: '"Sora", sans-serif' }}>
                      {step.number}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em", marginBottom: 6, color: "hsl(215 35% 12%)" }}>{step.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "hsl(215 15% 48%)" }}>{step.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section style={{ background: "hsl(215 35% 10%)", padding: "88px 0" }}>
          <div className="site-container">
            <motion.div {...reveal} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(42 54% 74%)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, fontFamily: '"Space Grotesk", sans-serif' }}>{home.gallery.eyebrow}</p>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, fontSize: "clamp(1.9rem, 3vw, 2.8rem)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05 }}>{home.gallery.title}</h2>
              </div>
              <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "hsl(215 25% 60%)", textDecoration: "none", padding: "9px 18px", borderRadius: 9, border: "1px solid hsl(215 35% 20%)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "hsl(215 35% 32%)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "hsl(215 25% 60%)"; e.currentTarget.style.borderColor = "hsl(215 35% 20%)"; }}
              >
                All projects <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="responsive-grid-cards">
              {projects.map((project, i) => (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.1 }}
                  key={project.id}
                  className="interactive-card"
                  style={{
                    margin: 0,
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "hsl(194 65% 14%)",
                    border: "1px solid hsl(179 38% 75% / 0.18)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Studio Image Header */}
                  <div style={{ position: "relative", height: 230, overflow: "hidden", background: "hsl(194 60% 10%)" }}>
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={900}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      whileHover={{ scale: 1.06, transition: { duration: 0.45 } }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(194 65% 14% / 0.8) 0%, transparent 40%)" }} />
                    <span style={{
                      position: "absolute", top: 14, left: 14,
                      padding: "4px 12px", borderRadius: 999,
                      background: "hsl(194 65% 10% / 0.8)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid hsl(42 54% 74% / 0.35)",
                      fontSize: 10.5, fontWeight: 700,
                      color: "hsl(42 54% 74%)",
                      letterSpacing: "0.1em", textTransform: "uppercase"
                    }}>
                      {project.sector}
                    </span>
                  </div>

                  {/* Studio Case Body */}
                  <div style={{ padding: "22px 24px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "hsl(42 54% 74%)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: '"Space Grotesk", sans-serif' }}>
                          {project.code}
                        </span>
                        {project.area && (
                          <span style={{ fontSize: 11, fontWeight: 600, color: "hsl(179 38% 75%)", background: "hsl(179 38% 75% / 0.1)", padding: "2px 8px", borderRadius: 4 }}>
                            {project.area}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.01em", color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>
                        {project.title}
                      </h3>
                      {project.location && (
                        <p style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "hsl(179 38% 75% / 0.85)", marginBottom: 16 }}>
                          <MapPin size={12} color="hsl(42 54% 74%)" /> {project.location}
                        </p>
                      )}
                    </div>

                    <Link
                      to="/projects"
                      className="interactive-arrow"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: "hsl(42 54% 74%)",
                        textDecoration: "none",
                        paddingTop: 12,
                        borderTop: "1px solid hsl(179 38% 75% / 0.12)",
                      }}
                    >
                      View Project Specs <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section style={{ background: "hsl(210 20% 97%)", padding: "96px 0" }}>
          <div className="site-container">
            {/* Header */}
            <motion.div {...reveal} style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{
                display: "inline-block", fontSize: 11, fontWeight: 700,
                color: "hsl(215 72% 38%)", letterSpacing: "0.14em",
                textTransform: "uppercase", background: "hsl(194 65% 23% / 0.08)", border: "1px solid hsl(179 38% 75% / 0.3)",
                padding: "5px 16px", borderRadius: 999, marginBottom: 18,
              }}>Executive Leadership</span>
              <h2 style={{
                fontFamily: '"Sora", sans-serif',
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800, color: "hsl(215 40% 12%)",
                letterSpacing: "-0.02em", marginBottom: 16,
              }}>
                Meet Our Team
              </h2>
              <p style={{ fontSize: 16, color: "hsl(215 20% 45%)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                The people behind every AA Spaces structure - decades of expertise, precision, and trust.
              </p>
            </motion.div>

            {/* Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 360px))", gap: 24, justifyContent: "center",
            }}>
              {[
                {
                  name: "Mr. B. Upender Reddy",
                  role: "Managing Director",
                  experience: "28+ Years",
                  email: "info@aaspacesinfra.com",
                  photo: "/assets/team/upender-reddy.jpg",
                  accent: "hsl(42 54% 74%)",
                  qualification: "",
                },
                {
                  name: "Mr. Ch. Gangadhar",
                  role: "Executive Director",
                  qualification: "M.Tech. Structures",
                  experience: "10+ Years",
                  email: "info@aaspacesinfra.com",
                  photo: "/assets/team/gangadhar.jpg",
                  accent: "hsl(179 45% 55%)",
                },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  style={{
                    borderRadius: 24, overflow: "hidden", background: "#fff",
                    boxShadow: "0 8px 40px hsl(215 40% 18% / 0.13)",
                    border: "1px solid hsl(215 18% 90%)",
                    display: "flex", flexDirection: "column",
                  }}
                >
                  {/* Photo */}
                  <div style={{ position: "relative", height: 340, overflow: "hidden", background: "hsl(215 20% 92%)" }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                    />
                    {/* Experience badge */}
                    <div style={{
                      position: "absolute", top: 16, left: 16,
                      background: "hsl(215 40% 7% / 0.65)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid hsl(0 0% 100% / 0.18)",
                      borderRadius: 999, padding: "5px 14px",
                      fontSize: 11.5, fontWeight: 700, color: "#fff",
                      letterSpacing: "0.05em",
                    }}>
                      {member.experience}
                    </div>
                    {/* Bottom fade */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                      background: "linear-gradient(to top, #fff, transparent)",
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.15rem", fontWeight: 800, color: "hsl(215 40% 12%)", marginBottom: 4 }}>
                        {member.name}
                      </h3>
                      <p style={{ fontSize: 13, fontWeight: 700, color: member.accent, marginBottom: 2 }}>
                        {member.role}
                      </p>
                      {member.qualification && (
                        <p style={{ fontSize: 12, color: "hsl(215 20% 55%)", fontWeight: 500 }}>{member.qualification}</p>
                      )}
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontSize: 13, fontWeight: 600, color: "hsl(215 72% 38%)",
                        textDecoration: "none", padding: "10px 16px", borderRadius: 10,
                        background: "hsl(215 72% 18% / 0.06)",
                        border: "1px solid hsl(215 72% 18% / 0.12)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      {member.email}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{
          background: "linear-gradient(135deg, hsl(215 38% 12%) 0%, hsl(215 32% 16%) 50%, hsl(28 35% 13%) 100%)",
          padding: "96px 0",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid hsl(215 30% 20%)"
        }}>
          {/* Ambient copper glow */}
          <div style={{
            position: "absolute",
            top: "-20%",
            right: "0%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(28 65% 50% / 0.16) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />
          <div className="steel-grid" style={{ position: "absolute", inset: 0, opacity: 0.18, pointerEvents: "none" }} />
          
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
            <div className="responsive-grid-cta" style={{ alignItems: "center" }}>
              <motion.div {...reveal}>
                <span style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "hsl(28 65% 58%)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "hsl(28 65% 50% / 0.12)",
                  border: "1px solid hsl(28 65% 50% / 0.25)",
                  padding: "5px 14px",
                  borderRadius: 999,
                  marginBottom: 16,
                  fontFamily: '"Space Grotesk", sans-serif'
                }}>
                  {home.cta.eyebrow}
                </span>
                <h2 style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginBottom: 16
                }}>
                  {home.cta.title}
                </h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "hsl(215 20% 70%)", maxWidth: 540, marginBottom: 36 }}>
                  {home.cta.description}
                </p>
                <Link
                  to="/proposal"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "15px 34px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, hsl(28 68% 52%) 0%, hsl(28 75% 46%) 100%)",
                    color: "#fff",
                    fontSize: 14.5,
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "all 0.25s",
                    boxShadow: "0 6px 28px hsl(28 68% 50% / 0.45)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 36px hsl(28 68% 50% / 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 28px hsl(28 68% 50% / 0.45)";
                  }}
                >
                  {home.cta.button} <ArrowUpRight size={17} />
                </Link>
              </motion.div>

              <motion.div {...reveal} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Scope-led project conversation", "Integrated structural thinking", "Clear path to proposal", "Site-specific engineering"].map((item) => (
                  <div key={item} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 20px",
                    borderRadius: 12,
                    background: "hsl(215 35% 15% / 0.7)",
                    border: "1px solid hsl(215 30% 24%)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 20px hsl(215 40% 6% / 0.3)"
                  }}>
                    <CheckCircle2 size={18} color="hsl(28 65% 58%)" />
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: "#fff" }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}






