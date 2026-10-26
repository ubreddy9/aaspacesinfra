import { Link } from "react-router";
import { ArrowUpRight, MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react";

const marqueeItems = [
  "Pre-Engineered Buildings", "Industrial Warehouses", "Commercial Structures",
  "Turnkey Construction", "Steel Fabrication", "Cold Storage", "Factory Sheds",
  "Convention Centres", "Pre-Engineered Buildings", "Industrial Warehouses",
  "Commercial Structures", "Turnkey Construction", "Steel Fabrication",
  "Cold Storage", "Factory Sheds", "Convention Centres",
];

export default function Footer() {
  return (
    <footer style={{ background: "hsl(194 62% 10%)" }}>
      {/* Amber top line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, hsl(194 65% 23%), hsl(42 54% 74%), hsl(179 38% 75%), hsl(42 54% 74%), hsl(194 65% 23%)), hsl(28 95% 62%), hsl(28 95% 52%), hsl(215 72% 35%))" }} />

      {/* Marquee strip */}
      <div
        style={{
          borderBottom: "1px solid hsl(179 38% 75% / 0.12)",
          padding: "12px 0",
          overflow: "hidden",
        }}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              style={{
                padding: "0 36px",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "hsl(42 54% 74%)" : "hsl(180 20% 45%)",
                whiteSpace: "nowrap",
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              {i % 2 === 0 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(42 54% 74%)", display: "inline-block", marginRight: 8 }} />}{item}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 0.8fr 0.8fr 1.1fr",
            gap: 48,
            paddingBottom: 48,
            borderBottom: "1px solid hsl(179 38% 75% / 0.12)",
          }}
          className="grid-cols-1 md:grid-cols-2 lg:!grid-cols-4"
        >
          {/* Brand */}
          <div>
            <img
              src="/assets/brand/logo-light.png"
              alt="AA Spaces Infra"
              style={{
                height: 56,
                maxheight: 56,
                width: "auto",
                maxWidth: 240,
                objectFit: "contain",
                marginBottom: 20,
                display: "block",
              }}
            />
            <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "hsl(215 20% 50%)", maxWidth: 300 }}>
              Delivering precision-engineered steel structures for industrial, commercial,
              and institutional projects across India.
            </p>

            {/* Certifications & Codes */}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: "hsl(42 54% 74%)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, fontFamily: '"Space Grotesk", sans-serif' }}>
                Structural Design Standards
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { code: "IS:800", label: "General Steel Design" },
                  { code: "IS:875", label: "Wind & Seismic Loads" },
                  { code: "IS:2062", label: "Steel Quality" },
                  { code: "ISO 9001", label: "Fabrication QA" },
                ].map((cert) => (
                  <span
                    key={cert.code}
                    title={cert.label}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      background: "hsl(194 65% 14%)",
                      color: "hsl(179 38% 85%)",
                      border: "1px solid hsl(179 38% 75% / 0.22)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "hsl(42 54% 74%)" }} />
                    {cert.code}
                  </span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {[
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "hsl(179 38% 75% / 0.12)",
                    border: "1px solid hsl(215 35% 20%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "hsl(215 25% 55%)",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(28 95% 52% / 0.12)";
                    e.currentTarget.style.borderColor = "hsl(28 95% 52% / 0.3)";
                    e.currentTarget.style.color = "hsl(28 95% 62%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "hsl(179 38% 75% / 0.12)";
                    e.currentTarget.style.borderColor = "hsl(215 35% 20%)";
                    e.currentTarget.style.color = "hsl(215 25% 55%)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, fontFamily: '"Space Grotesk", sans-serif' }}>
              Company
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { to: "/about", label: "About AA Spaces" },
                { to: "/capabilities", label: "Products & Services" },
                { to: "/projects", label: "Projects" },
                { to: "/proposal", label: "Get a Proposal" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{ fontSize: 13.5, color: "hsl(215 20% 50%)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(215 10% 80%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(215 20% 50%)")}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Solutions */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, fontFamily: '"Space Grotesk", sans-serif' }}>
              Solutions
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Warehouses", "Industrial Facilities", "Commercial Structures",
                "Hospitality Spaces", "Convention Centres", "Cold Storage",
              ].map((s) => (
                <li key={s} style={{ fontSize: 13.5, color: "hsl(215 20% 50%)" }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact + CTA */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: "hsl(28 95% 58%)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, fontFamily: '"Space Grotesk", sans-serif' }}>
              Contact
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                { Icon: Phone, text: "+91 87122 07555", href: "tel:+918712207555" },
                { Icon: Mail, text: "connect@aaspacesinfra.com", href: "mailto:connect@aaspacesinfra.com" },
                { Icon: MapPin, text: "Hyderabad, Telangana, India", href: undefined },
              ].map(({ Icon, text, href }) => {
                const Tag = href ? "a" : "span";
                return (
                  <Tag
                    key={text}
                    {...(href ? { href } : {})}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 9,
                      fontSize: 13.5,
                      color: "hsl(215 20% 50%)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    {...(href ? {
                      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "hsl(215 10% 80%)"),
                      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "hsl(215 20% 50%)"),
                    } : {})}
                  >
                    <Icon size={14} style={{ marginTop: 2, flexShrink: 0, color: "hsl(42 54% 74%)" }} />
                    {text}
                  </Tag>
                );
              })}
            </div>

            <Link
              to="/proposal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "11px 20px",
                borderRadius: 9,
                background: "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)", color: "hsl(194 65% 15%)",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "all 0.2s",
                boxShadow: "0 4px 20px hsl(42 54% 74% / 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, hsl(42 54% 78%) 0%, hsl(42 50% 68%) 100%)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, hsl(42 54% 74%) 0%, hsl(42 50% 64%) 100%)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Request Proposal <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "hsl(215 25% 35%)" }}>
            &copy; {new Date().getFullYear()} AA Spaces Infra. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "hsl(215 25% 30%)" }}>
            Pre-Engineered Building Solutions &bull; India
          </p>
        </div>
      </div>
    </footer>
  );
}

