export type ExperienceItem = {
  company: string;
  title: string;
  context: string;
  location: string;
  period: string;
  highlights: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Bosch (China) Investment Ltd.",
    title: "Data Engineer & Power BI Technical Consultant",
    context: "Redmesh",
    location: "Suzhou, China",
    period: "August 2023 - August 2024",
    highlights: [
      "I developed Python automation and Azure workflows to synchronize data across internal systems.",
      "I built Azure Synapse distributed processing paths for millions of daily records.",
      "I implemented Kafka-based asynchronous messaging with RBAC and API-token authentication.",
      "I created GitHub Actions and Docker CI/CD workflows for validation, testing, and deployment.",
      "I reduced mean time to recovery by 30% through distributed-system troubleshooting with global infrastructure teams.",
      "I improved downstream query performance by 40% with PySpark schema and caching optimization.",
    ],
    tags: [
      "Python",
      "Azure",
      "Azure Synapse",
      "Kafka",
      "PySpark",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "Beijing Olym Tiancheng Technology",
    title: "Software Automation Testing Intern",
    context: "IoT Data Analytics Platform",
    location: "Beijing, China",
    period: "June 2020 - May 2021",
    highlights: [
      "I validated telemetry collection and application behavior for a patented IoT software platform.",
      "I built API, integration, and regression tests with JUnit, Postman, and Python.",
      "I reduced manual testing time by 40% while expanding coverage.",
      "I supported root-cause analysis with developers and project managers, accelerating delivery by 25% and reducing recurring issues by 15%.",
    ],
    tags: [
      "JUnit",
      "Postman",
      "Python",
      "API Testing",
      "Regression Testing",
      "IoT",
    ],
  },
];
