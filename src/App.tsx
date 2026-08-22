import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

const canScrollVertically = (target: EventTarget | null, deltaY: number) => {
  let element = target instanceof Element ? target : null;

  while (element && !element.classList.contains("horizontal-stage")) {
    if (element instanceof HTMLElement) {
      const styles = window.getComputedStyle(element);
      const canScroll =
        /(auto|scroll)/.test(styles.overflowY) &&
        element.scrollHeight > element.clientHeight + 1;
      const canMoveDown =
        deltaY > 0 &&
        element.scrollTop < element.scrollHeight - element.clientHeight - 1;
      const canMoveUp = deltaY < 0 && element.scrollTop > 0;

      if (canScroll && (canMoveDown || canMoveUp)) return true;
    }
    element = element.parentElement;
  }

  return false;
};

export default function App() {
  const railRef = useRef<HTMLElement | null>(null);
  const [careerLens, setCareerLens] = useState<CareerLens>(readInitialLens);
  const [activeSection, setActiveSection] = useState("top");

  const navigateTo = (href: string) => {
    const id = getPanelId(href);
    const panel = document.getElementById(id);
    if (!panel) return;

    panel.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveSection(id);
    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    sessionStorage.setItem(lensStorageKey, careerLens);
  }, [careerLens]);

  useEffect(() => {
    const rail = railRef.current;
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
    if (!rail || !("IntersectionObserver" in window)) {
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
      { root: rail, threshold: 0.28 },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateActiveSection = () => {
      const railRect = rail.getBoundingClientRect();
      const panels = Array.from(
        rail.querySelectorAll<HTMLElement>("section[id]"),
      );
      const closest = panels.reduce<HTMLElement | null>((best, panel) => {
        if (!best) return panel;
        const panelDistance = Math.abs(
          panel.getBoundingClientRect().left - railRect.left,
        );
        const bestDistance = Math.abs(
          best.getBoundingClientRect().left - railRect.left,
        );
        return panelDistance < bestDistance ? panel : best;
      }, null);

      if (closest?.id) setActiveSection(closest.id);
    };

    updateActiveSection();
    rail.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      rail.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (canScrollVertically(event.target, event.deltaY)) return;

      event.preventDefault();
      rail.scrollBy({ left: event.deltaY * 1.1, behavior: "auto" });
    };

    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, input, textarea, select")
      )
        return;

      dragging = true;
      startX = event.clientX;
      startLeft = rail.scrollLeft;
      rail.classList.add("is-dragging");
      rail.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      event.preventDefault();
      rail.scrollLeft = startLeft - (event.clientX - startX);
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      rail.classList.remove("is-dragging");
      if (rail.hasPointerCapture(event.pointerId))
        rail.releasePointerCapture(event.pointerId);
    };

    rail.addEventListener("wheel", onWheel, { passive: false });
    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", endDrag);
    rail.addEventListener("pointercancel", endDrag);

    return () => {
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", endDrag);
      rail.removeEventListener("pointercancel", endDrag);
    };
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
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />
      <main
        className="horizontal-stage"
        ref={railRef}
        aria-label="Portfolio sections"
      >
        <Hero {...pageState} onNavigate={navigateTo} />
        <About />
        <ExperienceTimeline />
        <ProjectExplorer careerLens={careerLens} />
        <Skills careerLens={careerLens} />
        <Education />
        <ResumeNotice />
        <Contact />
      </main>
      <DeckControls
        activeSection={activeSection}
        items={panelItems}
        onNavigate={navigateTo}
      />
      <Footer />
    </>
  );
}

type DeckControlsProps = {
  activeSection: string;
  items: typeof panelItems;
  onNavigate: (href: string) => void;
};

function DeckControls({ activeSection, items, onNavigate }: DeckControlsProps) {
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => getPanelId(item.href) === activeSection),
  );
  const previous = items[Math.max(activeIndex - 1, 0)];
  const next = items[Math.min(activeIndex + 1, items.length - 1)];

  return (
    <aside className="deck-controls" aria-label="Section navigation">
      <button
        className="icon-button"
        type="button"
        aria-label="Previous section"
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
            aria-label={item.label}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => onNavigate(item.href)}
          />
        ))}
      </div>
      <button
        className="icon-button"
        type="button"
        aria-label="Next section"
        disabled={activeIndex === items.length - 1}
        onClick={() => onNavigate(next.href)}
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </aside>
  );
}
