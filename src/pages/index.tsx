import { Helmet } from "@dr.pogodin/react-helmet";
import { 
  Building2, 
  Factory, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Check, 
  MapPin, 
  Camera, 
  ChevronRight,
  Layers,
  Wrench,
  Compass
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ClientsSection from "@/components/ClientsSection";
import TeamSection from "@/components/TeamSection";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import QuoteModal from "@/components/QuoteModal";
import { getActiveProjects, type Project } from "@/lib/projectStore";

const site = "https://aaspacesinfra.com";
const url = `${site}/`;
const title = "AA Spaces | Pre-Engineered Buildings — Engineered to Strength";
const description = "AA Spaces delivers precision-engineered Pre-Engineered Steel Buildings (PEB), industrial manufacturing plants, clear-span pavilions, and warehouse logistics hubs across India with an automated plant at Shadnagar, Telangana.";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
      "@id": "https://aaspacesinfra.com/#organization",
      name: "AA Spaces Infra",
      alternateName: "AA Spaces Infra Projects",
      url: "https://aaspacesinfra.com",
      logo: "https://aaspacesinfra.com/assets/brand/logo.png",
      image: "https://aaspacesinfra.com/assets/factory/shadnagar-plant-aerial.jpg",
      description: "Leading Pre-Engineered Building (PEB) design-build and turnkey structural steel infrastructure organization. 4-Acre automated manufacturing plant in Shadnagar, Telangana and Corporate Office at HITEX / Shilpa Layout, Hyderabad.",
      telephone: "+91-9542445555",
      email: "info@aaspacesinfra.com",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "301, 3rd Floor, Cyber Elite Suites, near HITEX Exhibition Center & Shilpa Layout, Izzathnagar",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500084",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "17.4716",
        longitude: "78.3756",
      }
    }
  ]
};

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteBaseline, setQuoteBaseline] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getActiveProjects().then((list) => setProjects(list.slice(0, 6)));
  }, []);

  // Exact Pebsol Projects style hero carousel with authentic AA Spaces photos
  const slides = [
    {
      title: "PEB- ENGINEERED TO STRENGTH",
      subtitle: "Turnkey Pre-Engineered Steel Buildings & Infrastructure Delivered Across India",
      desc: "Complete end-to-end design-build solutions under one roof. From structural Tekla 3D detailing to automated submerged arc welding at our Shadnagar manufacturing plant and rapid on-site erection.",
      image: "/assets/factory/shadnagar-plant-aerial.jpg",
      tag: "PRE-ENGINEERED STEEL BUILDINGS"
    },
    {
      title: "SHADNAGAR HEAVY MANUFACTURING PLANT",
      subtitle: "4-Acre Industrial Campus • Automated SAW Welding & Continuous Roll-Forming",
      desc: "Equipped with high-capacity portal welding lines, 30T heavy gantry bays, CNC beam drilling, and expansive raw steel staging yards engineered for multi-thousand MT annual production.",
      image: "/assets/factory/shadnagar-plant-front.jpg",
      tag: "STATE-OF-THE-ART MANUFACTURING"
    },
    {
      title: "RECORD-SPEED TURNKEY EXECUTION",
      subtitle: "65,000 Sq.Ft Aerospace Facility Delivered in Just 48 Days",
      desc: "Proven execution across demanding aerospace tolerances (Azad Engineering), 2.5L sq.ft heavy steel plants (Shri Raj Udyog), tight night-shift logistics (Reliance Retail), and clear-span convention centers.",
      image: "/assets/projects/sri-raj-01.jpg",
      tag: "PROVEN TRACK RECORD"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const testimonials = [
    {
      client: "Azad Engineering Limited",
      role: "Head of Operations",
      quote: "We are thoroughly impressed with AA Spaces' ability to deliver our 65,000 sq.ft aerospace manufacturing facility within just 48 days. From foundation civil works to final PEB structure, their team ensured flawless execution while adhering to our stringent aerospace tolerances."
    },
    {
      client: "Reliance Retail",
      role: "Senior Project Manager",
      quote: "Executing a project adjacent to the temple in a bustling market zone under night-only work constraints was no small feat. AA Spaces' planning, structural detailing & professionalism helped us complete the project on time without disrupting daily pilgrimage activity."
    },
    {
      client: "Geekay Wires Limited",
      role: "Head of Plant Operations",
      quote: "From prefab structural design to turnkey execution, AA Spaces delivered everything ahead of schedule. Their automated fabrication quality and heavy crane gantry integration were outstanding."
    },
    {
      client: "Shri Raj Udyog Pvt Ltd",
      role: "Managing Director",
      quote: "AA Spaces is an exceptional partner for massive industrial manufacturing sheds. Their engineering quality across our 250,000 sq.ft integrated steel plant, erection speed, and post-completion service are unmatched."
    },
    {
      client: "Ananda Convention Center",
      role: "Executive Director",
      quote: "AA Spaces delivered a top-class structure that perfectly balances column-free functionality with architectural elegance for our grand convention hall. The team's attention to detail made the entire handover smooth and stress-free."
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
        <meta property="og:image" content="https://aaspacesinfra.com/assets/factory/shadnagar-plant-aerial.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aaspacesinfra.com/assets/factory/shadnagar-plant-aerial.jpg" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>

      <main className="w-full bg-white text-slate-800 font-sans">
        {/* ─── HERO SECTION (Pebsol Projects Layout) ───────────────── */}
        <section className="relative min-h-[580px] lg:h-[650px] bg-slate-900 overflow-hidden text-white flex items-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.38] scale-100 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f2b48]/95 via-[#0f2b48]/70 to-transparent" />
            </div>
          ))}

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="max-w-2xl space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{slides[currentSlide].tag}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Barlow'] leading-tight tracking-tight text-white uppercase">
                {slides[currentSlide].title}
              </h1>

              <p className="text-xl sm:text-2xl text-blue-300 font-semibold font-['Barlow']">
                {slides[currentSlide].subtitle}
              </p>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                {slides[currentSlide].desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-lg text-sm shadow-md transition-all flex items-center space-x-2 active:scale-95 cursor-pointer border-none"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/projects"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-lg text-sm border border-white/20 transition-all flex items-center space-x-2 no-underline"
                >
                  <span>Projects Delivered</span>
                </Link>
              </div>

            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 right-8 z-30 flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-none ${
                  currentSlide === idx ? "w-8 bg-blue-500" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ─── METRICS BANNER (PebSol Projects Benchmarks) ─────────── */}
        <section className="bg-slate-50 border-b border-slate-200 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="pt-2 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-[#0f2b48] font-['Barlow']">
                  1.2M+ sq.ft
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                  PEB Projects Executed Annually
                </div>
              </div>

              <div className="pt-2 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-blue-600 font-['Barlow']">
                  4-Acre Plant
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                  Shadnagar Manufacturing Campus
                </div>
              </div>

              <div className="pt-2 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-[#0f2b48] font-['Barlow']">
                  48 Days
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                  Record Turnkey Delivery (Azad Aero)
                </div>
              </div>

              <div className="pt-2 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-blue-600 font-['Barlow']">
                  15+ Years
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                  Structural Steel Leadership
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── SHADNAGAR MANUFACTURING CAMPUS SHOWCASE ─────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-blue-700 font-bold text-xs uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  Heavy Industrial Infrastructure
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                  Manufacturing Plant at Shadnagar, Telangana
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  At <strong>AA Spaces</strong>, we don’t just erect buildings — we manufacture precision structural steel from first principles. Our <strong>4-acre heavy manufacturing campus in Shadnagar, Telangana</strong> operates automated submerged arc welding lines, heavy plate cutting bays, and continuous cold roll-forming purlin machines.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  From foundation civil design and Tekla 3D BIM structural modeling to automated factory fabrication and certified site erection, our integrated model guarantees maximum speed, structural safety, and uncompromised quality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Automated Submerged Arc Welding (SAW)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>345 MPa Galvanized C &amp; Z Purlins</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>30T Heavy Gantry Crane Bays</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Tekla 3D Detailing &amp; Ultrasonic QA</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-4">
                  <Link
                    to="/capabilities"
                    className="bg-[#0f2b48] hover:bg-[#1a3d66] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all inline-flex items-center space-x-2 no-underline"
                  >
                    <span>Explore Plant Capabilities</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="text-slate-600 hover:text-[#0f2b48] font-semibold text-sm inline-flex items-center space-x-1 no-underline"
                  >
                    <span>Company Profile &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Plant Photo Card */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img
                    src="/assets/factory/shadnagar-plant-aerial-2.jpg"
                    alt="AA Spaces Shadnagar Manufacturing Campus"
                    className="w-full h-[440px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase">Automated Fabrication Plant</span>
                      <h4 className="text-base font-bold text-[#0f2b48] font-['Barlow']">Shadnagar Campus • Telangana</h4>
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

        {/* ─── SPECIALIZED PEB SECTORS (Pebsol Projects Clean Cards) ─ */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-100 px-3 py-1 rounded-full">
                What We Build
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                Specialized PEB Solutions
              </h2>
              <p className="text-slate-600 text-sm">
                Engineered for structural durability, column-free operational volume, and rapid on-site commissioning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Sector 1: Industrial & Aerospace */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/projects/azad-01.jpg"
                    alt="Industrial & Aerospace Manufacturing Plants"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0f2b48]/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Aerospace &amp; Manufacturing
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                      Industrial &amp; Aerospace Manufacturing Sheds
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      High-precision industrial factories designed to house heavy machinery, automated gantry crane systems (up to 30T), and strict climate control. Proven through Azad Engineering&apos;s 65,000 sq.ft facility delivered in 48 days.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Clear Spans Up to 60m</span>
                    <span>Automated SAW Welding</span>
                  </div>
                </div>
              </div>

              {/* Sector 2: Warehousing & Logistics */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/projects/sri-raj-01.jpg"
                    alt="Heavy Warehousing & Logistics Hubs"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-700/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Logistics &amp; Heavy Steel
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                      Integrated Steel Plants &amp; Mega Logistics Hubs
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      Massive warehousing distribution hubs and steel manufacturing plants. Built to accommodate high-traffic forklift logistics, automated dock levelers, and seamless continuous operations across 2.5L+ sq.ft scales.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>FM2 Superflat Floors</span>
                    <span>100% Leak-Proof Seam Roof</span>
                  </div>
                </div>
              </div>

              {/* Sector 3: Convention & Grand Halls */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/projects/ananda-02.jpg"
                    alt="Convention & Grand Event Centers"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0f2b48]/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Grand Event Centers
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                      Column-Free Grand Convention Pavilions
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      Aesthetic structural architecture combining massive 45m+ clear spans with acoustic sandwich insulation, glass facade framing, and grand porticos built to host thousands of guests.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Acoustic Thermal Insulation</span>
                    <span>Architectural Glazing Tie-ins</span>
                  </div>
                </div>
              </div>

              {/* Sector 4: Commercial Retail & Multi-Storey */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/projects/reliance-01.jpg"
                    alt="Commercial Retail Hypermarkets"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-700/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Commercial &amp; Retail
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                      Commercial Hypermarkets &amp; Multi-Storey Frames
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      Multi-storey structural steel frameworks with composite metal decking, rapid erection timelines, and 50% lighter foundation loads compared to conventional RCC. Demonstrated by Reliance Retail in Tirupati.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Fast-Track Night Shifts</span>
                    <span>High Customer Footfall Design</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── FEATURED DELIVERED PROJECTS (Interactive Grid) ─────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  Delivered Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase mt-3">
                  Featured PEB Projects
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Click any project card to inspect technical specifications, tonnage, timelines, and photo gallery.
                </p>
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center space-x-1.5 text-blue-700 hover:text-blue-800 font-bold text-sm no-underline"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
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

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                        <span className="text-blue-700 font-bold">{project.code}</span>
                        {project.area && <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">{project.area}</span>}
                      </div>

                      {project.client && (
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                          {project.client}
                        </p>
                      )}

                      <h3 className="text-base font-bold text-[#0f2b48] font-['Barlow'] line-clamp-2 leading-snug">
                        {project.title}
                      </h3>

                      {project.location && (
                        <p className="flex items-center text-xs text-slate-500 mt-2 gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{project.location}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                      <span>Inspect Technical Specs</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ─── CLIENT TESTIMONIALS (PebSol Endorsements) ───────────── */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-blue-700 font-bold uppercase tracking-wider text-xs bg-blue-100 px-3 py-1 rounded-full">
                Client Endorsements
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                Trusted by Industry Leaders
              </h2>
              <p className="text-slate-600 text-sm">
                Real feedback from corporate leaders on our engineering precision and turnkey execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                      {t.client}
                    </h4>
                    <span className="text-xs text-blue-700 font-medium">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── EXECUTIVE LEADERSHIP (Gangadhar & Upendra Sir) ────── */}
        <TeamSection bgLight={true} />

        {/* ─── VERIFIED CLIENT LOGOS ───────────────────────────────── */}
        <ClientsSection />

        {/* ─── BOTTOM CALL TO ACTION (PebSol Projects Style) ───────── */}
        <section className="py-16 bg-[#0f2b48] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-blue-300 font-bold uppercase tracking-widest text-xs">
              Take the Next Step
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Barlow'] uppercase tracking-tight">
              Ready to Build Your Pre-Engineered Steel Building?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Contact our engineering team today for Tekla 3D layout consultation, preliminary tonnage estimation, and site-specific proposal discussions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-lg text-sm shadow-xl transition-all cursor-pointer border-none flex items-center space-x-2"
              >
                <span>Get Project Estimation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+919542445555"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-lg text-sm border border-white/20 transition-all flex items-center space-x-2 no-underline"
              >
                <span>Call: +91 95424 45555</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Elevated Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
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
