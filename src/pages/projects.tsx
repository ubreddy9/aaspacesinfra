import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowRight, ArrowUpRight, MapPin, Building2, Weight, Clock, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { projects as contentProjects } from "virtual:content";
import { getProjects, type Project } from "@/lib/projectStore";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import QuoteModal from "@/components/QuoteModal";

const site = "https://aaspacesinfra.com";
const url = `${site}/projects`;
const title = "Delivered PEB Projects & Case Studies | AA Spaces Infra";
const description = "Explore 11+ delivered turnkey Pre-Engineered Building (PEB) projects across India: aerospace manufacturing sheds, 2.5L sq.ft steel plants, and convention centers.";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
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
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": url }
      ]
    }
  ]
};

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

const ALL_FILTERS = [
  { value: "all", label: "All Projects" },
  { value: "industrial", label: "Industrial & Manufacturing" },
  { value: "warehouse", label: "Logistics & Warehousing" },
  { value: "commercial", label: "Commercial & Retail" },
  { value: "convention", label: "Convention & Grand Halls" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteBaseline, setQuoteBaseline] = useState<Project | null>(null);

  useEffect(() => {
    setLoadingProjects(true);
    getProjects()
      .then((list) => setAllProjects(list.filter((p) => p.status === "active")))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoadingProjects(false));
  }, []);

  const filtered = filter === "all" ? allProjects : allProjects.filter((p) => p.filter === filter);

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aaspacesinfra.com/assets/brand/logo.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            minHeight: "52vh",
            display: "flex",
            alignItems: "flex-end",
            background: "hsl(215 40% 7%)",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/projects/sri-raj-01.jpg"
            alt="Pre-engineered steel warehouse exterior"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(194 70% 8%) 0%, hsl(194 65% 12% / 0.7) 40%, hsl(194 65% 12% / 0.3) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, width: "100%", margin: "0 auto", padding: "48px 32px 56px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "hsl(42 54% 74%)", letterSpacing: "0.14em", textTransform: "uppercase", background: "hsl(42 54% 74% / 0.15)", border: "1px solid hsl(42 54% 74% / 0.3)", padding: "5px 14px", borderRadius: 999, display: "inline-block", marginBottom: 12 }}>
                AA Spaces / Pre-Engineered Portfolio
              </span>
              <h1
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  color: "#fff",
                  marginTop: 8,
                  marginBottom: 16,
                  maxWidth: 750,
                  letterSpacing: "-0.02em",
                }}
              >
                Proven Industrial &amp; Commercial Steel Projects Across India
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "hsl(180 20% 85%)", maxWidth: 620 }}>
                Every structure built with precision engineering, column-free clear spans, automated submerged arc welding, and rapid turnkey on-site execution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section style={{ background: "hsl(var(--background))", padding: "56px 0" }}>
          <div className="site-container">
            {/* Filter pills */}
            <motion.div {...reveal} style={{ marginBottom: 36 }}>
              <div
                role="group"
                aria-label="Filter projects by sector"
                style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
              >
                {ALL_FILTERS.map((f) => {
                  const count = f.value === "all" ? allProjects.length : allProjects.filter((p) => p.filter === f.value).length;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setFilter(f.value)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 700,
                        border: filter === f.value ? "1px solid hsl(42 54% 74%)" : "1px solid hsl(var(--border))",
                        background: filter === f.value ? "hsl(194 68% 23%)" : "transparent",
                        color: filter === f.value ? "hsl(42 54% 74%)" : "hsl(var(--muted-foreground))",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <span>{f.label}</span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "1px 7px",
                          borderRadius: 999,
                          background: filter === f.value ? "hsl(42 54% 74%)" : "hsl(194 50% 20% / 0.1)",
                          color: filter === f.value ? "hsl(194 65% 15%)" : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p style={{ marginTop: 14, fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
                Showing {filtered.length} verified structural project{filtered.length !== 1 ? "s" : ""}
              </p>
            </motion.div>

            {/* Projects grid */}
            <div className="responsive-grid-cards">
              {/* Loading skeletons */}
              {loadingProjects && Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  style={{ borderRadius: 20, overflow: "hidden", background: "hsl(var(--muted))", height: 320, animation: "shimmer 1.8s infinite", backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(0 0% 100% / 0.6) 50%, hsl(var(--muted)) 100%)", backgroundSize: "800px 100%" }}
                />
              ))}

              {/* Empty state */}
              {!loadingProjects && filtered.length === 0 && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 0", color: "hsl(var(--muted-foreground))" }}>
                  <p style={{ fontSize: 16, marginBottom: 8 }}>No projects found for this filter.</p>
                  <button onClick={() => setFilter("all")} style={{ fontSize: 13, color: "hsl(194 68% 23%)", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
                    View all projects &rarr;
                  </button>
                </div>
              )}

              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", position: "relative" }}
                    onClick={() => setSelected(project)}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  >
                    {/* Image with hover zoom */}
                    <div style={{ position: "relative", height: 240, overflow: "hidden", background: "hsl(194 65% 10%)" }}>
                      <motion.img
                        src={project.image}
                        alt={`${project.sector} building study`}
                        width={1400}
                        height={1000}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        whileHover={{ scale: 1.08, transition: { duration: 0.5 } }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(194 70% 8% / 0.8) 0%, transparent 60%)" }} />
                      <span
                        style={{
                          position: "absolute", top: 14, left: 14,
                          padding: "4px 12px", borderRadius: 999,
                          background: "hsl(194 65% 10% / 0.85)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid hsl(42 54% 74% / 0.35)",
                          fontSize: 10.5, fontWeight: 700, color: "hsl(42 54% 74%)",
                          letterSpacing: "0.1em", textTransform: "uppercase",
                        }}
                      >
                        {project.sector}
                      </span>
                      {project.gallery && project.gallery.length > 1 && (
                        <span
                          style={{
                            position: "absolute",
                            top: 14,
                            right: 14,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: "hsl(194 65% 10% / 0.85)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid hsl(42 54% 74% / 0.35)",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "hsl(42 54% 74%)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Camera size={11} /> {project.gallery.length} Photos
                        </span>
                      )}
                    </div>

                    {/* Card info */}
                    <div
                      style={{
                        background: "hsl(var(--card))",
                        padding: "22px 24px",
                        borderRadius: "0 0 20px 20px",
                        border: "1px solid hsl(var(--border))",
                        borderTop: "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "hsl(194 68% 28%)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: '"Space Grotesk", sans-serif' }}>
                          {project.code}
                        </span>
                        {project.area && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "hsl(194 65% 15%)", background: "hsl(180 25% 92%)", padding: "3px 8px", borderRadius: 5 }}>
                            {project.area}
                          </span>
                        )}
                      </div>

                      {project.client && (
                        <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(42 48% 45%)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                          {project.client}
                        </p>
                      )}

                      <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.15rem", fontWeight: 800, color: "hsl(194 65% 15%)", marginBottom: 8, lineHeight: 1.3 }}>
                        {project.title}
                      </h2>

                      <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))", marginBottom: 14 }}>
                        {project.description.length > 110 ? project.description.slice(0, 110) + "..." : project.description}
                      </p>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12, color: "hsl(194 25% 42%)", marginBottom: 14 }}>
                        {project.location && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <MapPin size={12} color="hsl(194 68% 28%)" /> {project.location}
                          </span>
                        )}
                        {project.tonnage && (
                          <span style={{ fontWeight: 600, color: "hsl(194 65% 18%)" }}>
                            {project.tonnage}
                          </span>
                        )}
                      </div>

                      <div style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(194 68% 28%)" }}>
                          Inspect Technical Specs &rarr;
                        </span>
                        {project.timeline && (
                          <span style={{ fontSize: 10.5, fontWeight: 700, color: "hsl(160 84% 32%)", background: "hsl(160 84% 39% / 0.1)", padding: "2px 7px", borderRadius: 4 }}>
                            {project.timeline}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="steel-grid"
          style={{ padding: "72px 0", background: "hsl(194 65% 11%)" }}
        >
          <div className="site-container">
            <div className="responsive-grid-2" style={{ alignItems: "center" }}>
              <motion.div {...reveal}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "hsl(42 54% 74%)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12, fontFamily: '"Space Grotesk", sans-serif' }}>
                  Fabrication &amp; Execution Excellence
                </p>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
                  Have an Upcoming Industrial or Commercial Building?
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "hsl(180 20% 80%)", maxWidth: 540 }}>
                  Discuss your spans, bay widths, crane requirements, and delivery milestones directly with our structural engineering team.
                </p>
              </motion.div>
              <motion.div {...reveal} style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 36px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)",
                    color: "hsl(194 65% 15%)",
                    fontSize: 14.5,
                    fontWeight: 800,
                    transition: "all 0.25s",
                    boxShadow: "0 6px 28px hsl(42 54% 74% / 0.4)",
                  }}
                  className="hover:-translate-y-0.5"
                >
                  Get Project Estimation <ArrowUpRight size={17} />
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Elevated Project Detail Modal */}
      <ProjectDetailModal
        project={selected}
        onClose={() => setSelected(null)}
        onRequestQuote={(p) => {
          setQuoteBaseline(p || null);
          setIsQuoteOpen(true);
        }}
      />

      {/* Interactive PEB Project Estimation Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProject={quoteBaseline}
      />
    </>
  );
}
