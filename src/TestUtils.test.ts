import { render, screen } from "@testing-library/react";
import { Fragment, createElement } from "react";
import { getTextFieldWithLabel, queryTextFieldWithLabel } from "./TestUtils";

const renderTextboxWithLabelAndId = (label: string, id: string) => {
  render(
    createElement(
      Fragment,
      null,
      createElement("label", { htmlFor: id }, label),
      createElement("input", { id, "aria-label": label }),
    ),
  );
};

describe("TestUtils", () => {
  it("getTextFieldWithLabel finds a textbox by label text", () => {
    renderTextboxWithLabelAndId("First name", "first-name");

    expect(getTextFieldWithLabel("First name", screen)).toBeInTheDocument();
  });

  it("getTextFieldWithLabel escapes regex characters in the label", () => {
    renderTextboxWithLabelAndId("Field [A] + ?", "field-with-specials");

    expect(getTextFieldWithLabel("Field [A] + ?", screen)).toBeInTheDocument();
  });

  it("queryTextFieldWithLabel returns null when no textbox matches", () => {
    renderTextboxWithLabelAndId("First name", "first-name");

    expect(queryTextFieldWithLabel("Last name", screen)).toBeNull();
  });

  it("queryTextFieldWithLabel returns the matching textbox", () => {
    renderTextboxWithLabelAndId("Last name", "last-name");

    expect(queryTextFieldWithLabel("Last name", screen)).toBeInTheDocument();
  });
});
