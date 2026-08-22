import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CareerLens } from "./config/site";
import { siteConfig } from "./config/site";
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
const panelItems = [{ label: "Intro", href: "#top" }, ...siteConfig.navItems];

const readInitialLens = (): CareerLens => {
  if (typeof sessionStorage === "undefined") return "software";
  const stored = sessionStorage.getItem(lensStorageKey);
  return stored === "data" ? "data" : "software";
};

const getPanelId = (href: string) => href.replace("#", "");
const getPanelIndex = (sectionId: string) =>
  Math.max(
    0,
    panelItems.findIndex((item) => getPanelId(item.href) === sectionId),
  );

export default function App() {
  const [careerLens, setCareerLens] = useState<CareerLens>(readInitialLens);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getPanelIndex(window.location.hash.replace("#", "") || "top");
  });

  const activeSection = getPanelId(panelItems[activeIndex]?.href ?? "#top");

  const navigateTo = (href: string) => {
    const nextIndex = getPanelIndex(getPanelId(href));
    setActiveIndex(nextIndex);
    window.history.replaceState(null, "", panelItems[nextIndex].href);
  };

  useEffect(() => {
    sessionStorage.setItem(lensStorageKey, careerLens);
  }, [careerLens]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, panelItems.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", panelItems[activeIndex].href);
  }, [activeIndex]);

  const pageState = useMemo(
    () => ({
      careerLens,
      setCareerLens,
    }),
    [careerLens],
  );

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />
      <main className="deck-stage" aria-label="Portfolio pages">
        <div
          className="deck-track"
          style={{ transform: `translate3d(-${activeIndex * 100}vw, 0, 0)` }}
        >
          <Hero {...pageState} onNavigate={navigateTo} />
          <About />
          <ExperienceTimeline />
          <ProjectExplorer careerLens={careerLens} />
          <Skills careerLens={careerLens} />
          <Education />
          <ResumeNotice />
          <Contact />
        </div>
      </main>
      <DeckControls
        activeIndex={activeIndex}
        items={panelItems}
        onNavigate={navigateTo}
      />
      <Footer />
    </>
  );
}

type DeckControlsProps = {
  activeIndex: number;
  items: typeof panelItems;
  onNavigate: (href: string) => void;
};

function DeckControls({ activeIndex, items, onNavigate }: DeckControlsProps) {
  const previous = items[Math.max(activeIndex - 1, 0)];
  const next = items[Math.min(activeIndex + 1, items.length - 1)];

  return (
    <aside className="deck-controls" aria-label="Page navigation">
      <button
        className="icon-button"
        type="button"
        aria-label="Previous page"
        disabled={activeIndex === 0}
        onClick={() => onNavigate(previous.href)}
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <div className="deck-progress" aria-hidden="true">
        <span
          style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
        />
      </div>
      <div className="deck-dots">
        {items.map((item, index) => (
          <button
            key={item.href}
            type="button"
            aria-label={`${item.label} page`}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => onNavigate(item.href)}
          />
        ))}
      </div>
      <button
        className="icon-button"
        type="button"
        aria-label="Next page"
        disabled={activeIndex === items.length - 1}
        onClick={() => onNavigate(next.href)}
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </aside>
  );
}
