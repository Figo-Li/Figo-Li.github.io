import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Link2,
  MapPin,
} from "lucide-react";
import { profile } from "../content/profile";
import { siteConfig } from "../config/site";

type HeroProps = {
  onNavigate: (href: string) => void;
};

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow">Portfolio / Software Engineer</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-intro">{profile.headline}</p>
          <div className="hero-meta" aria-label="Profile details">
            <span>
              <MapPin size={18} aria-hidden="true" />
              {profile.location}
            </span>
            <span>{profile.availability}</span>
          </div>
          <div className="hero-actions">
            <button
              className="button primary"
              type="button"
              onClick={() => onNavigate("#projects")}
            >
              View Projects
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => onNavigate("#resume")}
            >
              View Resume
            </button>
          </div>
          <div className="hero-socials" aria-label="External profile links">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <GitBranch size={18} aria-hidden="true" />
              GitHub
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Link2 size={18} aria-hidden="true" />
              LinkedIn
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-visual reveal is-visible">
          <figure
            className="portrait-card"
            aria-label="Portrait of Yunze (Figo) Li"
          >
            <img src={profile.photo} alt="Portrait of Yunze (Figo) Li" />
          </figure>
        </div>
      </div>
    </section>
  );
}
