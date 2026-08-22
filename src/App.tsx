import { useEffect, useMemo, useState } from "react";
import type { CareerLens } from "./config/site";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectExplorer } from "./components/ProjectExplorer";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { ResumeNotice } from "./components/ResumeNotice";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const lensStorageKey = "figo-career-lens";

const readInitialLens = (): CareerLens => {
  if (typeof sessionStorage === "undefined") return "software";
  const stored = sessionStorage.getItem(lensStorageKey);
  return stored === "data" ? "data" : "software";
};

export default function App() {
  const [careerLens, setCareerLens] = useState<CareerLens>(readInitialLens);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    sessionStorage.setItem(lensStorageKey, careerLens);
  }, [careerLens]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    if (!("IntersectionObserver" in window)) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, []);

  const pageState = useMemo(
    () => ({
      careerLens,
      setCareerLens,
    }),
    [careerLens],
  );

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero {...pageState} />
        <About />
        <ExperienceTimeline />
        <ProjectExplorer careerLens={careerLens} />
        <Skills careerLens={careerLens} />
        <Education />
        <ResumeNotice />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
