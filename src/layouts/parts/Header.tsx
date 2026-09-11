import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, X, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/capabilities", label: "Products & Services" },
  { href: "/projects", label: "Projects" },
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
          ? "hsl(215 35% 10% / 0.92)"
          : "hsl(215 35% 10%)",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: "1px solid hsl(215 35% 20%)",
        boxShadow: scrolled ? "0 4px 32px hsl(215 72% 5% / 0.4)" : "none",
      }}
    >
      {/* Top notice bar */}
      <div
        style={{
          background: "hsl(215 72% 18%)",
          borderBottom: "1px solid hsl(215 50% 25%)",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          <p style={{ color: "hsl(215 40% 70%)" }}>
            Engineering precision. Built for India.
          </p>
          <Link
            to="/proposal"
            style={{
              display: "none",
              alignItems: "center",
              gap: 4,
              color: "hsl(28 95% 62%)",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 11,
              letterSpacing: "0.04em",
            }}
            className="sm:!flex"
          >
            Start a project <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
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
            style={{ flexShrink: 0, display: "flex", alignItems: "center" }}
          >
            <img
              src="/airo-assets/images/logo/horizontal/dark"
              alt="AA Spaces"
              style={{
                height: 38,
                maxHeight: 38,
                width: "auto",
                maxWidth: 180,
                objectFit: "contain",
                display: "block",
              }}
            />
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
                  fontWeight: isActive(item.href) ? 600 : 500,
                  letterSpacing: "0.01em",
                  color: isActive(item.href)
                    ? "hsl(28 95% 62%)"
                    : "hsl(215 20% 75%)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: isActive(item.href)
                    ? "hsl(28 95% 52% / 0.08)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "hsl(215 40% 22%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "hsl(215 20% 75%)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {item.label}
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
                      background: "hsl(28 95% 58%)",
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(215 20% 75%)")}
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
                background: "hsl(28 95% 52%)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "all 0.2s",
                boxShadow: "0 2px 16px hsl(28 95% 52% / 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(28 95% 46%)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 24px hsl(28 95% 52% / 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "hsl(28 95% 52%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 16px hsl(28 95% 52% / 0.35)";
              }}
            >
              Get a Proposal <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="lg:hidden"
            style={{
              padding: 8,
              borderRadius: 8,
              background: "none",
              border: "none",
              color: "hsl(215 20% 75%)",
              cursor: "pointer",
              display: "flex",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            style={{
              borderTop: "1px solid hsl(215 35% 20%)",
              padding: "12px 0 16px",
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
                  fontWeight: isActive(item.href) ? 600 : 500,
                  color: isActive(item.href) ? "hsl(28 95% 62%)" : "hsl(215 20% 72%)",
                  textDecoration: "none",
                  background: isActive(item.href) ? "hsl(28 95% 52% / 0.08)" : "transparent",
                  display: "block",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/proposal"
              style={{
                marginTop: 10,
                padding: "13px 14px",
                borderRadius: 9,
                background: "hsl(28 95% 52%)",
                color: "#fff",
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
