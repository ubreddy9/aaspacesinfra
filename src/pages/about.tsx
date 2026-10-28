import { Helmet } from "@dr.pogodin/react-helmet";
import QuoteModal from "@/components/QuoteModal";
import ClientsSection from "@/components/ClientsSection";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Building2, Factory, ShieldCheck, Award, Eye, Target, MapPin, Mail, Phone, Wrench, Compass, Layers, CheckSquare } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const site = "https://aaspacesinfra.com";
const url = `${site}/about`;
const title = "Company Profile | AA Spaces Infra";
const description = "Learn how AA Spaces Infra delivers precision-engineered Pre-Engineered Steel Buildings, industrial manufacturing plants, clear-span venues, and warehouse logistics hubs across India.";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${url}#webpage`,
      name: title,
      url,
      isPartOf: { "@id": `${site}/#website` },
      about: { "@id": `${site}/#organization` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${site}/` },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": url }
      ]
    }
  ]
};
const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: "easeOut" as const } };

const engineeringPillars = [
  {
    icon: Compass,
    number: "01",
    title: "Structural Engineering & 3D BIM Detailing",
    detail: "Every structure is engineered from first principles in compliance with IS:800:2007, IS:875 (Parts 1-3), and MBMA standards. In-house Tekla 3D BIM detailing eliminates fabrication clashes before steel enters production.",
  },
  {
    icon: Factory,
    number: "02",
    title: "Automated Fabrication & Weld Integrity",
    detail: "Fabricated at our specialized plant in Medak using automated Submerged Arc Welding (SAW), Grade E350 high-tensile plates, and continuous roll-forming lines producing 345 MPa galvanized C/Z purlins with ultrasonic quality checks.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Turnkey Erection & Site Safety",
    detail: "Executed by seasoned structural rigging teams equipped with certified heavy cranes, torque-controlled high-tensile bolting, and strict zero-accident occupational safety protocols across complex site environments.",
  },
  {
    icon: CheckSquare,
    number: "04",
    title: "Proven Enterprise Handover Track Record",
    detail: "Demonstrated execution across demanding aerospace tolerances (Azad Engineering delivered in 48 days), 2.5L sq.ft heavy steel plants (Shri Raj Udyog), tight night-shift logistics (Reliance Retail), and clear-span convention centers.",
  },
];

export default function AboutPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

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
        <meta property="og:image" content={`${site}/assets/brand/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/assets/brand/logo.png`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>

      <main>
        {/* Clean Corporate Banner (Company Profile) */}
        <section
          style={{
            position: "relative",
            minHeight: "52vh",
            display: "flex",
            alignItems: "flex-end",
            background: "hsl(194 65% 10%)",
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1920"
            alt="AA Spaces Heavy Structural Steel Engineering"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(194 65% 10%) 0%, hsl(194 65% 12% / 0.78) 45%, hsl(194 65% 12% / 0.35) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, width: "100%", margin: "0 auto", padding: "52px 32px 60px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "hsl(42 54% 74%)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "hsl(42 54% 74% / 0.15)",
                  border: "1px solid hsl(42 54% 74% / 0.35)",
                  padding: "5px 16px",
                  borderRadius: 999,
                  display: "inline-block",
                  marginBottom: 14,
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                Company Profile • Structural Engineering &amp; PEB Infrastructure
              </span>
              <h1
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  color: "#fff",
                  marginTop: 8,
                  marginBottom: 16,
                  maxWidth: 780,
                  letterSpacing: "-0.02em",
                }}
              >
                About AA Spaces Infra
              </h1>
              <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "hsl(180 20% 88%)", maxWidth: 660 }}>
                Delivering high-tensile, column-free Pre-Engineered Buildings, heavy manufacturing superstructures, and regional logistics hubs with complete structural engineering accountability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Authentic Corporate Narrative */}
        <section style={{ background: "hsl(var(--background))", padding: "88px 0" }}>
          <div className="site-container">
            <div className="responsive-grid-2" style={{ alignItems: "center", gap: 48 }}>
              {/* Left narrative */}
              <div>
                <motion.div {...reveal}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "hsl(194 68% 25%)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      background: "hsl(42 54% 74% / 0.2)",
                      border: "1px solid hsl(42 54% 74% / 0.4)",
                      padding: "5px 14px",
                      borderRadius: 999,
                      marginBottom: 16,
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    Engineering-Driven Construction
                  </span>
                  <h2
                    style={{
                      fontFamily: '"Sora", sans-serif',
                      fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
                      lineHeight: 1.15,
                      color: "hsl(194 65% 15%)",
                      letterSpacing: "-0.03em",
                      marginBottom: 20,
                    }}
                  >
                    Structural Integrity, In-House Fabrication &amp; Single-Source Delivery
                  </h2>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14.5, lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>
                  <p>
                    Headquartered at <strong>Cyber Elite Suites near the HITEX Exhibition Center, Hyderabad</strong>, AA Spaces Infra is an established structural engineering and Pre-Engineered Building (PEB) design-build firm. We specialize exclusively in heavy-duty structural steel frameworks for manufacturing plants, regional distribution centers, high-capacity warehouses, and grand event pavilions across India.
                  </p>
                  <p>
                    Unlike broker-led contracting outfits, AA Spaces Infra is steered directly by qualified structural engineers and industrial construction veterans. Our executive leadership combines post-graduate structural analysis (<strong>M.Tech. Structures</strong>) with over <strong>28 years</strong> of industrial fabrication and turnkey erection management. This structural foundation ensures that every member, connection plate, and anchor bolt is calculated for maximum load efficiency, seismic safety, and wind resistance.
                  </p>
                  <p>
                    To guarantee precision and schedule certainty, our advanced manufacturing plant in the <strong>Medak Industrial Corridor</strong> operates with automated submerged arc welding (SAW), computer-controlled plasma cutting, and continuous cold roll-forming lines. With an annual execution capacity exceeding <strong>1.2 Million sq.ft</strong>, AA Spaces delivers speed, structural precision, and unwavering safety on every project.
                  </p>
                </div>

                {/* Two metrics badges */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 28 }}>
                  <div style={{ background: "hsl(194 65% 10%)", padding: "20px 22px", borderRadius: 14, border: "1px solid hsl(179 38% 75% / 0.25)" }}>
                    <div style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)", fontWeight: 800, color: "hsl(42 54% 74%)" }}>
                      1.2M+ sq.ft
                    </div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "hsl(180 20% 75%)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
                      Annual PEB Capacity
                    </div>
                  </div>

                  <div style={{ background: "hsl(194 65% 10%)", padding: "20px 22px", borderRadius: 14, border: "1px solid hsl(179 38% 75% / 0.25)" }}>
                    <div style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)", fontWeight: 800, color: "#ffffff" }}>
                      80,000 sq.ft
                    </div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "hsl(180 20% 75%)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
                      Medak Fabrication Plant
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Plant Photography */}
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid hsl(179 38% 75% / 0.25)", boxShadow: "0 16px 48px hsl(0 0% 0% / 0.12)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1200"
                    alt="AA Spaces Engineering & Erection"
                    style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      background: "hsl(194 65% 12% / 0.94)",
                      backdropFilter: "blur(12px)",
                      padding: "16px 20px",
                      borderRadius: 14,
                      border: "1px solid hsl(179 38% 75% / 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(42 54% 74%)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Fabrication Quality
                      </p>
                      <h4 style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: '"Sora", sans-serif' }}>
                        Medak Unit • Submerged Arc Welding &amp; 345 MPa Purlins
                      </h4>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 6, background: "hsl(42 54% 74%)", color: "hsl(194 65% 15%)" }}>
                      IS:800 / MBMA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Pillars & Delivery Standards (Replaces copied milestones) */}
        <section style={{ background: "hsl(194 65% 10%)", padding: "88px 0", position: "relative" }}>
          <div className="steel-grid" style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }} />
          <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "hsl(42 54% 74%)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "hsl(42 54% 74% / 0.14)",
                  border: "1px solid hsl(42 54% 74% / 0.35)",
                  padding: "5px 16px",
                  borderRadius: 999,
                  display: "inline-block",
                  marginBottom: 14,
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                Execution Framework
              </span>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                The Four Pillars of AA Spaces Delivery
              </h2>
              <p style={{ fontSize: 15, color: "hsl(180 20% 75%)", marginTop: 14, lineHeight: 1.7 }}>
                Engineered for industrial rigor, clear structural accountability, and zero-compromise site safety from initial brief to commercial handover.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {engineeringPillars.map((p, i) => {
                const IconComponent = p.icon;
                return (
                  <motion.div
                    {...reveal}
                    transition={{ ...reveal.transition, delay: i * 0.1 }}
                    key={p.number}
                    style={{
                      background: "hsl(194 60% 13% / 0.9)",
                      border: "1px solid hsl(179 38% 75% / 0.2)",
                      borderRadius: 16,
                      padding: "28px 24px",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: "hsl(42 54% 74% / 0.14)",
                            border: "1px solid hsl(42 54% 74% / 0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconComponent size={20} color="hsl(42 54% 74%)" />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "hsl(42 54% 74%)",
                            fontFamily: '"Space Grotesk", sans-serif',
                          }}
                        >
                          {p.number}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: '"Sora", sans-serif',
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "#fff",
                          marginBottom: 10,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p style={{ fontSize: 13, lineHeight: 1.7, color: "hsl(180 20% 75%)" }}>
                        {p.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section style={{ background: "hsl(var(--background))", padding: "88px 0" }}>
          <div className="site-container">
            <div className="responsive-grid-2" style={{ gap: 28 }}>
              {/* Vision */}
              <motion.div
                {...reveal}
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 20,
                  padding: "36px 32px",
                  boxShadow: "0 8px 32px hsl(0 0% 0% / 0.05)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "hsl(42 54% 74% / 0.2)",
                    border: "1px solid hsl(42 54% 74% / 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Eye size={24} color="hsl(194 65% 20%)" />
                </div>
                <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.5rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 12 }}>
                  Our Vision
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>
                  To be India’s most trusted, engineering-first Pre-Engineered Building organization — delivering column-free, durable, and commercially viable steel infrastructure that accelerates national industrial and manufacturing capability.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 }}
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 20,
                  padding: "36px 32px",
                  boxShadow: "0 8px 32px hsl(0 0% 0% / 0.05)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "hsl(194 65% 20% / 0.12)",
                    border: "1px solid hsl(194 65% 20% / 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Target size={24} color="hsl(194 65% 20%)" />
                </div>
                <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.5rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 12 }}>
                  Our Mission
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>
                  To engineer and erect high-tolerance steel buildings on accelerated schedules through automated fabrication, rigorous 3D Tekla detailing, transparent structural metrics, and unbending adherence to IS:800 and MBMA standards.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Executive Leadership Team */}
        <section style={{ background: "hsl(210 20% 97%)", padding: "88px 0" }}>
          <div className="site-container">
            <motion.div {...reveal} style={{ textAlign: "center", marginBottom: 56 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "hsl(194 68% 25%)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "hsl(42 54% 74% / 0.2)",
                  border: "1px solid hsl(42 54% 74% / 0.4)",
                  padding: "5px 16px",
                  borderRadius: 999,
                  marginBottom: 14,
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                Structural &amp; Project Leadership
              </span>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
                  fontWeight: 800,
                  color: "hsl(194 65% 15%)",
                  letterSpacing: "-0.03em",
                  marginBottom: 14,
                }}
              >
                Meet Our Leadership
              </h2>
              <p style={{ fontSize: 15.5, color: "hsl(215 20% 45%)", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
                Led by seasoned structural engineers and steel infrastructure directors directly engaged with clients, design validation, and on-site rigging.
              </p>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))",
                gap: 28,
                justifyContent: "center",
              }}
            >
              {[
                {
                  name: "Mr. B. Upender Reddy",
                  role: "Managing Director",
                  experience: "28+ Years Industry • 16+ Years PEB",
                  bio: "Spearheading turnkey project execution, multi-acre site management, and enterprise client relationships for industrial manufacturing plants, logistics hubs, and commercial complexes across Telangana, Andhra Pradesh, and pan-India corridors.",
                  email: "info@aaspacesinfra.com",
                  phone: "+91 95424 45555",
                  photo: "/assets/team/upender-reddy.jpg",
                },
                {
                  name: "Mr. Ch. Gangadhar",
                  role: "Executive Director",
                  qualification: "M.Tech. Structures",
                  experience: "10+ Years Structural Leadership",
                  bio: "Heads structural design, Tekla 3D detailing, foundation load calculations, and seismic engineering for heavy crane gantries (up to 30T), high-tolerance aerospace manufacturing facilities, and wide-span convention halls.",
                  email: "info@aaspacesinfra.com",
                  phone: "+91 98490 28657",
                  photo: "/assets/team/gangadhar.jpg",
                },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.15 }}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 8px 32px hsl(194 65% 15% / 0.08)",
                    border: "1px solid hsl(180 20% 88%)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", height: 320, overflow: "hidden", background: "hsl(215 20% 92%)" }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        background: "hsl(194 65% 12% / 0.88)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid hsl(42 54% 74% / 0.4)",
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "hsl(42 54% 74%)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {member.experience}
                    </div>
                  </div>

                  <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <h3 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.2rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 3 }}>
                        {member.name}
                      </h3>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "hsl(42 50% 45%)" }}>
                        {member.role} {member.qualification ? `• ${member.qualification}` : ""}
                      </p>
                    </div>

                    <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>
                      {member.bio}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "hsl(194 65% 20%)",
                          textDecoration: "none",
                          padding: "7px 12px",
                          borderRadius: 8,
                          background: "hsl(42 54% 74% / 0.15)",
                          border: "1px solid hsl(42 54% 74% / 0.35)",
                          transition: "background 0.2s",
                        }}
                      >
                        <Phone size={12} /> {member.phone}
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "hsl(194 65% 20%)",
                          textDecoration: "none",
                          padding: "7px 12px",
                          borderRadius: 8,
                          background: "hsl(180 20% 94%)",
                          border: "1px solid hsl(180 20% 84%)",
                          transition: "background 0.2s",
                        }}
                      >
                        <Mail size={12} /> {member.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Headquarters & Facility Credentials */}
        <section style={{ background: "hsl(var(--background))", padding: "72px 0", borderTop: "1px solid hsl(var(--border))" }}>
          <div className="site-container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              <div
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 16,
                  padding: "28px 24px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "hsl(42 54% 74% / 0.18)", border: "1px solid hsl(42 54% 74% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Building2 size={20} color="hsl(194 65% 20%)" />
                </div>
                <div>
                  <h4 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 4 }}>
                    Corporate Headquarters
                  </h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--muted-foreground))" }}>
                    Cyber Elite Suites, Near HITEX Exhibition Center &amp; Shilpa Layout, HITEC City, Hyderabad, Telangana 500084.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 16,
                  padding: "28px 24px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "hsl(194 65% 20% / 0.12)", border: "1px solid hsl(194 65% 20% / 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Factory size={20} color="hsl(194 65% 20%)" />
                </div>
                <div>
                  <h4 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 4 }}>
                    Fabrication Facility
                  </h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--muted-foreground))" }}>
                    Medak Industrial Corridor, Telangana. Automated Submerged Arc Welding (SAW) &amp; continuous cold roll-forming plant.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 16,
                  padding: "28px 24px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "hsl(42 54% 74% / 0.18)", border: "1px solid hsl(42 54% 74% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ShieldCheck size={20} color="hsl(194 65% 20%)" />
                </div>
                <div>
                  <h4 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 4 }}>
                    Structural Codes &amp; Quality
                  </h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--muted-foreground))" }}>
                    Engineered to IS:800:2007 (Limit State), IS:875 (Parts 1-3), IS:1893 seismic standards, and MBMA guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Clients Section */}
        <ClientsSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* Collaboration CTA */}
        <section
          style={{
            background: "linear-gradient(135deg, hsl(194 65% 12%) 0%, hsl(194 60% 10%) 100%)",
            padding: "80px 0",
            borderTop: "1px solid hsl(179 38% 75% / 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="steel-grid" style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }} />
          <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "hsl(42 54% 74%)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "hsl(42 54% 74% / 0.14)",
                  border: "1px solid hsl(42 54% 74% / 0.35)",
                  padding: "5px 16px",
                  borderRadius: 999,
                  display: "inline-block",
                  marginBottom: 16,
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                Let’s Collaborate
              </span>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  marginBottom: 16,
                }}
              >
                Let’s Collaborate on Your Next Landmark PEB Project
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "hsl(180 20% 80%)", marginBottom: 32 }}>
                Connect directly with our engineering division to discuss structural spans, crane capacities, and turnkey delivery schedules.
              </p>
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 36px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)",
                  color: "hsl(194 65% 15%)",
                  fontSize: 15,
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow: "0 6px 28px hsl(42 54% 74% / 0.4)",
                }}
              >
                Request PEB Project Proposal <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Quote Estimation Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
