import React from "react";
import App from "../App";
import { render } from "@testing-library/react";

test("renders content", () => {
  const component = render(<App />);
  component.getByText("Infinite scroll project");
});
