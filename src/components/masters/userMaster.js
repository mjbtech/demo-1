import { useState, useEffect } from "react";
import { FaInfoCircle, FaPlus, FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import {
  Input,
  Combobox,
  Table,
  TableActions,
  Toggle,
  Moment,
} from "../elements";
import { useForm } from "react-hook-form";
import { Modal, Prompt } from "../modal";
import s from "./masters.module.scss";

export default function UserMaster() {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(null);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/department`)
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded.department) {
          setDepartments(
            data._embedded.department.map((d) => ({
              value: d.id,
              label: d.name,
            }))
          );
          return fetch(`${process.env.REACT_APP_HOST}/user`);
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded?.user) {
          setUsers(data._embedded.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            { label: "Password" },
            { label: "Department" },
            { label: "Role" },
            { label: "Action" },
          ]}
        >
          <tr>
            <td className={s.inlineForm}>
              <UserForm
                {...(edit && { edit })}
                key={edit ? "edit" : "add"}
                departments={departments}
                onSuccess={(newUser) => {
                  setUsers((prev) => {
                    return prev.find((c) => c.id === newUser.id)
                      ? prev.map((c) => (c.id === newUser.id ? newUser : c))
                      : [...prev, newUser];
                  });
                  setEdit(null);
                }}
                clearForm={() => {
                  setEdit(null);
                }}
                users={users}
              />
            </td>
          </tr>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>
                <Moment format="DD/MM/YYYY">{user.dob}</Moment>
              </td>
              <td>{user.employeeId}</td>
              <td>{user.contact}</td>
              <td>{user.email}</td>
              <td>•••••••</td>
              <td>
                {departments.find((u) => u.value === user.department)?.label ||
                  user.department}
              </td>
              <td>{user.role}</td>
              <TableActions
                actions={[
                  {
                    icon: <BsPencilFill />,
                    label: "Edit",
                    callBack: () => setEdit(user),
                  },
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Delete",
                    callBack: () =>
                      Prompt({
                        type: "confirmation",
                        message: `Are you sure you want to remove ${user.name}?`,
                        callback: () => {
                          fetch(
                            `${process.env.REACT_APP_HOST}/user/${user.id}`,
                            {
                              method: "DELETE",
                            }
                          ).then((res) => {
                            if (res.status === 204) {
                              setUsers((prev) =>
                                prev.filter((c) => c.id !== user.id)
                              );
                            }
                          });
                        },
                      }),
                  },
                ]}
              />
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
const UserForm = ({ edit, onSuccess, clearForm, departments, users }) => {
  const { handleSubmit, register, reset, watch, setValue } = useForm({
    ...edit,
  });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit((data) => {
        const url = `${process.env.REACT_APP_HOST}/user${
          edit ? `/${edit.id}` : ""
        }`;
        if (
          !edit &&
          users?.some(
            (item) =>
              item.email.trim().toLowerCase() ===
              data.email.trim().toLowerCase()
          )
        ) {
          Prompt({
            type: "information",
            message: `${data.email} already exists.`,
          });
          return;
        }
        fetch(url, {
          method: edit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.name) {
              onSuccess(data);
              reset();
            }
          });
      })}
    >
      <Input
        name="name"
        register={register}
        required={true}
        placeholder="Enter"
      />
      <Combobox
        name="gender"
        register={register}
        setValue={setValue}
        watch={watch}
        required={true}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
      />
      <Input
        name="dob"
        type="date"
        register={register}
        required={true}
        placeholder="Enter"
      />
      <Input
        register={register}
        required={true}
        name="employeeId"
        placeholder="Enter"
      />
      <Input
        register={register}
        required={true}
        name="contact"
        placeholder="Enter"
      />
      <Input
        register={register}
        required={true}
        name="email"
        placeholder="Enter"
      />
      <Input
        register={register}
        required={true}
        type="password"
        name="password"
        placeholder="Enter"
      />
      <Combobox
        register={register}
        required={true}
        name="department"
        setValue={setValue}
        watch={watch}
        options={departments}
      />
      <Combobox
        register={register}
        required={true}
        placeholder="Select"
        name="role"
        setValue={setValue}
        watch={watch}
        options={[
          { value: 1, label: "IR Reporter" },
          { value: 2, label: "IR Investigative" },
        ]}
      />
      <div className={s.btns}>
        <button className="btn secondary">
          {edit ? <FaCheck /> : <FaPlus />}
        </button>
        {edit && (
          <button
            type="button"
            onClick={() => {
              clearForm();
            }}
            className="btn secondary"
          >
            <IoClose />
          </button>
        )}
      </div>
    </form>
  );
};
