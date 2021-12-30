import { useState } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import {
  Form,
  Input,
  Combobox,
  Table,
  TableActions,
  Toggle,
} from "../elements";
import { Modal } from "../modal";
import s from "./masters.module.scss";

export default function Categories() {
  const [locations, setLocations] = useState([
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
        <h3>LOCATION MASTER</h3>
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
              <LocationForm
                edit={{
                  status: true,
                  locationType: ["Location type one", "Location type two"],
                }}
              />
            </td>
          </tr>
          {locations.map((loc, i) => (
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
const LocationForm = ({ edit, onChange }) => {
  const [type, setType] = useState(edit?.type || "");
  return (
    <Form
      defaultValues={edit}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <Input
        required={true}
        name="code"
        placeholder="Enter"
        icon={<BiSearch />}
      />
      <Input
        required={true}
        name="name"
        placeholder="Enter"
        icon={<BiSearch />}
      />
      <Combobox
        name="locationType"
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
      <Toggle name="status" />
      <button className="btn secondary">
        <FaPlus />
      </button>
    </Form>
  );
};
