import { ChevronDown, ExternalLink, GitBranch } from "lucide-react";
import { useState } from "react";
import { projects, type Project } from "../content/projects";

export function ProjectExplorer() {
  const [expanded, setExpanded] = useState<string | null>("hammerly");

  return (
    <section
      className="page-section reveal"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="projects-title">Projects</h2>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expanded === project.id}
            onToggle={() =>
              setExpanded((current) =>
                current === project.id ? null : project.id,
              )
            }
          />
        ))}
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
};

function ProjectCard({ project, expanded, onToggle }: ProjectCardProps) {
  return (
    <article className="project-card">
      <ProjectVisual type={project.visual} />
      <div className="project-card-body">
        <div className="project-title-row">
          <div>
            <p className="item-kicker">{project.category}</p>
            <h3>{project.name}</h3>
          </div>
          {project.repository ? (
            <a
              className="icon-button"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} repository`}
              title={`${project.name} repository`}
            >
              <GitBranch size={18} aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <p>{project.description}</p>
        <p className="role-line">{project.role}</p>
        <ul className="highlight-list">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="tag-row">
          {project.technologies.map((technology) => (
            <span className="tag" key={technology}>
              {technology}
            </span>
          ))}
        </div>
        <div className="project-actions">
          {project.repository ? (
            <a
              className="text-link"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
            >
              Repository
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="source-note">Repository pending verification</span>
          )}
          {project.secondaryRepository ? (
            <a
              className="text-link"
              href={project.secondaryRepository}
              target="_blank"
              rel="noreferrer"
            >
              Dataset repo
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
          {project.demo ? (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <button
          className="details-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={`${project.id}-details`}
          onClick={onToggle}
        >
          {expanded ? "Hide case study" : "Expand case study"}
          <ChevronDown size={18} aria-hidden="true" />
        </button>
      </div>
      {expanded ? <ProjectDetails project={project} /> : null}
    </article>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const details = [
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["Important Engineering Decisions", project.decisions.join(" ")],
    ["Technical Challenges", project.challenges.join(" ")],
    ["Measurable or Verified Result", project.result],
    ["Verification", project.verification],
  ];

  return (
    <div className="project-details" id={`${project.id}-details`}>
      <div
        className="architecture-diagram"
        aria-label={`${project.name} architecture`}
      >
        {project.architecture.map((step, index) => (
          <div className="diagram-step" key={step}>
            <span>{step}</span>
            {index < project.architecture.length - 1 ? (
              <b aria-hidden="true">to</b>
            ) : null}
          </div>
        ))}
      </div>
      <dl>
        {details.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ProjectVisual({ type }: { type: Project["visual"] }) {
  return (
    <div className={`project-visual ${type}`} aria-hidden="true">
      {type === "auction" ? (
        <>
          <span className="bid-line wide" />
          <span className="bid-line" />
          <span className="bid-pill">BID</span>
        </>
      ) : null}
      {type === "cards" ? (
        <>
          <span className="card-shape one">12</span>
          <span className="card-shape two">A</span>
          <span className="card-shape three">B</span>
        </>
      ) : null}
      {type === "rag" ? (
        <>
          <span className="node input">Food</span>
          <span className="node vector">Vector</span>
          <span className="node output">Plan</span>
        </>
      ) : null}
      {type === "forecast" ? <span className="chart-line" /> : null}
      {type === "optimizer" ? (
        <>
          <span className="optimizer-track" />
          <span className="optimizer-dot one" />
          <span className="optimizer-dot two" />
          <span className="optimizer-dot three" />
          <span className="optimizer-gain">-42%</span>
        </>
      ) : null}
      {type === "nlp" ? (
        <>
          <span className="comment-bar" />
          <span className="comment-bar short" />
          <span className="label-stack">NLP</span>
        </>
      ) : null}
    </div>
  );
}
