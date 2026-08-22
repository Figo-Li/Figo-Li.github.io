import { Check, Copy, GitBranch, Link2, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { profile } from "../content/profile";
import { siteConfig } from "../config/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      const input = document.createElement("input");
      input.value = siteConfig.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      className="page-section reveal"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">
          Open to software, backend, data, and cloud engineering roles.
        </h2>
      </div>
      <div className="contact-layout">
        <div>
          <p className="section-lead">
            The fastest way to reach Yunze is by email. Recruiters and
            engineering teams can also review public source work on GitHub or
            connect through LinkedIn.
          </p>
          <div className="contact-actions">
            <a className="button primary" href={`mailto:${siteConfig.email}`}>
              <Mail size={18} aria-hidden="true" />
              Email Yunze
            </a>
            <button
              className="button secondary"
              type="button"
              onClick={copyEmail}
            >
              {copied ? (
                <Check size={18} aria-hidden="true" />
              ) : (
                <Copy size={18} aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy Email"}
            </button>
          </div>
        </div>
        <address className="contact-list">
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={18} aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            <Link2 size={18} aria-hidden="true" />
            LinkedIn
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <GitBranch size={18} aria-hidden="true" />
            GitHub
          </a>
          <span>
            <MapPin size={18} aria-hidden="true" />
            {profile.location}
          </span>
        </address>
      </div>
    </section>
  );
}
