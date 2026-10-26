import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowRight, ArrowUpRight, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { projects as contentProjects } from "virtual:content";
import { getProjects, type Project } from "@/lib/projectStore";

const site = "https://aaspacesinfra.com";
const url = `${site}/projects`;
const title = "PEB Project Studies | AA Spaces";
const description = "Browse representative AA Spaces pre-engineered building studies across warehouse, commercial, industrial, hospitality and event sectors.";
const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#webpage`, name: title, url, isPartOf: { "@id": `${site}/#website` }, about: { "@id": `${site}/#organization` } };

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

const ALL_FILTERS = [
  { value: "all", label: "All Projects" },
  { value: "warehouse", label: "Warehouse" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "hospitality", label: "Hospitality" },
  { value: "convention", label: "Convention" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

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
            minHeight: "52vh",
            display: "flex",
            alignItems: "flex-end",
            background: "hsl(215 40% 7%)",
            overflow: "hidden",
          }}
        >
          <img
            src="https://aaspacesinfra.com/assets/brand/logo.png"
            alt="Pre-engineered steel warehouse exterior"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(215 40% 7%) 0%, hsl(60 5% 10% / 0.7) 40%, hsl(60 5% 10% / 0.3) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, width: "100%", margin: "0 auto", padding: "48px 32px 56px" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{contentProjects.hero.eyebrow}</span>
              <h1
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  color: "#fff",
                  marginTop: 12, marginBottom: 16, maxWidth: 700,
                }}
              >
                {contentProjects.hero.title}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "hsl(0 0% 100% / 0.65)", maxWidth: 540 }}>{contentProjects.hero.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section style={{ background: "hsl(var(--background))", padding: "56px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
            {/* Filter pills */}
            <motion.div {...reveal} style={{ marginBottom: 36 }}>
              <div
                role="group"
                aria-label="Filter projects by sector"
                style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
              >
                {ALL_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFilter(f.value)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 700,
                      border: filter === f.value ? "none" : "1px solid hsl(var(--border))",
                      background: filter === f.value ? "hsl(215 72% 18%)" : "transparent",
                      color: filter === f.value ? "#fff" : "hsl(var(--muted-foreground))",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
                {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
              </p>
            </motion.div>

            {/* Projects grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
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
                  <button onClick={() => setFilter("all")} style={{ fontSize: 13, color: "hsl(28 95% 52%)", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
                    View all projects â†’
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
                    <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                      <motion.img
                        src={project.image}
                        alt={`${project.sector} building study`}
                        width={1400}
                        height={1000}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        whileHover={{ scale: 1.08, transition: { duration: 0.5 } }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(215 40% 7% / 0.9) 0%, transparent 60%)" }} />
                      <span
                        style={{
                          position: "absolute", top: 14, left: 14,
                          padding: "4px 12px", borderRadius: 999,
                          background: "hsl(0 0% 0% / 0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid hsl(0 0% 100% / 0.15)",
                          fontSize: 10, fontWeight: 700, color: "hsl(28 95% 58%)",
                          letterSpacing: "0.12em", textTransform: "uppercase",
                        }}
                      >
                        {project.sector}
                      </span>
                    </div>

                    {/* Card info */}
                    <div
                      style={{
                        background: "hsl(var(--card))",
                        padding: "20px 22px",
                        borderRadius: "0 0 20px 20px",
                        border: "1px solid hsl(var(--border))",
                        borderTop: "none",
                      }}
                    >
                      <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                        {project.code}
                      </p>
                      <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.2rem", marginBottom: 8 }}>{project.title}</h2>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(var(--muted-foreground))", marginBottom: 12 }}>
                        {project.description.length > 100 ? project.description.slice(0, 100) + "â€¦" : project.description}
                      </p>
                      {project.location && (
                        <p style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "hsl(var(--muted-foreground))", marginBottom: 14 }}>
                          <MapPin size={12} /> {project.location}
                        </p>
                      )}
                      <Link
                        to="/proposal"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          fontSize: 12, fontWeight: 700, color: "hsl(215 72% 18%)",
                          textDecoration: "none",
                        }}
                      >
                        Discuss a similar build <ArrowRight size={13} />
                      </Link>
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
          style={{ padding: "64px 0" }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <motion.div {...reveal}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "hsl(28 95% 58%)", marginBottom: 12 }}>{contentProjects.note.title}</p>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "hsl(0 0% 100% / 0.7)", maxWidth: 480 }}>{contentProjects.note.description}</p>
              </motion.div>
              <motion.div {...reveal}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{contentProjects.cta.eyebrow}</p>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>{contentProjects.cta.title}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "hsl(0 0% 100% / 0.55)", marginBottom: 24 }}>{contentProjects.cta.description}</p>
                <Link
                  to="/proposal"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 28px", borderRadius: 14,
                    background: "hsl(28 95% 58%)", color: "#fff",
                    fontSize: 14, fontWeight: 700, textDecoration: "none",
                    transition: "all 0.25s",
                    boxShadow: "0 4px 24px hsl(37 65% 57% / 0.3)",
                  }}
                  className="hover:-translate-y-0.5"
                >
                  {contentProjects.cta.button} <ArrowUpRight size={17} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 800,
              background: "hsl(0 0% 0% / 0.75)",
              backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "hsl(var(--card))",
                borderRadius: 24,
                maxWidth: 640,
                width: "100%",
                overflow: "hidden",
                boxShadow: "0 40px 80px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div style={{ position: "relative", height: 280 }}>
                <img
                  src={selected.image}
                  alt={selected.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position: "absolute", top: 16, right: 16,
                    width: 36, height: 36, borderRadius: "50%",
                    background: "hsl(0 0% 0% / 0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid hsl(0 0% 100% / 0.15)",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "hsl(215 72% 18%)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{selected.code} Â· {selected.sector}</p>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: "1.6rem", marginBottom: 12 }}>{selected.title}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "hsl(var(--muted-foreground))", marginBottom: 16 }}>{selected.description}</p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
                  {selected.location && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
                      <MapPin size={13} color="hsl(215 72% 18%)" /> {selected.location}
                    </span>
                  )}
                  {selected.area && (
                    <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--foreground))" }}>{selected.area}</span>
                  )}
                </div>
                <Link
                  to="/proposal"
                  onClick={() => setSelected(null)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 24px", borderRadius: 12,
                    background: "hsl(215 72% 18%)", color: "#fff",
                    fontSize: 13, fontWeight: 700, textDecoration: "none",
                  }}
                >
                  Discuss a similar build <ArrowUpRight size={15} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}




