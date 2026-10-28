import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, X, Shield, Phone, Mail, MapPin, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company Profile" },
  { href: "/capabilities", label: "Capabilities & Plant" },
  { href: "/projects", label: "Projects Delivered", badge: "11" },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled
          ? "hsl(194 62% 12% / 0.96)"
          : "hsl(194 60% 12%)",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: "1px solid hsl(179 38% 75% / 0.18)",
        boxShadow: scrolled ? "0 4px 32px hsl(194 68% 8% / 0.45)" : "none",
      }}
    >
      {/* Top utility bar (Like PEBSOL PROJECTS) */}
      <div
        style={{
          background: "hsl(194 68% 10%)",
          borderBottom: "1px solid hsl(179 38% 75% / 0.14)",
          padding: "7px 0",
        }}
        className="hidden md:block"
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11.5,
            fontWeight: 500,
          }}
        >
          {/* Left contact info */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "hsl(180 20% 78%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Phone size={12} color="hsl(42 54% 74%)" />
              <a
                href="tel:+919542445555"
                style={{ color: "hsl(42 54% 74%)", textDecoration: "none", fontWeight: 700 }}
              >
                +91 95424 45555
              </a>
              <span style={{ color: "hsl(179 38% 75% / 0.4)" }}>|</span>
              <a
                href="tel:+919849028657"
                style={{ color: "hsl(180 20% 88%)", textDecoration: "none", fontWeight: 600 }}
              >
                +91 98490 28657
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={12} color="hsl(42 54% 74%)" />
              <a
                href="mailto:info@aaspacesinfra.com"
                style={{ color: "hsl(180 20% 88%)", textDecoration: "none" }}
              >
                info@aaspacesinfra.com
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "hsl(180 20% 70%)" }}>
              <Globe size={12} color="hsl(179 38% 75% / 0.7)" />
              <span>Hyderabad • Medak Plant • Pan-India Turnkey</span>
            </div>
          </div>

          {/* Right corporate address info */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "hsl(180 20% 75%)" }}>
              <MapPin size={12} color="hsl(42 54% 74%)" />
              <span>HITEX / Shilpa Layout, Hyderabad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="site-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 68,
            gap: 20,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="AA Spaces home"
            style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <img
              src="/assets/brand/logo-light.png"
              alt="AA Spaces Infra"
              className="h-10 sm:h-12 md:h-[48px] w-auto max-w-[185px] sm:max-w-[240px]"
              style={{
                objectFit: "contain",
                display: "block",
              }}
            />
            <span
              className="hidden xl:inline-block"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: 4,
                background: "hsl(42 54% 74% / 0.12)",
                border: "1px solid hsl(42 54% 74% / 0.3)",
                color: "hsl(42 54% 74%)",
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              Pre-Engineered Buildings
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  position: "relative",
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: isActive(item.href) ? 700 : 500,
                  letterSpacing: "0.01em",
                  color: isActive(item.href) ? "hsl(42 54% 74%)" : "hsl(180 20% 82%)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: isActive(item.href) ? "hsl(42 54% 74% / 0.14)" : "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "hsl(194 50% 20%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "hsl(180 20% 82%)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      marginLeft: 6,
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: isActive(item.href) ? "hsl(42 54% 74%)" : "hsl(194 50% 24%)",
                      color: isActive(item.href) ? "hsl(194 65% 15%)" : "hsl(42 54% 74%)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive(item.href) && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 18,
                      height: 2,
                      borderRadius: 999,
                      background: "hsl(42 54% 74%)",
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              aria-label="Admin"
              style={{
                color: "hsl(215 30% 50%)",
                padding: "8px",
                borderRadius: 8,
                transition: "color 0.2s",
                display: "flex",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(180 20% 82%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(215 30% 50%)")}
            >
              <Shield size={15} />
            </Link>
            <Link
              to="/proposal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 22px",
                borderRadius: 9,
                background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)",
                color: "hsl(194 65% 15%)",
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "all 0.2s",
                boxShadow: "0 2px 16px hsl(42 54% 74% / 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, hsl(42 54% 78%) 0%, hsl(42 50% 68%) 100%)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 24px hsl(42 54% 74% / 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 16px hsl(42 54% 74% / 0.35)";
              }}
            >
              Get a Proposal <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/proposal"
              style={{
                padding: "7px 14px",
                borderRadius: 7,
                background: "hsl(42 54% 74%)",
                color: "hsl(194 65% 15%)",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Inquire
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{
                padding: 8,
                borderRadius: 8,
                background: "none",
                border: "none",
                color: "hsl(180 20% 88%)",
                cursor: "pointer",
                display: "flex",
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            style={{
              borderTop: "1px solid hsl(179 38% 75% / 0.18)",
              padding: "14px 0 20px",
            }}
            className="lg:hidden flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  padding: "11px 14px",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: isActive(item.href) ? 700 : 500,
                  color: isActive(item.href) ? "hsl(42 54% 74%)" : "hsl(180 20% 88%)",
                  textDecoration: "none",
                  background: isActive(item.href) ? "hsl(42 54% 74% / 0.14)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: "hsl(42 54% 74%)",
                      color: "hsl(194 65% 15%)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div style={{ marginTop: 12, padding: "12px 14px", borderTop: "1px solid hsl(179 38% 75% / 0.15)", fontSize: 12, color: "hsl(180 20% 75%)" }}>
              <p style={{ marginBottom: 4 }}><Phone size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} /> +91 95424 45555 / +91 98490 28657</p>
              <p><Mail size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} /> info@aaspacesinfra.com</p>
            </div>

            <Link
              to="/proposal"
              style={{
                marginTop: 6,
                padding: "13px 14px",
                borderRadius: 9,
                background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)",
                color: "hsl(194 65% 15%)",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                textAlign: "center",
                display: "block",
              }}
            >
              Get a Proposal
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}


