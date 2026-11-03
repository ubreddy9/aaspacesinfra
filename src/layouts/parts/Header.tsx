import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, X, Shield, Phone, Mail, MapPin, Factory } from "lucide-react";
import { useEffect, useState } from "react";
import { getActiveProjects } from "@/lib/projectStore";

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectCount, setProjectCount] = useState<number>(7);

  useEffect(() => {
    function syncProjectCount() {
      getActiveProjects()
        .then((list) => {
          if (typeof list?.length === "number") {
            setProjectCount(list.length);
          }
        })
        .catch(() => {});
    }

    syncProjectCount();
    window.addEventListener("projects-updated", syncProjectCount);
    window.addEventListener("storage", syncProjectCount);
    return () => {
      window.removeEventListener("projects-updated", syncProjectCount);
      window.removeEventListener("storage", syncProjectCount);
    };
  }, [location.pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/capabilities", label: "Capabilities & Plant" },
    { href: "/projects", label: "Projects Delivered", badge: String(projectCount) },
    { href: "/proposal", label: "Contact Us" },
  ];

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="w-full z-50 sticky top-0 shadow-sm bg-white font-sans">
      {/* Top Simple Utility Bar (Exact PebSol Projects layout) */}
      <div className="bg-slate-50 text-slate-600 text-xs py-2 px-4 border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left contact info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <a
                href="tel:+919542445555"
                className="flex items-center space-x-1.5 hover:text-blue-700 transition-colors font-medium text-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>+91 95424 45555</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="tel:+919849028657"
                className="hover:text-blue-700 transition-colors font-medium text-slate-700"
              >
                +91 98490 28657
              </a>
            </div>

            <a
              href="mailto:info@aaspacesinfra.com"
              className="flex items-center space-x-1.5 hover:text-blue-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-700" />
              <span>info@aaspacesinfra.com</span>
            </a>

            <div className="flex items-center space-x-1.5 text-slate-500">
              <Factory className="w-3.5 h-3.5 text-blue-700" />
              <span>Factory: Shadnagar, Telangana</span>
            </div>
          </div>

          {/* Right corporate address */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              <span>HITEX / Shilpa Layout, Hyderabad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Clean White Navbar */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Tagline */}
            <Link
              to="/"
              className="flex items-center space-x-3 cursor-pointer group no-underline"
              aria-label="AA Spaces Home"
            >
              <div className="w-11 h-11 rounded-lg bg-[#0f2b48] flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#1a3d66] transition-colors shrink-0">
                <img
                  src="/assets/brand/logo.png"
                  alt="AA Spaces"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-black tracking-tight text-[#0f2b48] font-['Barlow'] uppercase">
                    AA <span className="text-blue-700">Spaces</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-[#0f2b48] border border-slate-200 tracking-wide uppercase">
                    PEB- Engineered to strength
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
                  Pre-Engineered Buildings & Infrastructure
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 no-underline ${
                      active
                        ? "text-[#0f2b48] bg-slate-100 font-bold border border-slate-200"
                        : "text-slate-600 hover:text-[#0f2b48] hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        active
                          ? "bg-[#0f2b48] text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/admin"
                aria-label="Admin Portal"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Admin Portal"
              >
                <Shield className="w-4 h-4" />
              </Link>
              <Link
                to="/proposal"
                className="bg-[#0f2b48] hover:bg-[#1a3d66] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm flex items-center space-x-1.5 no-underline"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                to="/proposal"
                className="bg-[#0f2b48] text-white text-xs font-bold px-3 py-1.5 rounded-md no-underline"
              >
                Inquire
              </Link>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold no-underline ${
                    active
                      ? "bg-slate-100 text-[#0f2b48] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5 px-2">
              <div className="flex items-center space-x-2">
                <Factory className="w-3.5 h-3.5 text-blue-700" />
                <span>Plant: Shadnagar Industrial Area, Telangana</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>+91 95424 45555 / +91 98490 28657</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-700" />
                <span>info@aaspacesinfra.com</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/proposal"
                className="w-full bg-[#0f2b48] text-white font-bold py-2.5 rounded-lg text-sm text-center block no-underline shadow-sm"
              >
                Get Project Estimation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
