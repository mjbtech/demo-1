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
  const [users, setUsers] = useState([
    {
      name: "Location one",
      gender: "Location",
      dob: "2021-12-21T15:56:09.153Z",
      employeeId: "23faaw",
      contact: "+9044752547",
      email: "user@gmail.com",
      department: "Nursing",
      role: ["IR Reporter"],
    },
    {
      name: "Location one",
      gender: "Location",
      dob: "2021-12-21T15:56:09.153Z",
      employeeId: "23faaw",
      contact: "+9044752547",
      email: "user@gmail.com",
      department: "Nursing",
      role: ["IR Reporter", "IR Investor"],
    },
    {
      name: "Location one",
      gender: "Location",
      dob: "2021-12-21T15:56:09.153Z",
      employeeId: "23faaw",
      contact: "+9044752547",
      email: "user@gmail.com",
      department: "Nursing",
      role: ["IR Reporter"],
    },
    {
      name: "Location one",
      gender: "Location",
      dob: "2021-12-21T15:56:09.153Z",
      employeeId: "23faaw",
      contact: "+9044752547",
      email: "user@gmail.com",
      department: "Nursing",
      role: ["IR Reporter"],
    },
  ]);
  return (
    <div className={s.container}>
      <header>
        <h3>USER MASTER</h3>
      </header>
      <div className={s.users}>
        <Table
          columns={[
            { label: "Name" },
            { label: "Gender" },
            { label: "DOB" },
            { label: "Employee ID" },
            { label: "Contact" },
            { label: "Email" },
            { label: "Department" },
            { label: "Role" },
            { label: "Action" },
          ]}
        >
          <tr>
            <td className={s.inlineForm}>
              <UserForm />
            </td>
          </tr>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.dob}</td>
              <td>{user.employeeId}</td>
              <td>{user.contact}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <TableActions
                actions={[
                  {
                    icon: <BsPencilFill />,
                    label: "Edit",
                    callBack: () => console.log("edit", user.code),
                  },
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Delete",
                    callBack: () => console.log("delete", user.code),
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
const UserForm = ({ edit, onChange }) => {
  const [name, setName] = useState(edit?.name || "");
  const [gender, setGender] = useState(edit?.gender || "");
  const [dob, setDob] = useState(edit?.dob || "");
  const [employeeId, setEmployeeId] = useState(edit?.employeeId || "");
  const [contact, setContact] = useState(edit?.contact || "");
  const [email, setEmail] = useState(edit?.email || "");
  const [department, setDepartment] = useState(edit?.department || "");
  const [role, setRole] = useState(edit?.role || []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        required={true}
        defaultValue={name}
        placeholder="Enter"
        onChange={(e) => setName(e.target.value)}
        icon={<BiSearch />}
      />
      <Combobox
        required={true}
        options={["Male", "Female", "Other"]}
        onChange={(e) => setGender(e.target.value)}
      />
      <Input
        required={true}
        defaultValue={dob}
        placeholder="Enter"
        onChange={(e) => setDob(e.target.value)}
      />
      <Input
        required={true}
        defaultValue={employeeId}
        placeholder="Enter"
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <Input
        required={true}
        defaultValue={contact}
        placeholder="Enter"
        onChange={(e) => setContact(e.target.value)}
      />
      <Input
        required={true}
        defaultValue={email}
        placeholder="Enter"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Combobox
        required={true}
        options={["Department 1", "Department 2", "Department 3"]}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <Combobox
        required={true}
        placeholder="Select"
        options={["IR Reporter", "IR Investigative"]}
        onChange={(e) => setRole(e.target.value)}
      />
      <button className="btn secondary">
        <FaPlus />
      </button>
    </form>
  );
};
