import {
  Input,
  FileInput,
  Textarea,
  Radio,
  CustomRadio,
  SwitchInput,
  Toggle,
  Combobox,
  Checkbox,
  TableActions,
  Moment,
} from "./elements";
import { render, screen, fireEvent } from "@testing-library/react";

test("input", () => {
  const component = render(
    <Input type="text" placeholder="input-placeholder" />
  );
  const input = component.getByPlaceholderText("input-placeholder");
  expect(input.placeholder).toBe("input-placeholder");
});
test("FileInput", () => {
  const component = render(<FileInput label="Files" />);
  const input = component.getByTestId("fileInput");
  expect(input.textContent).toBe("Files0 files selectedItem select");
});
test("Textarea", () => {
  const component = render(<Textarea type="text" placeholder="textarea" />);
  const textarea = component.getByPlaceholderText("textarea");
  expect(textarea.placeholder).toBe("textarea");
});
test("Radio", () => {
  const component = render(
    <Radio
      name="typeofInci"
      options={[
        {
          label: "Option 1",
          value: "1",
          hint: "Hint for option 1",
        },
        {
          label: "Option 2",
          value: "2",
          hint: "Hint for option 2",
        },
      ]}
    />
  );
  const container = component.getByTestId("radioInput");
  expect(container.textContent).toBe(
    "Option 1Hint for option 1Option 2Hint for option 2"
  );
});
test("CustomRadio", () => {
  const component = render(
    <CustomRadio
      label="Custom Radio"
      options={[
        {
          label: "Option 1",
          value: "1",
        },
        {
          label: "Option 2",
          value: "2",
        },
      ]}
    />
  );
  const container = component.getByTestId("customRadioInput");
  expect(container.textContent).toBe("Custom RadioOption 1Option 2");
});
test("Switch", () => {
  const component = render(<SwitchInput label="Switch" />);
  const input = component.getByTestId("switchInput");
  expect(input.textContent).toBe("SwitchYesNo");
});
test("Toggle", () => {
  const component = render(<Toggle label="Switch" />);
  const input = component.getByTestId("toggleInput");
  expect(input.textContent).toBe("");
});
test("combobox", () => {
  const combo = render(
    <Combobox
      placeholder="Placeholder"
      options={[
        { value: "option1", label: "option 1" },
        { value: "option1", label: "option 2" },
        { value: "option1", label: "option 3" },
      ]}
    />
  );

  const container = combo.getByTestId("combobox-container");
  expect(container.textContent).toBe("Placeholder");

  const btn = combo.getByTestId("combobox-btn");
  fireEvent.click(btn);

  const options2 = screen.getByTestId("combobox-option 2");
  expect(options2.textContent).toBe("option 2");

  fireEvent.click(options2);
  expect(container.textContent).toBe("Placeholder");
});
test("Checkbox", () => {
  const component = render(<Checkbox register={() => {}} label="Switch" />);
  const time = component.getByTestId("checkbox-input");
  expect(time.textContent).toBe("Switch");
});
test("TableActions", () => {
  const component = render(
    <table>
      <tbody>
        <tr>
          <TableActions
            actions={[
              { icon: "Icon 1", label: "Action 1", callback: () => {} },
              { icon: "Icon 2", label: "Action 2", callback: () => {} },
            ]}
          />
        </tr>
      </tbody>
    </table>
  );
  const container = component.getByTestId("tableActions");
  expect(container.textContent).toBe("Icon 1Icon 2");
});
test("Moment", () => {
  const component = render(
    <Moment format="DD/MM/YYYY ddd hh:mm">
      {new Date("2021-05-12 13:45")}
    </Moment>
  );
  const time = component.getByTestId("moment");
  expect(time.textContent).toBe("12/05/2021 Wed 01:45");
});
