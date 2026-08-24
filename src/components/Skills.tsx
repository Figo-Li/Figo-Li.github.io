import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Braces,
  Database,
  GitBranch,
  GitPullRequest,
  MonitorSmartphone,
  Network,
  Radio,
  Route,
  TableProperties,
  Workflow,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws, FaJava, FaMicrosoft } from "react-icons/fa";
import {
  SiAngular,
  SiApachekafka,
  SiApachespark,
  SiC,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiGooglecloud,
  SiHtml5,
  SiJunit5,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiSharp,
  SiSpringboot,
  SiSqlite,
  SiTypescript,
} from "react-icons/si";
import { skillGroups } from "../content/skills";

type SkillIconComponent = IconType | LucideIcon;

const skillIcons: Record<string, SkillIconComponent> = {
  Java: FaJava,
  Python: SiPython,
  TypeScript: SiTypescript,
  C: SiC,
  "C++": SiCplusplus,
  "C#": SiSharp,
  SQL: Database,
  "HTML/CSS": SiHtml5,
  "Spring Boot": SiSpringboot,
  Django: SiDjango,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Route,
  WebSockets: Radio,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Redux: SiRedux,
  Angular: SiAngular,
  "Responsive UI": MonitorSmartphone,
  Accessibility,
  PySpark: SiApachespark,
  "Azure Synapse": FaMicrosoft,
  Kafka: SiApachekafka,
  "Data Pipelines": Workflow,
  RAG: Network,
  "Vector Search": Route,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  "Azure SQL": FaMicrosoft,
  SQLite: SiSqlite,
  "Schema Design": TableProperties,
  GCP: SiGooglecloud,
  Azure: FaMicrosoft,
  AWS: FaAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  "GitHub Actions": SiGithubactions,
  "GCP Cloud Build": SiGooglecloud,
  JUnit: SiJunit5,
  Postman: SiPostman,
  "CI/CD": GitPullRequest,
  "Agile/Scrum": GitBranch,
  "Distributed Systems": Network,
  "Event-Driven Architecture": Workflow,
};

export function Skills() {
  return (
    <section
      className="page-section reveal"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading skills-heading">
        <h2 className="eyebrow" id="skills-title">
          SKILLS
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
              {group.skills.map((skill) => {
                const Icon = skillIcons[skill] ?? Braces;

                return (
                  <span className="tag skill-tag" key={skill}>
                    <Icon className="skill-icon" size={17} aria-hidden="true" />
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
