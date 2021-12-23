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

export default function Department() {
  const [departments, setDepartments] = useState([
    { code: "45641520", name: "Location one", type: "Location", status: true },
    { code: "45641520", name: "Location two", type: "Location", status: true },
    {
      code: "45641520",
      name: "Location three",
      type: "Location",
      status: false,
    },
    { code: "45641520", name: "Location four", type: "Location", status: true },
    {
      code: "45641520",
      name: "Location five",
      type: "Location",
      status: false,
    },
  ]);
  return (
    <div className={s.container}>
      <header>
        <h3>DEPARTMENT MASTER</h3>
      </header>
      <div className={s.locations}>
        <Table
          columns={[
            { label: "Code" },
            { label: "Location Name" },
            { label: "Location Type" },
            { label: "Status" },
            { label: "Action" },
          ]}
        >
          <tr>
            <td className={s.inlineForm}>
              <DepartmentForm />
            </td>
          </tr>
          {departments.map((loc, i) => (
            <tr key={i}>
              <td>{loc.code}</td>
              <td>{loc.name}</td>
              <td>{loc.type}</td>
              <td>
                <Toggle defaultValue={loc.status} />
              </td>
              <TableActions
                actions={[
                  {
                    icon: <BsPencilFill />,
                    label: "Edit",
                    callBack: () => console.log("edit", loc.code),
                  },
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Delete",
                    callBack: () => console.log("delete", loc.code),
                  },
                ]}
              />
            </tr>
          ))}
        </Table>
      </div>
      <div className={s.btns}>
        <button className="btn w-100">Save</button>
      </div>
    </div>
  );
}
const DepartmentForm = ({ edit, onChange }) => {
  const [code, setCode] = useState(edit?.code || "");
  const [name, setName] = useState(edit?.name || "");
  const [type, setType] = useState(edit?.type || "");
  const [status, setStatus] = useState(edit?.status || "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        required={true}
        defaultValue={code}
        placeholder="Enter"
        onChange={(e) => setCode(e.target.value)}
        icon={<BiSearch />}
      />
      <Input
        required={true}
        defaultValue={name}
        placeholder="Enter"
        onChange={(e) => setName(e.target.value)}
        icon={<BiSearch />}
      />
      <Combobox
        required={true}
        placeholder="Enter"
        multiple={true}
        options={[
          "Location type one",
          "Location type two",
          "Location type three",
          "Location type four",
        ]}
        onChange={(e) => setType(e.target.value)}
      />
      <Toggle defaultValue={status} onChange={(value) => setStatus(value)} />
      <button className="btn secondary">
        <FaPlus />
      </button>
    </form>
  );
};
