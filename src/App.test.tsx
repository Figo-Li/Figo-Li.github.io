import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("portfolio interactions", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("persists and reflects the selected career lens", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Data Engineering" }));

    expect(screen.getByTestId("lens-copy")).toHaveTextContent("Data lens");
    expect(sessionStorage.getItem("figo-career-lens")).toBe("data");
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

  it("keeps the Projects filters and Education logos accessible", async () => {
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

    const expectedByFilter = [
      [
        "All",
        [
          "Hammerly",
          "Gin Rummy Twist",
          "Reddit Comments Analysis Model",
          "Unemployment Rate Prediction Model",
          "Startup Time Optimizer Model",
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
      ["Full-stack", ["Hammerly", "Gin Rummy Twist"]],
      ["Game", ["Gin Rummy Twist"]],
      ["Optimization", ["Startup Time Optimizer Model"]],
      ["Backend", ["Hammerly", "Gin Rummy Twist"]],
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
