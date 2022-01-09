import Dashboard, { Accordion } from "./dashboard";
import { Provider } from "../SiteContext";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

test("Dashboard", () => {
  const component = render(
    <Provider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider>
  );
  const comp = component.getByTestId("dashboard");
  expect(comp.textContent).toMatch("REPORT AN INCIDENT There is a blame");
  expect(comp.textContent).toMatch("TYPE OF INCIDENT");
  expect(comp.textContent).toMatch("Incident notified to");
});
