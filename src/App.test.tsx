import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("portfolio interactions", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    window.history.replaceState(null, "", "/");
  });

  it("renders the merged hero and about homepage without the old role selector", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Yunze (Figo) Li" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
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

  it("filters projects and expands a case study", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "NLP" }));

    expect(
      screen.getByRole("heading", { name: "Reddit Comments Analysis Model" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Hammerly" }),
    ).not.toBeInTheDocument();

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

  it("keeps the Projects filters, repository links, and Education logos accessible", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Case studies by focus area."),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Focus")).toBeInTheDocument();
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

    const expectedByFilter = [
      [
        "All",
        [
          "Reddit Comments Analysis Model",
          "Gin Rummy Twist",
          "Unemployment Rate Prediction Model",
          "Startup Time Optimizer Model",
          "Hammerly",
        ],
      ],
      ["NLP", ["Reddit Comments Analysis Model"]],
      [
        "Machine Learning",
        [
          "Reddit Comments Analysis Model",
          "Unemployment Rate Prediction Model",
          "Startup Time Optimizer Model",
        ],
      ],
      ["Full-stack", ["Gin Rummy Twist", "Hammerly"]],
      ["Game", ["Gin Rummy Twist"]],
      ["Optimization", ["Startup Time Optimizer Model"]],
      ["Backend", ["Gin Rummy Twist", "Hammerly"]],
    ] as const;

    for (const [filter, headings] of expectedByFilter) {
      await user.click(screen.getByRole("button", { name: filter }));

      for (const heading of headings) {
        expect(
          screen.getByRole("heading", { name: heading }),
        ).toBeInTheDocument();
      }
    }
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
