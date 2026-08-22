import { BriefcaseBusiness } from "lucide-react";
import { experience } from "../content/experience";

export function ExperienceTimeline() {
  return (
    <section
      className="page-section reveal"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">
          Engineering work across data systems and test automation.
        </h2>
      </div>
      <div className="timeline">
        {experience.map((item) => (
          <article
            className="timeline-item"
            key={`${item.company}-${item.period}`}
          >
            <div className="timeline-icon" aria-hidden="true">
              <BriefcaseBusiness size={20} />
            </div>
            <div className="timeline-body">
              <div className="item-kicker">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="item-company">{item.company}</p>
              <p className="item-context">{item.context}</p>
              <ul className="check-list">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
