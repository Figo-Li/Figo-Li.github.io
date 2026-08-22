import { FileText, GitBranch, Link2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "../config/site";

type NavbarProps = {
  activeSection: string;
};

export function Navbar({ activeSection }: NavbarProps) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a
          className="brand-mark"
          href="#top"
          onClick={closeMenu}
          aria-label="Yunze Li home"
        >
          <span>YL</span>
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
                onClick={closeMenu}
                className={activeSection === id ? "is-active" : ""}
              >
                {item.label}
              </a>
            );
          })}
          <a href="#resume" onClick={closeMenu}>
            <FileText size={16} aria-hidden="true" />
            Resume
          </a>
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
