import type { RenderResult } from "@testing-library/react";
import type { BoundFunctions } from "@testing-library/dom";
import { queries } from "@testing-library/dom";

// Helpers

type WithinResult = BoundFunctions<typeof queries>;

const escapeLabel = (label: string) => {
  return label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Exports

export const getTextFieldWithLabel = (
  label: string,
  element: RenderResult | WithinResult,
) => {
  return element.getByRole("textbox", {
    name: new RegExp(escapeLabel(label)),
  });
};

export const queryTextFieldWithLabel = (
  label: string,
  element: RenderResult | WithinResult,
) => {
  return element.queryByRole("textbox", {
    name: new RegExp(escapeLabel(label)),
  });
};
