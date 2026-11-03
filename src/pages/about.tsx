import { Helmet } from "@dr.pogodin/react-helmet";
import { useState } from "react";
import { Link } from "react-router";
import { 
  Building2, 
  Factory, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Target, 
  Eye, 
  ArrowRight,
  Clock,
  Sparkles,
  Compass,
  Wrench,
  CheckSquare
} from "lucide-react";
import ClientsSection from "@/components/ClientsSection";
import TeamSection from "@/components/TeamSection";
import QuoteModal from "@/components/QuoteModal";

const site = "https://aaspacesinfra.com";
const url = `${site}/about`;
const title = "About Us & Company Profile | AA Spaces";
const description = "Learn how AA Spaces delivers precision-engineered Pre-Engineered Steel Buildings, industrial manufacturing plants, clear-span venues, and warehouse logistics hubs across India with an automated plant at Shadnagar, Telangana.";

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
        <meta property="og:image" content={`${site}/assets/factory/shadnagar-plant-aerial.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/assets/factory/shadnagar-plant-aerial.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>

      <main className="w-full bg-white text-slate-800 font-sans">
        
        {/* Simple Clean Banner (Exact PebSol Style) */}
        <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-100 px-3 py-1 rounded-full">
              Our Journey &amp; Engineering Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
              About AA Spaces
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              PEB- Engineered to strength. Building robust, scalable, and turnkey structural steel infrastructure across India.
            </p>
          </div>
        </section>

        {/* Main Narrative & Story with Authentic Shadnagar Plant Photo */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-blue-700 font-bold text-xs uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  Building with Structural Integrity
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                  A Journey of Innovation &amp; Turnkey Precision
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  <strong>AA Spaces</strong> was established with a singular engineering commitment: to deliver world-class Pre-Engineered Steel Buildings (PEB) with uncompromising speed, structural safety, and verified execution accuracy.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  To meet the surging industrial and logistics demand across South and Central India, we established our flagship <strong>heavy manufacturing campus at Shadnagar Industrial Area, Telangana</strong>. Operating heavy portal frame welding lines, automated submerged arc welding (SAW), 30T gantry crane bays, and continuous CNC beam processing, our plant powers turnkey infrastructure execution.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  From high-tolerance aerospace manufacturing facilities (Azad Engineering delivered in 48 days) to 250,000 sq.ft integrated steel plants (Shri Raj Udyog) and sensitive pilgrimage zone hypermarkets (Reliance Retail), AA Spaces has set benchmarks for industrial execution.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-2xl font-black text-blue-600 font-['Barlow']">1.2M+ sq.ft</div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">PEB Projects Executed</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-2xl font-black text-[#0f2b48] font-['Barlow']">Shadnagar</div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Heavy Fabrication Plant</div>
                  </div>
                </div>
              </div>

              {/* Plant Feature Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/assets/factory/shadnagar-plant-front.jpg"
                    alt="AA Spaces Shadnagar Manufacturing Facility"
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase">Manufacturing Hub</span>
                      <h4 className="text-base font-bold text-[#0f2b48] font-['Barlow']">Shadnagar Plant, Telangana</h4>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded">
                      ISO 9001:2015
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Timeline Milestones (Pebsol Projects Clean Cards) */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-100 px-3 py-1 rounded-full">
                Growth Milestones
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                How AA Spaces Evolved
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-bold text-blue-600 font-mono">PHASE 1</div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Structural Foundations</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Began delivering specialized secondary structural framing, industrial sheds, and custom-engineered heavy steel trusses in Hyderabad.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-bold text-blue-600 font-mono">PHASE 2</div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Tekla 3D BIM Integration</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Adopted full in-house Tekla 3D structural engineering and connection detailing, eliminating site clashes and cutting design turnaround by 40%.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-bold text-blue-600 font-mono">PHASE 3</div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Shadnagar Plant Campus</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Commissioned the dedicated heavy manufacturing facility in Shadnagar, Telangana, adding automated SAW portal welding and continuous cold roll-forming lines.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-bold text-blue-600 font-mono">TODAY &amp; BEYOND</div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Pan-India Turnkey</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Executing complete design-build PEB contracts across aerospace, heavy steel processing, logistics warehouses, and grand event pavilions.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To be India&apos;s most dependable, safety-driven, and structurally robust Pre-Engineered Building partner — setting the benchmark for rapid execution, column-free clear spans, and industrial engineering excellence.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0f2b48] text-white flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To empower our industrial and commercial clients by delivering turnkey structures on time, with automated fabrication quality from our Shadnagar plant, strict IS 800 standards, and zero-compromise site safety.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Engineering Pillars */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-100 px-3 py-1 rounded-full">
                Engineering Discipline
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                How We Deliver Value
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Tekla 3D Detailing</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accurate connection geometry, zero site bolt clashes, and streamlined steel fabrication drawings modeled before raw steel is cut.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Factory className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Automated SAW Lines</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submerged arc welding with deep weld penetration on Grade E350 steel plates, inspected through rigorous ultrasonic testing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Turnkey Safe Erection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Certified heavy mobile cranes, torque-tested high-tensile bolting, and strict zero-accident occupational safety protocols on every site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Leadership (Gangadhar & Upendra Sir only) */}
        <TeamSection bgLight={false} />

        {/* Enterprise Clients Section */}
        <ClientsSection />

        {/* Callout */}
        <section className="py-14 bg-[#0f2b48] text-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow'] uppercase">
              Let&apos;s Collaborate on Your Next Landmark Steel Project
            </h3>
            <p className="text-slate-300 text-sm">
              Contact our engineering division at HITEX Hyderabad or visit our manufacturing campus in Shadnagar.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all cursor-pointer border-none"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}
