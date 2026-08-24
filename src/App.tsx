import { useEffect, useState } from "react";
import { siteConfig } from "./config/site";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectExplorer } from "./components/ProjectExplorer";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { ResumeSection } from "./components/ResumeSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const sectionHrefs = ["#top", ...siteConfig.navItems.map((item) => item.href)];

const getSectionId = (href: string) => href.replace("#", "") || "top";

const readInitialSection = () => {
  if (typeof window === "undefined") return "top";
  return getSectionId(window.location.hash || "#top");
};

export default function App() {
  const [activeSection, setActiveSection] = useState(readInitialSection);

  const navigateTo = (href: string) => {
    const sectionId = getSectionId(href);
    const target = document.getElementById(sectionId);

    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }, []);

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const sectionId = getSectionId(window.location.hash || "#top");
      const target = document.getElementById(sectionId);

      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    };

    window.addEventListener("popstate", scrollToCurrentHash);
    window.addEventListener("hashchange", scrollToCurrentHash);

    if (window.location.hash) {
      requestAnimationFrame(scrollToCurrentHash);
    }

    return () => {
      window.removeEventListener("popstate", scrollToCurrentHash);
      window.removeEventListener("hashchange", scrollToCurrentHash);
    };
  }, []);

  useEffect(() => {
    const sections = sectionHrefs
      .map((href) => document.getElementById(getSectionId(href)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.12, 0.34, 0.62],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />
      <main className="site-main" aria-label="Portfolio content">
        <Hero onNavigate={navigateTo} />
        <About />
        <ExperienceTimeline />
        <ProjectExplorer />
        <Skills />
        <Education />
        <Contact />
        <ResumeSection />
      </main>
      <Footer />
    </>
  );
}
