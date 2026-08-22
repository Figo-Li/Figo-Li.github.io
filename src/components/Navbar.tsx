import { FileText, GitBranch, Link2, Menu, X } from "lucide-react";
import { type MouseEvent, useEffect, useState } from "react";
import { siteConfig } from "../config/site";
import { profile } from "../content/profile";

type NavbarProps = {
  activeSection: string;
  onNavigate: (href: string) => void;
};

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollX > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleNavigate =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onNavigate(href);
      closeMenu();
    };

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a
          className="brand-mark"
          href="#top"
          onClick={handleNavigate("#top")}
          aria-label="Yunze Li home"
        >
          <img src={profile.photo} alt="" />
          <span>Figo</span>
        </a>

        <button
          className="icon-button nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          title={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {siteConfig.navItems.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavigate(item.href)}
                className={activeSection === id ? "is-active" : ""}
              >
                {item.label === "Resume" ? (
                  <FileText size={16} aria-hidden="true" />
                ) : null}
                {item.label}
              </a>
            );
          })}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            <GitBranch size={16} aria-hidden="true" />
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            <Link2 size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}
