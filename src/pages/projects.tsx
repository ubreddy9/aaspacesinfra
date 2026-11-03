import { Helmet } from "@dr.pogodin/react-helmet";
import { 
  Building2, 
  Search, 
  MapPin, 
  Calendar, 
  Weight, 
  ArrowRight, 
  ArrowUpRight, 
  Camera, 
  CheckCircle2,
  Filter
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { getProjects, type Project } from "@/lib/projectStore";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import QuoteModal from "@/components/QuoteModal";

const site = "https://aaspacesinfra.com";
const url = `${site}/projects`;
const title = "Delivered PEB Projects & Case Studies | AA Spaces";
const description = "Explore delivered turnkey Pre-Engineered Building (PEB) projects across India: aerospace manufacturing sheds, 2.5L sq.ft steel plants, hypermarkets, and clear-span convention centers.";

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

const CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "industrial", label: "Industrial & Manufacturing" },
  { value: "warehouse", label: "Logistics & Warehousing" },
  { value: "commercial", label: "Commercial & Retail" },
  { value: "convention", label: "Convention & Grand Halls" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = filter === "all" || project.filter === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        project.title.toLowerCase().includes(q) ||
        (project.client && project.client.toLowerCase().includes(q)) ||
        (project.location && project.location.toLowerCase().includes(q)) ||
        (project.description && project.description.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });
  }, [allProjects, filter, searchQuery]);

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

      <main className="w-full bg-white text-slate-800 font-sans">
        
        {/* Clean Banner (Exact PebSol Style) */}
        <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-100 px-3 py-1 rounded-full">
              Executed Portfolio
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
              Projects Delivered
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Delivering landmark Pre-Engineered Buildings, aerospace manufacturing facilities, and heavy industrial steel infrastructure across India.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar (Exact PebSol Projects Layout) */}
        <section className="py-6 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, title, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer bg-none border-none"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status info */}
              <div className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-[#0f2b48]">{filteredProjects.length}</strong> verified project{filteredProjects.length !== 1 ? "s" : ""}
              </div>

            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const count = cat.value === "all"
                  ? allProjects.length
                  : allProjects.filter((p) => p.filter === cat.value).length;
                const isSelected = filter === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFilter(cat.value)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#0f2b48] text-white shadow-sm border border-[#0f2b48]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-slate-50 min-h-[500px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {loadingProjects ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-200 h-96 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <p className="text-base text-slate-500">No projects found matching your criteria.</p>
                <button
                  type="button"
                  onClick={() => { setFilter("all"); setSearchQuery(""); }}
                  className="bg-[#0f2b48] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer border-none"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    onClick={() => setSelected(project)}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="relative h-60 overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-[#0f2b48]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
                        {project.sector}
                      </div>
                      {project.gallery && project.gallery.length > 1 && (
                        <div className="absolute top-3 right-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <Camera className="w-3 h-3 text-blue-600" />
                          <span>{project.gallery.length} Photos</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                          <span className="text-blue-700 font-bold">{project.code}</span>
                          {project.area && (
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                              {project.area}
                            </span>
                          )}
                        </div>

                        {project.client && (
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                            {project.client}
                          </p>
                        )}

                        <h3 className="text-base font-bold text-[#0f2b48] font-['Barlow'] line-clamp-2 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                          {project.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="line-clamp-1">{project.location}</span>
                            </span>
                          )}
                          {project.timeline && (
                            <span className="font-semibold text-blue-700">
                              {project.timeline}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                        <span>Inspect Technical Specs</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-14 bg-[#0f2b48] text-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow'] uppercase">
              Have a Similar Industrial Project in Mind?
            </h3>
            <p className="text-slate-300 text-sm">
              Contact our engineering team for preliminary tonnage calculation, column grid design, and budget estimation.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all cursor-pointer border-none"
              >
                Get Project Estimation
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Elevated Project Detail Modal with multi-photo carousel */}
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
