import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { skillGroups } from "./content/skills";

describe("portfolio interactions", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    window.history.replaceState(null, "", "/");
  });

  it("renders the merged hero and about homepage without old role or availability UI", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Yunze (Figo) Li" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(
      screen.getAllByText("Kitchener, Ontario, Canada").length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByText("Open to Software Engineering opportunities"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /I’m Yunze \(Figo\) Li, a Master of Engineering student/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "I build reliable software from backend systems to real-time products.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Most of my experience is in backend development/),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Software Engineering" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("lens-copy")).not.toBeInTheDocument();
    expect(screen.queryByText("APIs")).not.toBeInTheDocument();
  });

  it("keeps the requested homepage section order", () => {
    const { container } = render(<App />);
    const sectionIds = [...container.querySelectorAll("main > section")].map(
      (section) => section.id,
    );

    expect(sectionIds.slice(0, 7)).toEqual([
      "top",
      "about",
      "experience",
      "projects",
      "skills",
      "education",
      "contact",
    ]);
  });

  it("uses Bosch as the primary experience title and Redmesh as the subtitle", () => {
    render(<App />);

    const company = screen.getByText("Bosch (China) Investment Ltd.");
    const redmeshSubtitle = screen
      .getAllByText("Redmesh")
      .find((element) => element.classList.contains("item-context"));

    expect(company).toHaveClass("item-company");
    expect(redmeshSubtitle).toBeInTheDocument();
    expect(screen.queryByText(/Client:/)).not.toBeInTheDocument();
  });

  it("shows all projects without project filter controls and expands a case study", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByText("Focus")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "All" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "NLP" }),
    ).not.toBeInTheDocument();

    for (const heading of [
      "Reddit Comments Analysis Model",
      "Gin Rummy Twist",
      "Unemployment Rate Prediction Model",
      "Startup Time Optimizer Model",
      "Hammerly",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading }),
      ).toBeInTheDocument();
    }

    const redditCard = screen
      .getByRole("heading", { name: "Reddit Comments Analysis Model" })
      .closest("article");
    expect(redditCard).not.toBeNull();
    const categoryLabel = (redditCard as HTMLElement).querySelector(
      ".item-kicker",
    );
    expect(categoryLabel).not.toBeNull();
    expect(categoryLabel).toHaveTextContent("NLP");

    await user.click(
      within(redditCard as HTMLElement).getByRole("button", {
        name: "Expand case study",
      }),
    );

    expect(
      within(redditCard as HTMLElement).getByText("Problem"),
    ).toBeInTheDocument();
  });

  it("keeps repository links, Education logos, skill icons, and the embedded resume accessible", () => {
    const { container } = render(<App />);

    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("University of Waterloo crest")).toHaveAttribute(
      "src",
      "/images/education/waterloo-crest.svg",
    );
    expect(screen.getByAltText("McMaster University logo")).toHaveAttribute(
      "src",
      "/images/education/mcmaster-logo.svg",
    );

    expect(
      screen.getByRole("link", {
        name: "Reddit Comments Analysis Model repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Figo-Li/reddit-comments-analysis-model",
    );
    expect(
      screen.getByRole("link", { name: "Gin Rummy Twist repository" }),
    ).toHaveAttribute("href", "https://github.com/Figo-Li/gin-rummy-twist");
    expect(
      screen.getByRole("link", {
        name: "Unemployment Rate Prediction Model repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Figo-Li/unemployment-rate-predict-model",
    );
    expect(
      screen.getByRole("link", {
        name: "Startup Time Optimizer Model repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Figo-Li/startup-time-optimizer-model",
    );
    expect(
      screen.getByRole("link", { name: "Hammerly repository" }),
    ).toHaveAttribute("href", "https://github.com/Figo-Li/Hammerly");

    expect(screen.getByRole("heading", { name: "SKILLS" })).toBeInTheDocument();
    expect(
      screen.queryByText(
        "I organize my toolkit around the systems I like to build.",
      ),
    ).not.toBeInTheDocument();
    const skillCount = skillGroups.reduce(
      (total, group) => total + group.skills.length,
      0,
    );
    expect(container.querySelectorAll(".skill-tag .skill-icon")).toHaveLength(
      skillCount,
    );

    expect(
      screen.getByTitle("Yunze Li Software Engineer Resume"),
    ).toHaveAttribute("src", "/Yunze_Li_Software_Engineer_Resume.pdf");
    expect(
      screen.getByRole("link", { name: "Download Resume" }),
    ).toHaveAttribute("download", "Yunze_Li_Software_Engineer_Resume.pdf");
    expect(screen.queryByText(/Request PDF by email/)).not.toBeInTheDocument();
  });

  it("copies the public email address", async () => {
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(true),
    });
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    const user = userEvent.setup();

    render(<App />);
    await user.click(screen.getByRole("button", { name: "Copy Email" }));

    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });
});
