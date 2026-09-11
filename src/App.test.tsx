import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "./App.tsx";

describe("App", () => {
  it("renders", () => {
    render(<App aria-label="FOO" />);

    const component = screen.getByLabelText("FOO");

    expect(component).toBeInTheDocument();
  });

  it("contains Paper component", () => {
    render(<App aria-label="FOO" />);

    const component = screen.getByLabelText("FOO");
    const paper = within(component).getByLabelText("paper");

    expect(paper).toBeInTheDocument();
  });

  it("displays header", () => {
    render(<App aria-label="FOO" />);

    const component = screen.getByLabelText("FOO");
    const paper = within(component).getByLabelText("paper");
    const header = within(paper).getByLabelText("header");

    expect(header).toHaveTextContent("React Form Example");
  });

  // TODO: Adjust once ThemeProvider is refactored out into parent component
  describe.skip("theme", () => {
    // it('defaults to light theme', () => {
    //   const theme = useTheme();
    //
    //   expect(theme.palette.mode).toBe('light');
    // });

    describe("can be set to dark theme", () => {
      // it('via prop', () => {
      //   render(<App darkTheme />);
      //   const theme = useTheme();
      //
      //   expect(theme.palette.mode).toBe('dark');
      // });

      it("via toggle", async () => {
        const callback = vi.fn();
        const user = userEvent.setup();

        render(<App aria-label="FOO" themeDidChange={callback} />);

        const component = screen.getByLabelText("FOO");
        const toggle = within(component).getByLabelText("theme-switch");

        await user.click(toggle);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("dark");
      });
    });
  });
});
