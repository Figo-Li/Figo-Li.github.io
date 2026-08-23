import { skillGroups } from "../content/skills";

export function Skills() {
  return (
    <section
      className="page-section reveal"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2 id="skills-title">
          I organize my toolkit around the systems I like to build.
        </h2>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
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
