import Masters from "./index";
import { Provider } from "../../SiteContext";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

test("Dashboard", () => {
  const component = render(
    <Provider>
      <BrowserRouter>
        <Masters />
      </BrowserRouter>
    </Provider>
  );
  const comp = component.getByTestId("masters");
  expect(comp.textContent).toMatch("404");
});
