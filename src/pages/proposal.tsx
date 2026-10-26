import { Helmet } from "@dr.pogodin/react-helmet";
import { CheckCircle2, ArrowUpRight, Building2, Clock, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import ProposalForm from "@/components/ProposalForm";
import { proposal } from "virtual:content";

const site = "https://aaspacesinfra.com";
const url = `${site}/proposal`;
const title = "Request a Building Proposal | AA Spaces";
const description = "Share your warehouse, industrial, commercial, hospitality or convention building brief with AA Spaces.";
const jsonLd = { "@context": "https://schema.org", "@type": "ContactPage", "@id": `${url}#webpage`, name: title, url, isPartOf: { "@id": `${site}/#website` }, about: { "@id": `${site}/#organization` } };
const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: "easeOut" as const } };

const whyItems = [
  { icon: FileText, title: "Scope-led conversation", detail: "We start with your building brief, not a template." },
  { icon: Building2, title: "Integrated thinking", detail: "Structure, cladding, services — considered together from day one." },
  { icon: Clock, title: "Fast turnaround", detail: "A considered response within 2 working days of your submission." },
];

export default function ProposalPage() {
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
            position: "relative",
            minHeight: "48vh",
            display: "flex",
            alignItems: "flex-end",
            background: "hsl(215 40% 7%)",
            overflow: "hidden",
          }}
        >
          <img
            src="https://aaspacesinfra.com/assets/brand/logo.png"
            alt="AA Spaces pre-engineered building"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(215 40% 7%) 0%, hsl(215 40% 7% / 0.7) 40%, hsl(215 40% 7% / 0.25) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, width: "100%", margin: "0 auto", padding: "48px 32px 56px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{proposal.hero.eyebrow}</span>
              <h1
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                  lineHeight: 1.05,
                  color: "#fff",
                  marginTop: 12,
                  marginBottom: 16,
                  maxWidth: 680,
                }}
              >
                {proposal.hero.title}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "hsl(0 0% 100% / 0.65)", maxWidth: 520 }}>{proposal.hero.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <section style={{ background: "hsl(var(--background))", padding: "72px 0" }}>
          <div className="site-container">
            <div className="responsive-grid-2" style={{ alignItems: "start" }}>
              {/* Left sidebar */}
              <aside>
                <motion.div {...reveal}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{proposal.details.eyebrow}</span>
                  <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.1, marginTop: 12, marginBottom: 28 }}>{proposal.details.title}</h2>
                </motion.div>

                {/* What to include */}
                <div style={{ borderTop: "1px solid hsl(var(--border))", marginBottom: 32 }}>
                  {proposal.details.items.map((item: { title: string; detail: string }, i: number) => (
                    <motion.article
                      {...reveal}
                      transition={{ ...reveal.transition, delay: i * 0.1 }}
                      key={item.title}
                      style={{
                        borderBottom: "1px solid hsl(var(--border))",
                        padding: "18px 0",
                      }}
                    >
                      <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.1rem", marginBottom: 6 }}>{item.title}</h3>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>{item.detail}</p>
                    </motion.article>
                  ))}
                </div>

                {/* Why AA Spaces */}
                <motion.div
                  {...reveal}
                  className="glass-card"
                  style={{ padding: "24px" }}
                >
                  <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.2rem", marginBottom: 20 }}>{proposal.aside.title}</h3>
                  {whyItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        style={{
                          display: "flex",
                          gap: 14,
                          paddingBottom: 16,
                          marginBottom: 16,
                          borderBottom: "1px solid hsl(var(--border))",
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "hsl(20 62% 38% / 0.1)",
                            border: "1px solid hsl(20 62% 38% / 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} color="hsl(215 72% 18%)" />
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</p>
                          <p style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--muted-foreground))" }}>{item.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>{proposal.aside.description}</p>
                </motion.div>
              </aside>

              {/* Form */}
              <motion.div
                {...reveal}
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 24,
                  padding: "40px",
                  boxShadow: "0 8px 40px hsl(0 0% 0% / 0.08)",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{proposal.form.eyebrow}</span>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.1, marginTop: 12, marginBottom: 12 }}>{proposal.form.title}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(var(--muted-foreground))", marginBottom: 32 }}>{proposal.form.description}</p>

                {/* Checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, padding: "20px 24px", borderRadius: 14, background: "hsl(20 62% 38% / 0.05)", border: "1px solid hsl(20 62% 38% / 0.15)" }}>
                  {[
                    "Tell us what you are planning",
                    "Share site and project requirements",
                    "Receive a considered response",
                  ].map((item) => (
                    <p key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="hsl(215 72% 18%)" />
                      {item}
                    </p>
                  ))}
                </div>

                <ProposalForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}



