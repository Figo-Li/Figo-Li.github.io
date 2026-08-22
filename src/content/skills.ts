import type { CareerLens } from "../config/site";

export type SkillGroup = {
  title: string;
  skills: string[];
  lensWeight: Record<CareerLens, number>;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      "Java",
      "Python",
      "TypeScript",
      "C",
      "C++",
      "C#",
      "SQL",
      "HTML/CSS",
    ],
    lensWeight: { software: 10, data: 9 },
  },
  {
    title: "Backend and APIs",
    skills: [
      "Spring Boot",
      "Django",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
    ],
    lensWeight: { software: 10, data: 7 },
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Redux",
      "Angular",
      "Responsive UI",
      "Accessibility",
    ],
    lensWeight: { software: 9, data: 4 },
  },
  {
    title: "Data Engineering",
    skills: [
      "PySpark",
      "Azure Synapse",
      "Kafka",
      "Data Pipelines",
      "RAG",
      "Vector Search",
    ],
    lensWeight: { software: 6, data: 10 },
  },
  {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Azure SQL",
      "SQLite",
      "Schema Design",
    ],
    lensWeight: { software: 8, data: 9 },
  },
  {
    title: "Cloud and DevOps",
    skills: [
      "GCP",
      "Azure",
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "GCP Cloud Build",
    ],
    lensWeight: { software: 9, data: 9 },
  },
  {
    title: "Testing and Engineering Practices",
    skills: [
      "JUnit",
      "Postman",
      "CI/CD",
      "Agile/Scrum",
      "Distributed Systems",
      "Event-Driven Architecture",
    ],
    lensWeight: { software: 8, data: 7 },
  },
];
