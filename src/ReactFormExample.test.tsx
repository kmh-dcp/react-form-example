import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ReactFormExample from "./ReactFormExample.tsx";
import { getTextFieldWithLabel } from "./TestUtils.ts";

describe("ReactFormExample", () => {
  it("renders", () => {
    render(<ReactFormExample aria-label="FOO" />);

    const component = screen.getByLabelText("FOO");

    expect(component).toBeInTheDocument();
  });

  describe("First name", () => {
    it("displays if provided", () => {
      render(<ReactFormExample aria-label="FOO" firstName="FIRST_NAME" />);

      const component = screen.getByLabelText("FOO");
      const firstName = getTextFieldWithLabel("First name", within(component));

      expect(firstName).toHaveValue("FIRST_NAME");
    });

    it("is blank if not provided", () => {
      render(<ReactFormExample aria-label="FOO" />);

      const component = screen.getByLabelText("FOO");
      const firstName = getTextFieldWithLabel("First name", within(component));

      expect(firstName).toHaveValue("");
    });

    describe("form error", () => {
      it("displays error state if provided", () => {
        render(
          <ReactFormExample
            aria-label="FOO"
            formErrors={{ firstName: "FIRST_NAME_FORM_ERROR" }}
          />,
        );

        const component = screen.getByLabelText("FOO");
        const firstName = getTextFieldWithLabel(
          "First name",
          within(component),
        );
        const formError = within(component).getByText("FIRST_NAME_FORM_ERROR");

        expect(firstName).toHaveAttribute("aria-invalid", "true");
        expect(formError).toBeInTheDocument();
      });

      it("does not display error state if not provided", () => {
        render(<ReactFormExample aria-label="FOO" />);

        const component = screen.getByLabelText("FOO");
        const firstName = getTextFieldWithLabel(
          "First name",
          within(component),
        );

        expect(firstName).toHaveAttribute("aria-invalid", "false");
      });
    });
  });

  describe("Last name", () => {
    it("displays if provided", () => {
      render(<ReactFormExample aria-label="FOO" lastName="LAST_NAME" />);

      const component = screen.getByLabelText("FOO");
      const lastName = getTextFieldWithLabel("Last name", within(component));

      expect(lastName).toHaveValue("LAST_NAME");
    });

    it("is blank if not provided", () => {
      render(<ReactFormExample aria-label="FOO" />);

      const component = screen.getByLabelText("FOO");
      const lastName = getTextFieldWithLabel("Last name", within(component));

      expect(lastName).toHaveValue("");
    });

    describe("form error", () => {
      it("displays error state if provided", () => {
        render(
          <ReactFormExample
            aria-label="FOO"
            formErrors={{ lastName: "LAST_NAME_FORM_ERROR" }}
          />,
        );

        const component = screen.getByLabelText("FOO");
        const lastName = getTextFieldWithLabel("Last name", within(component));
        const formError = within(component).getByText("LAST_NAME_FORM_ERROR");

        expect(lastName).toHaveAttribute("aria-invalid", "true");
        expect(formError).toBeInTheDocument();
      });

      it("does not display error state if not provided", () => {
        render(<ReactFormExample aria-label="FOO" />);

        const component = screen.getByLabelText("FOO");
        const lastName = getTextFieldWithLabel("Last name", within(component));

        expect(lastName).toHaveAttribute("aria-invalid", "false");
      });
    });
  });

  describe("didChangeValue", () => {
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
      user = userEvent.setup();
    });

    describe("firstName", () => {
      it("is called when value changes", async () => {
        const callback = vi.fn();
        render(<ReactFormExample aria-label="FOO" didChangeValue={callback} />);

        const component = screen.getByLabelText("FOO");
        const firstName = within(component).getByLabelText("First name");

        await user.type(firstName, "FIRST_NAME");
        await user.tab();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("firstName", "FIRST_NAME");
      });

      it("is not called when value does not change", async () => {
        const callback = vi.fn();
        render(<ReactFormExample aria-label="FOO" didChangeValue={callback} />);

        const component = screen.getByLabelText("FOO");
        const firstName = getTextFieldWithLabel(
          "First name",
          within(component),
        );

        await user.click(firstName);
        await user.tab();

        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe("lastName", () => {
      it("is called when value changes", async () => {
        const callback = vi.fn();
        render(<ReactFormExample aria-label="FOO" didChangeValue={callback} />);

        const component = screen.getByLabelText("FOO");
        const lastName = getTextFieldWithLabel("Last name", within(component));

        await user.type(lastName, "LAST_NAME");
        await user.tab();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("lastName", "LAST_NAME");
      });

      it("is not called when value does not change", async () => {
        const callback = vi.fn();
        render(<ReactFormExample aria-label="FOO" didChangeValue={callback} />);

        const component = screen.getByLabelText("FOO");
        const lastName = getTextFieldWithLabel("Last name", within(component));

        await user.click(lastName);
        await user.tab();

        expect(callback).not.toHaveBeenCalled();
      });
    });
  });

  describe("onSubmit", () => {
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
      user = userEvent.setup();
    });

    describe("is called with form data", () => {
      it("when populated", async () => {
        const callback = vi.fn();
        render(
          <ReactFormExample
            aria-label="FOO"
            firstName="FIRST_NAME"
            lastName="LAST_NAME"
            onSubmit={callback}
          />,
        );

        const component = screen.getByLabelText("FOO");
        const submit = within(component).getByLabelText(
          "react-form-example-submit-button",
        );

        await user.click(submit);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({
          firstName: "FIRST_NAME",
          lastName: "LAST_NAME",
        });
      });

      it("when not populated", async () => {
        const callback = vi.fn();
        render(<ReactFormExample aria-label="FOO" onSubmit={callback} />);

        const component = screen.getByLabelText("FOO");
        const submit = within(component).getByLabelText(
          "react-form-example-submit-button",
        );

        await user.click(submit);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({ firstName: "", lastName: "" });
      });
    });
  });
});
