import { screen } from "@testing-library/react";
import Loader from "../src/components/Loader";
import { render } from "./customRender";

describe("Loader", () => {
  it("should render the loader component", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
