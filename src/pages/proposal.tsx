import { Helmet } from "@dr.pogodin/react-helmet";
import { CheckCircle2, Building2, Clock, FileText, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import ProposalForm from "@/components/ProposalForm";
import { proposal } from "virtual:content";

const site = "https://aaspacesinfra.com";
const url = `${site}/proposal`;
const title = "Contact Us & Request PEB Proposal | AA Spaces Infra";
const description = "Connect with AA Spaces Infra for precision Pre-Engineered Steel Building solutions. Contact our Hyderabad corporate office or Shadnagar manufacturing facility.";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
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
        { "@type": "ListItem", "position": 2, "name": "Contact & Proposal", "item": url }
      ]
    }
  ]
};
const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: "easeOut" as const } };

const whyItems = [
  { icon: FileText, title: "Scope-Led Turnkey Consultation", detail: "We start with your custom functional brief and site dimensions, not a rigid off-the-shelf template." },
  { icon: Building2, title: "Integrated Pre-Engineered Thinking", detail: "Structural frames, 100% standing seam roof, crane gantries, and cladding engineered together from day one." },
  { icon: Clock, title: "Fast-Track Turnaround", detail: "Receive a detailed technical review, BOM estimation, and preliminary timeline within 2 business days." },
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
        <meta property="og:image" content={`${site}/assets/factory/shadnagar-plant-aerial.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/assets/factory/shadnagar-plant-aerial.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>
      <main className="font-sans text-slate-800 bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="relative bg-[#0f2b48] py-20 overflow-hidden text-white border-b border-[#1a3d66]">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
              <span className="inline-block bg-[#1a3d66] border border-blue-400/20 text-blue-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                AA Spaces / Contact & Project Enquiry
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-4 text-white">
                Let's Build Your Steel Infrastructure.
              </h1>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                Connect directly with our engineering team for warehouse, industrial plant, or grand clear-span commercial projects. Share your requirements for a complimentary technical consultation and quote.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Cards Strip */}
        <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0f2b48]">
                <MapPin className="w-6 h-6 text-[#0f2b48]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">Corporate Office</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  301, 3rd Floor, Cyber Elite Suites, Shilpa Layout, near HITEX Exhibition Center, Izzathnagar, Hyderabad, Telangana 500084
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                <Building2 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">Manufacturing Campus</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  4-Acre Heavy Fabrication Facility, Shadnagar Heavy Industrial Zone, Telangana 509216
                </p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Automated SAW Portal & CNC Lines
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                <Phone className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">Direct Phone & Email</h4>
                <p className="text-xs text-slate-700 mt-1 font-medium">
                  <a href="tel:+919542445555" className="hover:text-blue-600 transition-colors">+91 95424 45555</a>
                  <span className="mx-1 text-slate-400">/</span>
                  <a href="tel:+919849028657" className="hover:text-blue-600 transition-colors">+91 98490 28657</a>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  <a href="mailto:info@aaspacesinfra.com" className="hover:text-blue-600 transition-colors">info@aaspacesinfra.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Form & Brief Guide */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Guidance & Strengths */}
              <aside className="lg:col-span-5 space-y-8">
                <motion.div {...reveal} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{proposal.details.eyebrow}</span>
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mt-2 mb-4">{proposal.details.title}</h2>
                  <p className="text-sm text-slate-600 mb-6">
                    To expedite your preliminary engineering design and estimate, please have these key parameters in mind:
                  </p>

                  <div className="divide-y divide-slate-100">
                    {proposal.details.items.map((item: { title: string; detail: string }) => (
                      <div key={item.title} className="py-4">
                        <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Why AA Spaces Card */}
                <motion.div {...reveal} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-6">{proposal.aside.title}</h3>
                  <div className="space-y-5 mb-6">
                    {whyItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-[#0f2b48]">
                            <Icon className="w-5 h-5 text-[#0f2b48]" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-slate-900 text-sm">{item.title}</h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    {proposal.aside.description}
                  </div>
                </motion.div>

                {/* Factory Assurance Badge */}
                <div className="bg-[#0f2b48] text-white rounded-2xl p-6 shadow-md border border-[#1a3d66] flex items-center gap-4">
                  <ShieldCheck className="w-10 h-10 text-amber-400 shrink-0" />
                  <div>
                    <h5 className="font-heading font-bold text-white text-sm">Shadnagar Plant QA Guaranteed</h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      IS 2062 Grade E350 steel with ultrasonic testing, shot blasting SA 2.5, and automated submerged arc welding.
                    </p>
                  </div>
                </div>
              </aside>

              {/* Right Column: Form */}
              <motion.div
                {...reveal}
                className="lg:col-span-7 bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{proposal.form.eyebrow}</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mt-2 mb-3">{proposal.form.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{proposal.form.description}</p>

                {/* Quick Check Highlights */}
                <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  {[
                    "Zero-obligation preliminary estimate",
                    "Dedicated structural design engineer",
                    "Shadnagar factory visit welcome"
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{text}</span>
                    </div>
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




