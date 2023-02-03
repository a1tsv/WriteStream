import { api } from "@shared/api";
import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App test", () => {
  it("should renders", () => {
    console.log(api);
    render(<App />);
    expect(screen.getByText("App")).toBeInTheDocument();
  });
});
