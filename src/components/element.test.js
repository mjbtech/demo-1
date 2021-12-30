import { Input, Textarea, Combobox, SwitchInput, FileInput } from "./elements";
import { render, screen, fireEvent } from "@testing-library/react";

test("input", () => {
  const component = render(
    <Input type="text" placeholder="input-placeholder" />
  );
  const input = component.getByPlaceholderText("input-placeholder");
  expect(input.placeholder).toBe("input-placeholder");
});

test("Textarea", () => {
  const component = render(<Textarea type="text" placeholder="textarea" />);
  const textarea = component.getByPlaceholderText("textarea");
  expect(textarea.placeholder).toBe("textarea");
});

test("combobox", () => {
  const combo = render(
    <Combobox
      placeholder="combotextContent"
      options={["option 1", "option 2", "option 3"]}
    />
  );

  const container = combo.getByTestId("combobox-container");
  expect(container.textContent).toBe("combotextContent");

  const btn = combo.getByTestId("combobox-btn");
  fireEvent.click(btn);

  const options2 = screen.getByTestId("combobox-option 2");
  expect(options2.textContent).toBe(" option 2");

  fireEvent.click(options2);
  expect(container.textContent).toBe(" option 2");
});

test("Switch", () => {
  const component = render(<SwitchInput label="Switch" />);
  const input = component.getByTestId("switchInput");
  expect(input.textContent).toBe("SwitchYesNo");
});

test("FileInput", () => {
  const component = render(<FileInput label="Files" />);
  const input = component.getByTestId("fileInput");
  expect(input.textContent).toBe("Files0 files selectedItem select");
});
