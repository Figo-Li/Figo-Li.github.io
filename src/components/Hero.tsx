import {
  ArrowDown,
  ExternalLink,
  GitBranch,
  Link2,
  MapPin,
} from "lucide-react";
import type { CareerLens } from "../config/site";
import { profile } from "../content/profile";
import { siteConfig } from "../config/site";
import { CareerLens as CareerLensControl } from "./CareerLens";

type HeroProps = {
  careerLens: CareerLens;
  setCareerLens: (lens: CareerLens) => void;
};

export function Hero({ careerLens, setCareerLens }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow">Portfolio V1</p>
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
            <a className="button primary" href="#projects">
              View Projects
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="#resume">
              View Resume
            </a>
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
          <CareerLensControl
            careerLens={careerLens}
            setCareerLens={setCareerLens}
          />
        </div>

        <div
          className="hero-visual reveal is-visible"
          aria-label="System themed Yunze Li initials visual"
        >
          <div className="initials-panel">
            <div className="initials">YL</div>
            <div className="signal-grid">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="system-strip">
            <span>APIs</span>
            <span>Data</span>
            <span>Cloud</span>
            <span>CI/CD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
