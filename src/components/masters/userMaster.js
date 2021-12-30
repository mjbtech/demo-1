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

export default function UserMaster() {
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
              <td>
                {user.role[0]}
                {user.role.length > 1 && (
                  <>
                    {" "}
                    <span className={s.moreRoles}>
                      +{user.role.length - 1}{" "}
                      <ul className={s.allRoles}>
                        {user.role.map((role) => (
                          <li key={role}>{role}</li>
                        ))}
                      </ul>
                    </span>
                  </>
                )}
              </td>
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
  return (
    <Form
      defaultValues={edit}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <Input required={true} name="name" placeholder="Enter" />
      <Combobox
        required={true}
        name="gender"
        options={["Male", "Female", "Other"]}
      />
      <Input required={true} name="dob" placeholder="Enter" />
      <Input required={true} name="employeeId" placeholder="Enter" />
      <Input required={true} name="contact" placeholder="Enter" />
      <Input required={true} email="email" placeholder="Enter" />
      <Combobox
        required={true}
        name="department"
        options={["Department 1", "Department 2", "Department 3"]}
      />
      <Combobox
        required={true}
        placeholder="Select"
        name="role"
        options={["IR Reporter", "IR Investigative"]}
      />
      <button className="btn secondary">
        <FaPlus />
      </button>
    </Form>
  );
};
