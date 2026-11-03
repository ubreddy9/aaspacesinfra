import { Link } from "react-router";
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Globe,
  Factory,
  ShieldCheck
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout Banner (Exact PebSol Projects Style) */}
        <div className="bg-[#0f2b48] rounded-2xl p-8 mb-16 border border-slate-700/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-blue-300 text-xs font-bold tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              PEB- Engineered to strength
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Barlow'] uppercase tracking-tight">
              Ready to Build Your Pre-Engineered Steel Infrastructure?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              From foundation civil engineering to automated fabrication at our Shadnagar plant and rapid on-site erection.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/proposal"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-md flex items-center space-x-2 no-underline"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919542445555"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg text-sm border border-white/20 transition-all flex items-center space-x-2 no-underline"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+91 95424 45555</span>
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-sm">
          
          {/* Col 1: Brand & Plant Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-[#0f2b48] border border-slate-700 flex items-center justify-center p-1.5">
                <img
                  src="/assets/brand/logo.png"
                  alt="AA Spaces"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight uppercase font-['Barlow']">
                  AA <span className="text-blue-400">Spaces</span>
                </span>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">
                  PEB- Engineered to strength
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              AA Spaces delivers turnkey Pre-Engineered Steel Buildings, industrial manufacturing sheds, heavy warehousing hubs, and clear-span convention centers across India with rapid execution and high structural precision.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-blue-400 border border-slate-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                <Factory className="w-3.5 h-3.5 text-blue-400" /> Shadnagar Plant
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold font-['Barlow'] uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors no-underline">
                  About Us &amp; Company Profile
                </Link>
              </li>
              <li>
                <Link to="/capabilities" className="hover:text-blue-400 transition-colors no-underline">
                  Capabilities &amp; Shadnagar Plant
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-blue-400 transition-colors no-underline">
                  Delivered Projects &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link to="/proposal" className="hover:text-blue-400 transition-colors no-underline">
                  Request Estimation / Proposal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-400 transition-colors no-underline text-xs text-slate-500">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Steel Building Solutions */}
          <div>
            <h4 className="text-white text-base font-bold font-['Barlow'] uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
              Steel Building Solutions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-slate-200">Industrial &amp; Aerospace Manufacturing Sheds</li>
              <li className="hover:text-slate-200">Large-Scale Logistics &amp; Warehousing Hubs</li>
              <li className="hover:text-slate-200">Integrated Steel Processing Plants</li>
              <li className="hover:text-slate-200">Multi-Storey Commercial Steel Complexes</li>
              <li className="hover:text-slate-200">Column-Free Clear-Span Grand Convention Halls</li>
              <li className="hover:text-slate-200">Cold Storage &amp; Food-Grade Processing Facilities</li>
            </ul>
          </div>

          {/* Col 4: Locations & Contacts */}
          <div className="space-y-3">
            <h4 className="text-white text-base font-bold font-['Barlow'] uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-3">
              Head Office &amp; Plant
            </h4>
            
            <div className="flex items-start space-x-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Corporate Office:</strong> 301, 3rd Floor, Cyber Elite Suites, near HITEX Exhibition Center, Shilpa Layout, Izzathnagar, Hyderabad, Telangana 500084
              </span>
            </div>

            <div className="flex items-start space-x-2.5 text-xs text-slate-400">
              <Factory className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Manufacturing Plant:</strong> Shadnagar Heavy Industrial Area, Telangana (Automated SAW &amp; CNC Portal Fabrication Campus)
              </span>
            </div>

            <div className="flex items-center space-x-2.5 text-xs text-slate-400 pt-1">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+91 95424 45555 / +91 98490 28657</span>
            </div>

            <div className="flex items-center space-x-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>info@aaspacesinfra.com</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} AA Spaces Infra. All rights reserved. PEB- Engineered to strength.</p>
          
          <div className="flex items-center space-x-1.5 text-slate-500">
            <span>Designed by</span>
            <a
              href="https://instagram.com/immanuels_realm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-500 transition-colors font-medium hover:underline underline-offset-4"
            >
              Immanuel
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-slate-400 no-underline">About</Link>
            <span>&bull;</span>
            <Link to="/projects" className="hover:text-slate-400 no-underline">Projects</Link>
            <span>&bull;</span>
            <Link to="/proposal" className="hover:text-slate-400 no-underline">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
