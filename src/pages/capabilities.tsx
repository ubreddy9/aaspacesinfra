import { Helmet } from "@dr.pogodin/react-helmet";
import { useState } from "react";
import { Link } from "react-router";
import { 
  Building2, 
  Factory, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Check, 
  Wrench, 
  Compass, 
  Clock, 
  MapPin 
} from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const site = "https://aaspacesinfra.com";
const url = `${site}/capabilities`;
const title = "Capabilities & Shadnagar Plant | AA Spaces";
const description = "Explore turnkey Pre-Engineered Building (PEB) capabilities, our 4-acre heavy manufacturing plant in Shadnagar, Telangana, automated submerged arc welding, and clear-span portal frames across India.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
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
        { "@type": "ListItem", "position": 2, "name": "Capabilities", "item": url }
      ]
    }
  ]
};

export default function CapabilitiesPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const services = [
    {
      id: "peb-prefab",
      title: "PEB & Industrial Prefab Buildings",
      subtitle: "Rapid, Reliable, and Cost-Effective Industrial Construction",
      image: "/assets/projects/azad-01.jpg",
      description: "Custom-designed Pre-Engineered metal buildings tailored for industrial manufacturing sheds, aerospace machining facilities, and logistics terminals. Featuring wide column-free clear spans up to 60 meters, rapid erection, and 100% leak-proof standing seam roofing systems.",
      specs: [
        "Primary Framing: Built-up high-tensile tapered I-sections with automated submerged arc welding (SAW)",
        "Secondary Framing: Cold roll-formed galvanized C & Z purlins (345 MPa high tensile strength)",
        "Clear Spans: 15m to 60m column-free clear spans for maximum operational volume",
        "Execution Speed: 40% to 50% faster completion compared to conventional civil RCC",
        "Standards: Full compliance with AISC, MBMA, IS 800:2007, and IS 875 wind/seismic parameters"
      ],
      applications: ["Aerospace & Defense", "Heavy Manufacturing", "Automotive Plants", "Industrial Assembly Sheds"]
    },
    {
      id: "shadnagar-facility",
      title: "Shadnagar Manufacturing Campus",
      subtitle: "4-Acre Heavy Fabrication Facility in Shadnagar Industrial Area, Telangana",
      image: "/assets/factory/shadnagar-plant-aerial.jpg",
      description: "Our dedicated industrial manufacturing campus equipped with multi-operator automated submerged arc welding portal lines, CNC beam processing, 30T gantry crane bays, and vast staging yards to handle multi-thousand MT structural steel contracts seamlessly.",
      specs: [
        "Plant Area: 4-Acre heavy industrial fabrication campus with dedicated raw steel storage yards",
        "Welding: Automated submerged arc welding (SAW) portal lines with continuous flux recovery",
        "Cranes: Heavy-duty 30T internal gantry crane systems for handling massive built-up girders",
        "Quality Testing: In-house ultrasonic weld inspection, magnetic particle testing, and DFT paint checks",
        "Certification: ISO 9001:2015 certified quality management systems"
      ],
      applications: ["Built-Up Tapered Columns", "Heavy Crane Gantry Girders", "Mezzanine Floor Beams", "Cold Roll-Formed Purlins"]
    },
    {
      id: "warehouses-logistics",
      title: "Logistics Hubs & Heavy Warehousing Terminals",
      subtitle: "High-Bay Distribution Facilities with Automated Dock Leveler Bays",
      image: "/assets/projects/sri-raj-01.jpg",
      description: "Massive warehousing distribution centers and integrated steel factories featuring 10m to 14m clear heights, pre-punched dock leveler bays, canopy projections, and FM2 superflat industrial floor tie-ins for high-density multi-tier pallet racking.",
      specs: [
        "Internal Clear Height: 10m to 14m under roof hook for high-density pallet racking",
        "Dock Integration: Pre-punched loading bays designed for automated dock levelers",
        "Roofing: Double-folded standing seam roof panels with concealed clip fasteners for 100% leak prevention",
        "Scale: Proven track record delivering facilities up to 250,000 sq.ft under one roof"
      ],
      applications: ["E-Commerce Distribution Centers", "FMCG Warehouses", "Steel Processing Plants", "Cold Chain Terminals"]
    },
    {
      id: "commercial-convention",
      title: "Column-Free Grand Convention Pavilions",
      subtitle: "Architectural Steel Structures for Auditoriums, Retail & Event Spaces",
      image: "/assets/projects/ananda-02.jpg",
      description: "Grand, pillar-free structural steel architecture combining modern aesthetic porticos, glass facades, and acoustically insulated sandwich roof panels. Projects such as Ananda Convention Center and Devi Function Hall exemplify our ability to combine functional strength with visual elegance.",
      specs: [
        "Aesthetic Spans: Massive 45m+ pillar-free banquet hall spans for unobstructed crowd flow",
        "Acoustic Control: Insulated composite sandwich panels preventing rain reverberation",
        "Facade Flexibility: Seamless integration with structural glazing, ACP, and architectural cladding",
        "Fast-Track Execution: Rapid delivery minimizing downtime for commercial developers"
      ],
      applications: ["Grand Convention Centers", "Exhibition Pavilions", "Indoor Sports Arenas", "Public Auditoriums"]
    },
    {
      id: "commercial-multistorey",
      title: "Commercial Retail Hypermarkets & Multi-Storey Steel",
      subtitle: "Composite Metal Decking & Rapid Fast-Track Night Execution",
      image: "/assets/projects/reliance-01.jpg",
      description: "Multi-storey structural steel frameworks with composite metal decking slabs and architectural facades. Ideal for retail superstores, commercial office towers, and sensitive urban zones requiring high-speed execution under tight logistical constraints.",
      specs: [
        "Foundation Savings: 50% reduction in structural dead load compared to conventional RCC",
        "Composite Decking: High-tensile profiled metal decking with welded shear studs",
        "Night Shift Execution: Specialized logistics for zero-disruption commercial site handovers",
        "Footfall Safety: Commercial-grade seismic framing compliant with high-density occupancy norms"
      ],
      applications: ["Retail Hypermarkets", "Corporate Office Complexes", "Hospitality Buildings", "Multi-Storey Car Parks"]
    }
  ];

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
              Automated Plant &amp; Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
              Capabilities &amp; Shadnagar Plant
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              PEB- Engineered to strength. End-to-end Pre-Engineered Building solutions from 3D Tekla detailing to automated factory fabrication and on-site erection.
            </p>
          </div>
        </section>

        {/* Services / Capabilities List (Exact PebSol Projects Layout) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Text Column */}
                  <div className={`space-y-6 ${isEven ? "" : "lg:col-start-2"}`}>
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                        Capability #{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase pt-1">
                        {service.title}
                      </h2>
                      <p className="text-sm font-semibold text-blue-700">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Bullet Specs */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Technical Highlights &amp; Standards:
                      </h4>
                      <ul className="space-y-2">
                        {service.specs.map((spec, i) => (
                          <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Applications Pills */}
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Common Applications:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.applications.map((app, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium border border-slate-200"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsQuoteOpen(true)}
                        className="bg-[#0f2b48] hover:bg-[#1a3d66] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all inline-flex items-center space-x-2 cursor-pointer border-none"
                      >
                        <span>Request Technical Proposal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`relative ${isEven ? "" : "lg:col-start-1"}`}>
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* Engineering Rigor Callout */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-xs">
              Quality Assurance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
              100% In-House Quality Control &amp; Ultrasonic Inspection
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
              Every built-up beam, tapered column, and cold-rolled purlin leaving our Shadnagar manufacturing plant undergoes thorough dimensional checks, ultrasonic weld testing, and dry film thickness (DFT) paint verification per IS standards.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-700 pt-2">
              <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" /> IS 800:2007 Compliant
              </span>
              <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" /> MBMA Design Guidelines
              </span>
              <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" /> Grade E350 High-Tensile Steel
              </span>
              <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" /> ISO 9001:2015 Certified
              </span>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 bg-[#0f2b48] text-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow'] uppercase">
              Need a Custom PEB Structure Engineered?
            </h3>
            <p className="text-slate-300 text-sm">
              Our technical team is ready to analyze your site plot layout, column grids, and crane tonnage requirements.
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
