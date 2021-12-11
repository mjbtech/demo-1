import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { BiChevronsDown, BiSearch } from "react-icons/bi";
import s from "./comp.module.scss";

const Input = ({ label, defaultValue, onChange, type, icon }) => {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <section className={s.input}>
      <label>{label}</label>
      <input
        placeholder="Enter"
        type={type || "text"}
        value={defaultValue}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(value);
        }}
      />
      {icon && icon}
    </section>
  );
};
const Radio = ({ options, onChange }) => {
  const [value, setValue] = useState("");
  return (
    <section className={s.radio}>
      {options.map(({ label, value: v, hint, disabled }) => (
        <label key={v} className={disabled ? s.disabled : ""}>
          <input
            className="label"
            type="radio"
            checked={v === value}
            onChange={() => {
              setValue(v);
              onChange?.(v);
            }}
          />
          {label}
          {hint && <span className={s.hint}>{hint}</span>}
        </label>
      ))}
    </section>
  );
};
const SwitchInput = ({ label, defaultValue, onChange, onLabel, offLabel }) => {
  const [value, setValue] = useState(defaultValue || false);
  return (
    <div className={s.switchInput}>
      <label>{label}</label>
      <div className={s.btns}>
        <span
          className={`${value ? s.active : ""} ${s.on}`}
          onClick={() => setValue(true)}
        >
          {onLabel || "Yes"}
        </span>
        <span
          className={`${!value ? s.active : ""} ${s.off}`}
          onClick={() => setValue(false)}
        >
          {offLabel || "No"}
        </span>
      </div>
    </div>
  );
};

function Lookup() {
  return (
    <div className={s.container}>
      <header>
        <h3>REPORT AN INCIDENT</h3>
        <span className={s.note}>
          <FaInfoCircle /> There is a blame free reporting culture. No punitive
          measure will be taken against any staff reporting any incident.
        </span>
      </header>
      <div className={s.content}>
        <Box label="INCIDENT DETAILS">
          <div className={s.boxContent}>
            <Input label="Incident Date & Time" type="datetime-local" />
            <Input label="Location of incident" icon={<BiSearch />} />
            <Input
              label={
                <>
                  Location Detail <i>(if any)</i>
                </>
              }
              icon={<BiSearch />}
            />
            <SwitchInput label="Patient Complaint" />
            <Input label="Patient name / UHID" icon={<BiSearch />} />
            <Input label="Complient Date & Time" type="datetime-local" />
            <Input label="Complient ID" />
          </div>
        </Box>
        <Box label="Type of Incident">
          <div className={s.typeOfIncident}>
            <Radio
              options={[
                {
                  label: "Unsafe condition",
                  value: "unsafeCondtion",
                  hint:
                    "Any potential safety event that did not reach the patient.",
                },
                {
                  label: "No Harm",
                  value: "noHarm",
                  hint:
                    "Any potential safety event that did not reach the patient.",
                },
                {
                  label: "Near Miss",
                  value: "nearMiss",
                  hint:
                    "Any potential safety event that did not reach the patient.",
                },
                {
                  label: "Adverse Event",
                  value: "adverseEvent",
                  hint:
                    "Any potential safety event that did not reach the patient.",
                },
                {
                  label: "Sentinel Event",
                  value: "sentinelEvent",
                  hint:
                    "Any potential safety event that did not reach the patient.",
                },
              ]}
            />
            <table className={s.adverseEvent} cellSpacing={0} cellPadding={0}>
              <thead>
                <tr>
                  <th>ADVERSE EVENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={s.label}>
                    Degree of harm to the patient / resident
                  </td>
                  <td>
                    <Radio
                      options={[
                        {
                          label: "Unsafe condition",
                          value: "unsafeCondtion",
                        },
                        {
                          label: "No Harm",
                          value: "noHarm",
                        },
                        {
                          label: "Near Miss",
                          value: "nearMiss",
                        },
                        {
                          label: "Adverse Event",
                          value: "adverseEvent",
                        },
                        {
                          label: "Sentinel Event",
                          value: "sentinelEvent",
                        },
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={s.label}>
                    Duration of harm to the patient / resident
                  </td>
                  <td>
                    <Radio
                      options={[
                        {
                          label:
                            "Permanent: Not expected to revert to approximately normal. (ie. patient's baseline)",
                          value: "parmanent",
                          disabled: true,
                        },
                        {
                          label:
                            "Temporary: Expected to revert to approximately normal. (ie. patient's baseline)",
                          value: "temporary",
                        },
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={s.label}>
                    Notification of the patient / resident
                  </td>
                  <td>
                    <Radio
                      options={[
                        {
                          label: "Was notified",
                          value: "notified",
                        },
                        {
                          label: "Not notified",
                          value: "notNotified",
                        },
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={s.label}>
                    Increased length of stay expected due to incident
                  </td>
                  <td>
                    <Radio
                      options={[
                        {
                          label: "Yes",
                          value: "yes",
                        },
                        {
                          label: "No",
                          value: "no",
                        },
                      ]}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </div>
    </div>
  );
}
const Box = ({ label, children, className }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={s.box}>
      <div className={s.head}>
        <h4>{label}</h4>
        <button className="clear">
          <BiChevronsDown />
        </button>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default Lookup;
