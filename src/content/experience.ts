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
    company: "Redmesh (China)",
    title: "Data Engineer & Power BI Technical Consultant",
    context: "Client: Bosch (China) Investment Ltd.",
    location: "Suzhou, China",
    period: "August 2023 - August 2024",
    highlights: [
      "Developed Python automation and Azure workflows to synchronize data across internal systems.",
      "Built Azure Synapse distributed processing paths for millions of daily records.",
      "Implemented Kafka-based asynchronous messaging with RBAC and API-token authentication.",
      "Created GitHub Actions and Docker CI/CD workflows for validation, testing, and deployment.",
      "Reduced mean time to recovery by 30% through distributed-system troubleshooting with global infrastructure teams.",
      "Improved downstream query performance by 40% with PySpark schema and caching optimization.",
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
      "Validated telemetry collection and application behavior for a patented IoT software platform.",
      "Built API, integration, and regression tests with JUnit, Postman, and Python.",
      "Reduced manual testing time by 40% while expanding coverage.",
      "Supported root-cause analysis with developers and project managers, accelerating delivery by 25% and reducing recurring issues by 15%.",
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
