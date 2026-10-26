import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { capabilities } from "virtual:content";

const site = "https://aaspacesinfra.com";
const url = `${site}/capabilities`;
const title = "PEB Products & Services | AA Spaces";
const description = "AA Spaces provides coordinated pre-engineered building services shaped around site, sector and operational needs.";
const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, name: title, url, isPartOf: { "@id": `${site}/#website` }, about: { "@id": `${site}/#organization` } };
const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: "easeOut" as const } };

export default function CapabilitiesPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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
            src="https://aaspacesinfra.com/assets/brand/logo.png"
            alt="Pre-engineered warehouse steel exterior"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(215 40% 7%) 0%, hsl(215 40% 7% / 0.65) 40%, hsl(215 40% 7% / 0.2) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, width: "100%", margin: "0 auto", padding: "48px 32px 56px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{capabilities.hero.eyebrow}</span>
              <h1 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05, color: "#fff", marginTop: 12, marginBottom: 16, maxWidth: 700 }}>
                {capabilities.hero.title}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "hsl(0 0% 100% / 0.65)", maxWidth: 540 }}>{capabilities.hero.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section style={{ background: "hsl(var(--background))", padding: "80px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
            <motion.div {...reveal} style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Integrated service</span>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.1, marginTop: 12, maxWidth: 640 }}>
                The decisions that make a building work are connected.
              </h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {capabilities.services.map((service: { number: string; title: string; detail: string }, i: number) => (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.1 }}
                  key={service.number}
                  className="glass-card"
                  style={{ padding: "28px" }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{service.number}</p>
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.3rem", marginBottom: 12 }}>{service.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>{service.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Technical specs — Accordion */}
        <section style={{ background: "hsl(var(--muted))", padding: "80px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
              <motion.div {...reveal}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{capabilities.technical.eyebrow}</span>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, marginTop: 12, marginBottom: 24 }}>{capabilities.technical.title}</h2>
                <figure style={{ borderRadius: 16, overflow: "hidden" }}>
                  <img
                    src="/airo-assets/images/pages/projects/industrial-structure"
                    alt="Industrial steel building facade"
                    width={1400}
                    height={1000}
                    loading="lazy"
                    style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                  />
                  <figcaption style={{ background: "hsl(var(--card))", padding: "12px 16px", fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
                    The system begins with how the building must perform.
                  </figcaption>
                </figure>
              </motion.div>

              {/* Accordion items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {capabilities.technical.items.map((item: { label: string; detail: string }, i: number) => {
                  const isOpen = openAccordion === item.label;
                  return (
                    <motion.div
                      {...reveal}
                      transition={{ ...reveal.transition, delay: i * 0.08 }}
                      key={item.label}
                      style={{
                        borderRadius: 14,
                        border: "1px solid hsl(var(--border))",
                        background: isOpen ? "hsl(var(--background))" : "hsl(var(--background) / 0.5)",
                        overflow: "hidden",
                        transition: "all 0.2s",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenAccordion(isOpen ? null : item.label)}
                        style={{
                          width: "100%", padding: "16px 20px",
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          background: "none", border: "none", cursor: "pointer",
                          textAlign: "left", gap: 12,
                        }}
                      >
                        <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.1rem", margin: 0 }}>{item.label}</h3>
                        {isOpen ? <ChevronUp size={18} color="hsl(215 72% 18%)" /> : <ChevronDown size={18} />}
                      </button>
                      {isOpen && (
                        <div style={{ padding: "0 20px 18px" }}>
                          <p style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>{item.detail}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section style={{ background: "hsl(var(--background))", padding: "80px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
            <motion.div {...reveal} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{capabilities.sectors.eyebrow}</span>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, marginTop: 12 }}>{capabilities.sectors.title}</h2>
              </div>
              <Link
                to="/projects"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 13, fontWeight: 700, color: "hsl(215 72% 18%)",
                  textDecoration: "none", padding: "10px 20px", borderRadius: 10,
                  border: "1px solid hsl(20 62% 38% / 0.3)",
                  transition: "all 0.2s",
                }}
              >
                View project studies <ArrowRight size={15} />
              </Link>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {capabilities.sectors.items.map((sector: { name: string; detail: string }, i: number) => (
                <motion.article
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  key={sector.name}
                  className="glass-card"
                  style={{ padding: "24px" }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.1em", marginBottom: 12 }}>0{i + 1}</p>
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.1rem", marginBottom: 10 }}>{sector.name}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>{sector.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="steel-grid" style={{ padding: "80px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
            <motion.div {...reveal} style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{capabilities.process.eyebrow}</span>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#fff", lineHeight: 1.1, marginTop: 12 }}>{capabilities.process.title}</h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {capabilities.process.steps.map((step: { title: string; detail: string }, i: number) => (
                <motion.div
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.1 }}
                  key={step.title}
                  className="glass-dark"
                  style={{ padding: "28px", borderRadius: 18 }}
                >
                  <p style={{ fontSize: 11, fontWeight: 800, color: "hsl(28 95% 58%)", letterSpacing: "0.1em", marginBottom: 14 }}>STEP 0{i + 1}</p>
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.2rem", color: "#fff", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(0 0% 100% / 0.55)" }}>{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "hsl(28 95% 58%)", padding: "64px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <motion.div {...reveal}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "hsl(0 0% 100% / 0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{capabilities.cta.eyebrow}</p>
              <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>{capabilities.cta.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "hsl(0 0% 100% / 0.8)", maxWidth: 480 }}>{capabilities.cta.description}</p>
            </motion.div>
            <Link
              to="/proposal"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 14,
                background: "hsl(60 5% 15%)", color: "#fff",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                transition: "all 0.25s", whiteSpace: "nowrap",
              }}
              className="hover:-translate-y-0.5"
            >
              {capabilities.cta.button} <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}



