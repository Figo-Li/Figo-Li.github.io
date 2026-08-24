import { Download, ExternalLink } from "lucide-react";

const resumePath = "/Yunze_Li_Software_Engineer_Resume.pdf";
const resumeFileName = "Yunze_Li_Software_Engineer_Resume.pdf";

export function ResumeSection() {
  return (
    <section
      className="page-section reveal resume-section"
      id="resume"
      aria-labelledby="resume-title"
    >
      <div className="section-heading resume-heading">
        <p className="eyebrow">Resume</p>
        <h2 id="resume-title">Yunze Li Software Engineer Resume</h2>
      </div>
      <div className="resume-panel">
        <div className="resume-actions">
          <a
            className="button primary"
            href={resumePath}
            download={resumeFileName}
          >
            <Download size={18} aria-hidden="true" />
            Download Resume
          </a>
          <a
            className="text-link"
            href={resumePath}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
        <iframe
          className="resume-viewer"
          src={resumePath}
          title="Yunze Li Software Engineer Resume"
        >
          <a href={resumePath}>Open Yunze Li Software Engineer Resume PDF</a>
        </iframe>
        <p className="resume-fallback">
          If the preview does not load,{" "}
          <a href={resumePath} target="_blank" rel="noreferrer">
            open the resume PDF
          </a>
          .
        </p>
      </div>
    </section>
  );
}
