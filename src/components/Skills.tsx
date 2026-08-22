import type { CareerLens } from "../config/site";
import { skillGroups } from "../content/skills";

type SkillsProps = {
  careerLens: CareerLens;
};

export function Skills({ careerLens }: SkillsProps) {
  const sortedGroups = [...skillGroups].sort(
    (a, b) =>
      b.lensWeight[careerLens] - a.lensWeight[careerLens] ||
      a.title.localeCompare(b.title),
  );

  return (
    <section
      className="page-section reveal"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2 id="skills-title">
          Grouped by the work recruiters need to evaluate.
        </h2>
      </div>
      <div className="skills-grid">
        {sortedGroups.map((group, index) => (
          <article
            className={`skill-group ${index < 3 ? "is-emphasized" : ""}`}
            key={group.title}
          >
            <h3>{group.title}</h3>
            <div className="tag-row">
              {group.skills.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
