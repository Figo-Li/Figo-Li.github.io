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

    await user.click(screen.getByRole("button", { name: "Data / ML" }));

    expect(
      screen.getByRole("heading", { name: "Lychee Nutrition App" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Hammerly" }),
    ).not.toBeInTheDocument();

    const lycheeCard = screen
      .getByRole("heading", { name: "Lychee Nutrition App" })
      .closest("article");
    expect(lycheeCard).not.toBeNull();

    await user.click(
      within(lycheeCard as HTMLElement).getByRole("button", {
        name: "Expand case study",
      }),
    );

    expect(
      within(lycheeCard as HTMLElement).getByText("Problem"),
    ).toBeInTheDocument();
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
