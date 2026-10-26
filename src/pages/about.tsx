import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { about } from "virtual:content";
import AnimatedCounter from "@/components/AnimatedCounter";

const site = "https://aaspacesinfra.com";
const url = `${site}/about`;
const title = "About AA Spaces | Pre-Engineered Buildings";
const description = "Learn how AA Spaces approaches pre-engineered buildings through quality, coordinated delivery and project-led support across India.";
const jsonLd = { "@context": "https://schema.org", "@type": "AboutPage", "@id": `${url}#webpage`, name: title, url, isPartOf: { "@id": `${site}/#website` }, about: { "@id": `${site}/#organization` } };
const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: "easeOut" as const } };

const footprintStats = [
  { value: 500, suffix: "+", label: "Projects" },
  { value: 20, suffix: "M+", label: "Sq Ft" },
  { value: 15, suffix: "+", label: "States" },
  { value: 12, suffix: "+", label: "Years" },
];

export default function AboutPage() {
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
        <meta property="og:image" content={`${site}https://aaspacesinfra.com/assets/brand/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}https://aaspacesinfra.com/assets/brand/logo.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>
      <main>
        {/* Hero */}
        <section
          style={{
            position: "relative", minHeight: "52vh",
            display: "flex", alignItems: "flex-end",
            background: "hsl(215 40% 7%)", overflow: "hidden",
          }}
        >
          <img
            src="/airo-assets/images/pages/home/capabilities-commercial"
            alt="Commercial building exterior"
            width={1400}
            height={1000}
            loading="eager"
            fetchPriority="high"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(215 40% 7%) 0%, hsl(215 40% 7% / 0.65) 40%, hsl(215 40% 7% / 0.25) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, width: "100%", margin: "0 auto", padding: "48px 32px 56px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{about.hero.eyebrow}</span>
              <h1 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05, color: "#fff", marginTop: 12, marginBottom: 16, maxWidth: 680 }}>
                {about.hero.title}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "hsl(0 0% 100% / 0.65)", maxWidth: 520 }}>{about.hero.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section style={{ background: "hsl(var(--background))", padding: "80px 0" }}>
          <div className="site-container responsive-grid-2" style={{ alignItems: "start" }}>
            <motion.div {...reveal}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{about.story.eyebrow}</span>
            </motion.div>
            <motion.div {...reveal}>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, marginBottom: 28 }}>{about.story.title}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {about.story.body.map((paragraph: { id: string; text: string }) => (
                  <p key={paragraph.id} style={{ fontSize: 15, lineHeight: 1.85, color: "hsl(var(--muted-foreground))" }}>{paragraph.text}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Commitments */}
        <section style={{ background: "hsl(var(--muted))", padding: "80px 0" }}>
          <div className="site-container">
            <motion.div {...reveal} style={{ marginBottom: 48, maxWidth: 640 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{about.commitments.eyebrow}</span>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, marginTop: 12 }}>{about.commitments.title}</h2>
            </motion.div>
            <div className="responsive-grid-cards">
              {about.commitments.items.map((item: { number: string; title: string; detail: string }, i: number) => (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.1 }}
                  key={item.number}
                  className="glass-card"
                  style={{ padding: "28px" }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "hsl(20 62% 38% / 0.1)", border: "1px solid hsl(20 62% 38% / 0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <CheckCircle2 size={18} color="hsl(215 72% 18%)" />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{item.number}</p>
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.25rem", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Footprint stats */}
        <section className="steel-grid" style={{ padding: "72px 0" }}>
          <div className="site-container">
            <motion.div {...reveal} style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{about.footprint.eyebrow}</span>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#fff", lineHeight: 1.1, marginTop: 12 }}>{about.footprint.title}</h2>
              <p style={{ fontSize: 15, color: "hsl(0 0% 100% / 0.55)", maxWidth: 560, margin: "16px auto 0" }}>{about.footprint.description}</p>
            </motion.div>
            <div className="responsive-grid-4">
              {footprintStats.map((stat, i) => (
                <motion.div
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.12 }}
                  key={stat.label}
                  style={{
                    textAlign: "center", padding: "40px 24px",
                    borderRight: i < footprintStats.length - 1 ? "1px solid hsl(0 0% 100% / 0.07)" : "none",
                  }}
                >
                  <div style={{ fontFamily: '"Sora", sans-serif', fontSize: "3rem", color: "#fff", marginBottom: 8 }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "hsl(28 95% 58%)" }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section style={{ background: "hsl(210 20% 97%)", padding: "96px 0" }}>
          <div className="site-container">
            {/* Section header */}
            <motion.div {...reveal} style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{
                display: "inline-block", fontSize: 11, fontWeight: 700,
                color: "hsl(215 72% 38%)", letterSpacing: "0.14em",
                textTransform: "uppercase", background: "hsl(215 72% 18% / 0.08)",
                border: "1px solid hsl(215 72% 18% / 0.15)",
                padding: "5px 16px", borderRadius: 999, marginBottom: 18,
              }}>
                Executive Leadership
              </span>
              <h2 style={{
                fontFamily: '"Sora", sans-serif',
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800, color: "hsl(215 40% 12%)",
                letterSpacing: "-0.02em", marginBottom: 16,
              }}>
                Meet Our Team
              </h2>
              <p style={{
                fontSize: 16, color: "hsl(215 20% 45%)",
                maxWidth: 520, margin: "0 auto", lineHeight: 1.7,
              }}>
                Decades of structural engineering expertise and on-site project leadership - the people behind every AA Spaces structure.
              </p>
            </motion.div>

            {/* Team cards */}
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
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 8px 36px hsl(194 65% 15% / 0.08)",
                    border: "1px solid hsl(180 20% 88%)",
                    display: "flex", flexDirection: "column",
                  }}
                >
                  {/* Photo - tall portrait */}
                  <div style={{ position: "relative", height: 340, overflow: "hidden", background: "hsl(215 20% 92%)" }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                    />
                    {/* Experience badge over photo */}
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
                    {/* Gradient fade at bottom */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                      background: "linear-gradient(to top, #fff, transparent)",
                    }} />
                  </div>

                  {/* Card body - name, role, email only */}
                  <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <h3 style={{
                        fontFamily: '"Sora", sans-serif',
                        fontSize: "1.15rem", fontWeight: 800,
                        color: "hsl(215 40% 12%)", marginBottom: 4,
                      }}>
                        {member.name}
                      </h3>
                      <p style={{ fontSize: 13, fontWeight: 700, color: member.accent, marginBottom: 2 }}>
                        {member.role}
                      </p>
                      {member.qualification && (
                        <p style={{ fontSize: 12, color: "hsl(215 20% 55%)", fontWeight: 500 }}>
                          {member.qualification}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <a
                      href={`mailto:${member.email}`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontSize: 13, fontWeight: 600,
                        color: "hsl(215 72% 38%)", textDecoration: "none",
                        padding: "10px 16px", borderRadius: 10,
                        background: "hsl(215 72% 18% / 0.06)",
                        border: "1px solid hsl(215 72% 18% / 0.12)",
                        transition: "background 0.2s",
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

        {/* CTA */}
        <section style={{
          background: "linear-gradient(135deg, hsl(215 38% 12%) 0%, hsl(215 32% 16%) 50%, hsl(28 35% 13%) 100%)",
          padding: "80px 0",
          borderTop: "1px solid hsl(215 30% 20%)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-40%",
            right: "0%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(28 65% 50% / 0.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />
          <div className="steel-grid" style={{ position: "absolute", inset: 0, opacity: 0.18, pointerEvents: "none" }} />
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <motion.div {...reveal} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 28 }}>
              <div style={{ maxWidth: 640 }}>
                <span style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "hsl(28 65% 58%)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "hsl(28 65% 50% / 0.12)",
                  border: "1px solid hsl(28 65% 50% / 0.25)",
                  padding: "4px 14px",
                  borderRadius: 999,
                  marginBottom: 14,
                  fontFamily: '"Space Grotesk", sans-serif'
                }}>
                  {about.cta.eyebrow}
                </span>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 14, letterSpacing: "-0.02em" }}>
                  {about.cta.title}
                </h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "hsl(215 20% 70%)" }}>
                  {about.cta.description}
                </p>
              </div>
              <Link
                to="/proposal"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 32px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, hsl(28 68% 52%) 0%, hsl(28 75% 46%) 100%)",
                  color: "#fff",
                  fontSize: 14.5,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.25s",
                  whiteSpace: "nowrap",
                  boxShadow: "0 6px 28px hsl(28 68% 50% / 0.45)"
                }}
                className="hover:-translate-y-0.5"
              >
                {about.cta.button} <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}



