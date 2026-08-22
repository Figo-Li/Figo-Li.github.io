import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Link2,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { PointerEvent } from "react";
import type { CareerLens } from "../config/site";
import { profile } from "../content/profile";
import { siteConfig } from "../config/site";
import { CareerLens as CareerLensControl } from "./CareerLens";

type HeroProps = {
  careerLens: CareerLens;
  setCareerLens: (lens: CareerLens) => void;
  onNavigate: (href: string) => void;
};

const updatePortraitLight = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  event.currentTarget.style.setProperty("--light-x", `${x.toFixed(1)}%`);
};

export function Hero({ careerLens, setCareerLens, onNavigate }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow">Portfolio V2 / Horizontal Studio</p>
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
          <CareerLensControl
            careerLens={careerLens}
            setCareerLens={setCareerLens}
          />
        </div>

        <div className="hero-visual reveal is-visible">
          <figure
            className="portrait-card"
            onPointerMove={updatePortraitLight}
            aria-label="Portrait of Yunze (Figo) Li"
          >
            <img src={profile.photo} alt="Portrait of Yunze (Figo) Li" />
            <figcaption>
              <Sparkles size={18} aria-hidden="true" />
              <span>I turn product ideas into reliable systems.</span>
            </figcaption>
          </figure>
          <div className="system-strip" aria-label="Engineering focus areas">
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
