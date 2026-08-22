import { AlertTriangle, Mail } from "lucide-react";
import { profile } from "../content/profile";
import { siteConfig } from "../config/site";

export function ResumeNotice() {
  return (
    <section
      className="page-section reveal resume-section"
      id="resume"
      aria-labelledby="resume-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Resume</p>
        <h2 id="resume-title">
          Verified resume content is represented on this page.
        </h2>
      </div>
      <div className="resume-notice">
        <AlertTriangle size={22} aria-hidden="true" />
        <div>
          <p>{profile.resumeStatus}</p>
          <a
            className="button secondary"
            href={`mailto:${siteConfig.email}?subject=Resume request for Yunze Li`}
          >
            <Mail size={18} aria-hidden="true" />
            Request PDF by email
          </a>
        </div>
      </div>
    </section>
  );
}
