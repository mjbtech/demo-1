import { useState } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Input, Combobox, Table, TableActions, Toggle } from "../elements";
import { Modal } from "../modal";
import s from "./masters.module.scss";

export default function Categories() {
  const [risks, setRisks] = useState([
    {
      likelihood: "Unlikely",
      severity: "Minor",
      riskScore: "Score 1",
      riskStatus: "Low",
      color: "green",
      status: "active",
    },
    {
      likelihood: "Likely",
      severity: "Major",
      riskScore: "Score 10",
      riskStatus: "Low",
      color: "red",
      status: "active",
    },
  ]);
  return (
    <div className={s.container}>
      <header>
        <h3>USER MASTER</h3>
      </header>
      <div className={s.ram}>
        <Table
          columns={[
            { label: "Likelihood" },
            { label: "Severity" },
            { label: "Risk Score" },
            { label: "Risk Status" },
            { label: "Color" },
            { label: "Active/Inactive" },
            { label: "Action" },
          ]}
        >
          <tr>
            <td className={s.inlineForm}>
              <LocationForm />
            </td>
          </tr>
          {risks.map((risk, i) => (
            <tr key={i}>
              <td>{risk.likelihood}</td>
              <td>{risk.severity}</td>
              <td>{risk.riskScore}</td>
              <td>{risk.riskStatus}</td>
              <td>{risk.color}</td>
              <td>
                <Toggle defaultValue={risk.status === "active"} />
              </td>
              <TableActions
                actions={[
                  {
                    icon: <BsPencilFill />,
                    label: "Edit",
                    callBack: () => console.log("edit", risk.code),
                  },
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Delete",
                    callBack: () => console.log("delete", risk.code),
                  },
                ]}
              />
            </tr>
          ))}
        </Table>
      </div>
      <div className={s.btns}>
        <button className="btn secondary w-100">Clear</button>
        <button className="btn w-100">Save</button>
      </div>
    </div>
  );
}
const LocationForm = ({ edit, onChange }) => {
  const [likelihood, setLikelihood] = useState(edit?.name || "");
  const [severity, setSeverity] = useState(edit?.severity || "");
  const [riskScore, setRiskScore] = useState(edit?.riskScore || "");
  const [riskStatus, setRiskStatus] = useState(edit?.riskStatus || "");
  const [color, setColor] = useState(edit?.color || "");
  const [status, setStatus] = useState(edit?.status || "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Combobox
        required={true}
        placeholder="Select"
        options={["Likely", "Unlikely"]}
        onChange={(e) => setLikelihood(e.target.value)}
      />
      <Combobox
        required={true}
        placeholder="Select"
        options={["Major", "Minor"]}
        onChange={(e) => setSeverity(e.target.value)}
      />
      <Combobox
        required={true}
        placeholder="Select"
        options={["Score 1", "Score 2", "Score 3"]}
        onChange={(e) => setRiskScore(e.target.value)}
      />
      <Combobox
        required={true}
        placeholder="Select"
        options={["High", "Medium", "Low"]}
        onChange={(e) => setRiskStatus(e.target.value)}
      />
      <Combobox
        required={true}
        placeholder="Select"
        options={["green", "yellow", "red"]}
        onChange={(e) => setColor(e.target.value)}
      />
      <Toggle defaultValue={status === "active"} />
      <button className="btn secondary">
        <FaPlus />
      </button>
    </form>
  );
};
