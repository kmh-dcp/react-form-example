import { render, screen, within } from "@testing-library/react";
import App from "./App.tsx";

describe("App", () => {
  it("contains Paper component", () => {
    render(<App />);
    const paper = screen.getByLabelText("paper");

    expect(paper).toBeInTheDocument();
  });

  it("displays header", () => {
    render(<App />);
    const paper = screen.getByLabelText("paper");
    const header = within(paper).getByLabelText("header");

    expect(header).toHaveTextContent("React Form Example");
  });
});
