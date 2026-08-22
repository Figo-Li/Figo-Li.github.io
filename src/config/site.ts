export type CareerLens = "software" | "data";

export const siteConfig = {
  title: "Yunze (Figo) Li | Software Engineer & Data Engineer",
  description:
    "Portfolio for Yunze (Figo) Li, a software and data engineer focused on scalable applications, cloud systems, and reliable data pipelines.",
  url: "https://figo-li.github.io/",
  repository: "https://github.com/Figo-Li/Figo-Li.github.io",
  email: "figoli925@gmail.com",
  links: {
    github: "https://github.com/Figo-Li",
    linkedin: "https://www.linkedin.com/in/yunze/",
  },
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  lensCopy: {
    software:
      "Software lens: emphasizing full-stack delivery, API design, distributed-system troubleshooting, and cloud-ready application foundations.",
    data: "Data lens: emphasizing pipelines, modeling workflows, analytics systems, and the backend infrastructure that keeps data products reliable.",
  } satisfies Record<CareerLens, string>,
};
