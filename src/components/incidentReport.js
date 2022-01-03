import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { BiChevronsDown, BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import {
  Form,
  Input,
  Combobox,
  FileInput,
  Textarea,
  SwitchInput,
  Radio,
  Chip,
  Table,
  TableActions,
} from "./elements";
import s from "./incidentReporting.module.scss";

function Lookup() {
  const [departments, setDepartments] = useState(["Pharmacy", "Nursing"]);
  const [preventability, setPreventability] = useState("Not assessed");
  const [actionsTaken, setActionsTaken] = useState([
    {
      action:
        "Patient monitored for hour, vitals were stable and informed physician",
      actionTakenBy: {
        name: "Robert",
        id: "asdfasddd",
      },
      date: "2021-12-21T10:17:12.514Z",
    },
  ]);
  const [witnesses, setWitnesses] = useState([
    { name: "Jossi", department: "Nursing" },
  ]);
  const [notified, setNotified] = useState([
    {
      name: "Heilena",
      department: "Nursing",
      date: "2021-12-21T10:17:12.514Z",
    },
  ]);
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
        <Box label="INCIDENT DETAILS" collapsable={true}>
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
        <Box label="TYPE OF INCIDENT" collapsable={true}>
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
        <Box label="INCIDENT CATEGORY" collapsable={true}>
          <div className={s.incidentCategory}>
            <div className={s.form}>
              <Combobox
                label="Incident Category"
                placeholder="Select"
                options={[
                  { value: 1, label: "Medical error" },
                  { value: 2, label: "Technical error" },
                ]}
              />
              <Combobox
                label="Incident Sub-category"
                placeholder="Select"
                options={[
                  { value: 1, label: "Wrong Medication administered" },
                  { value: 2, label: "Incident Sub-category 2" },
                ]}
              />
              <button className="btn secondary">
                <FaPlus /> Add Template
              </button>
            </div>
            <div className={s.placeholder}>Placeholder</div>
          </div>
        </Box>
        <Box label="PERSON AFFECTED" collapsable={true}>
          <div className={s.placeholder}>Placeholder</div>
        </Box>
        <Box label="INCIDENT DESCRIPTION" collapsable={true}>
          <div className={s.incidentDescription}>
            <Textarea label="Incident Description" className={s.description} />
            <section className={s.departments}>
              <Input
                label="Department Involved"
                defaultValue={""}
                icon={<BiSearch />}
                className={s.search}
              />
              {departments.map((department) => (
                <Chip key={department} label={department} />
              ))}
            </section>
          </div>
        </Box>
        <Box label="CONTRIBUTING FACTORS" collapsable={true}>
          <div className={s.contributingFactor}>
            <div className={s.placeholder}>Placeholder</div>
            <div className={s.preventabilityWrapper}>
              <Table
                className={s.preventability}
                columns={[{ label: "Preventability of incident" }]}
              >
                {[
                  { label: "Likely could have been prevented" },
                  { label: "Likely could not have been prevented" },
                  { label: "Not assessed" },
                ].map((item) => (
                  <tr key={item.label}>
                    <td>
                      <input
                        id={"preventability" + item.label}
                        type="radio"
                        checked={preventability === item.label}
                        onChange={(e) => setPreventability(item.label)}
                      />{" "}
                      <label htmlFor={"preventability" + item.label}>
                        {item.label}
                      </label>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
            <div className={s.actionWrapper}>
              <h4>Immediate Action taken</h4>
              <Table
                columns={[
                  { label: "Action taken" },
                  { label: "Action Taken By" },
                  { label: "Date & Time" },
                  { label: "Action" },
                ]}
                className={s.actionTaken}
              >
                <tr>
                  <td className={s.inlineForm}>
                    <form>
                      <Textarea placeholder="Enter" />
                      <Input placeholder="Enter" icon={<BiSearch />} />
                      <Input type="datetime-local" />
                      <button className="btn secondary">
                        <AiOutlinePlus />
                      </button>
                    </form>
                  </td>
                </tr>
                {actionsTaken.map((action, i) => (
                  <tr key={i}>
                    <td>{action.action}</td>
                    <td>{action.actionTakenBy.name}</td>
                    <td>{action.date}</td>
                    <TableActions
                      actions={[
                        {
                          icon: <BsPencilFill />,
                          label: "Edit",
                          callBack: () => console.log("edit", action.code),
                        },
                        {
                          icon: <FaRegTrashAlt />,
                          label: "Delete",
                          callBack: () => console.log("delete", action.code),
                        },
                      ]}
                    />
                  </tr>
                ))}
              </Table>
            </div>
            <div>
              <h4>Incident witnessed by</h4>
              <Table
                className={s.witnesses}
                columns={[
                  { label: "Name" },
                  { label: "Departemnt" },
                  { label: "Action" },
                ]}
              >
                <tr>
                  <td className={s.inlineForm}>
                    <form>
                      <Input placeholder="Search" icon={<BiSearch />} />
                      <Input placeholder="Enter" icon={<BiSearch />} />
                      <button className="btn secondary">
                        <AiOutlinePlus />
                      </button>
                    </form>
                  </td>
                </tr>
                {witnesses.map((witness, i) => (
                  <tr key={i}>
                    <td>{witness.name}</td>
                    <td>{witness.department}</td>
                    <TableActions
                      actions={[
                        {
                          icon: <BsPencilFill />,
                          label: "Edit",
                          callBack: () => console.log("edit", witness.code),
                        },
                        {
                          icon: <FaRegTrashAlt />,
                          label: "Delete",
                          callBack: () => console.log("delete", witness.code),
                        },
                      ]}
                    />
                  </tr>
                ))}
              </Table>
            </div>
            <div>
              <h4>Incident notified to</h4>
              <Table
                className={s.notified}
                columns={[
                  { label: "Name" },
                  { label: "Departemnt" },
                  { label: "Date & Time" },
                  { label: "Action" },
                ]}
              >
                <tr>
                  <td className={s.inlineForm}>
                    <form>
                      <Input placeholder="Search" icon={<BiSearch />} />
                      <Input placeholder="Enter" icon={<BiSearch />} />
                      <Input type="datetime-local" placeholder="Enter" />
                      <button className="btn secondary">
                        <AiOutlinePlus />
                      </button>
                    </form>
                  </td>
                </tr>
                {notified.map((person, i) => (
                  <tr key={i}>
                    <td>{person.name}</td>
                    <td>{person.department}</td>
                    <td>{person.date}</td>
                    <TableActions
                      actions={[
                        {
                          icon: <BsPencilFill />,
                          label: "Edit",
                          callBack: () => console.log("edit", person.code),
                        },
                        {
                          icon: <FaRegTrashAlt />,
                          label: "Delete",
                          callBack: () => console.log("delete", person.code),
                        },
                      ]}
                    />
                  </tr>
                ))}
              </Table>
            </div>
            <div className={s.fieldWrapper}>
              <FileInput label="Upload" />
              <Input label="Incident Reported by" readOnly={true} />
              <Input label="Department" readOnly={true} />
              <Input
                label="Head of the department"
                placeholder="Enter"
                icon={<BiSearch />}
              />
            </div>
            <div className={s.btns}>
              <button className="btn secondary w-100">Save</button>
              <button className="btn w-100">Submit</button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
export const Box = ({ label, children, className, collapsable }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={s.box}>
      <div className={s.head}>
        <h4>{label}</h4>
        {collapsable && (
          <button
            style
            className="clear"
            style={open ? { transform: `rotate(180deg)` } : {}}
            onClick={() => setOpen(!open)}
          >
            <BiChevronsDown />
          </button>
        )}
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default Lookup;
