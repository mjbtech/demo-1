import IncidentReport, { IncidentCategory, Box } from "./incidentReport";
import { render, screen, fireEvent } from "@testing-library/react";

test("Incident Reporting", () => {
  const component = render(<IncidentReport />);
  const comp = component.getByTestId("incidentReportingForm");
  expect(comp.textContent).toMatch("REPORT AN INCIDENT There is a blame");
  expect(comp.textContent).toMatch("TYPE OF INCIDENT");
  expect(comp.textContent).toMatch("Incident notified to");
});
test("Box", () => {
  const component = render(
    <Box>
      <div>Test box</div>
    </Box>
  );
  const comp = component.getByTestId("box");
  expect(comp.textContent).toMatch("Test box");
});
