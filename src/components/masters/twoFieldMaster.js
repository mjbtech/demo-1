import { useState } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Input, Table, TableActions, Toggle } from "../elements";
import { Modal } from "../modal";
import s from "./masters.module.scss";

export default function TwoFieldMaster() {
  const [category, setCategory] = useState("one");
  const [categories, setCategories] = useState([
    { name: "Patient", status: true },
    { name: "Staff", status: true },
    { name: "Visitor", status: false },
    { name: "Contractor", status: true },
  ]);
  const [subCategories, setSubCategories] = useState([
    {
      name: "Sub Category One",
      status: true,
    },
    {
      name: "Sub Category Two",
      status: true,
    },
    {
      name: "Sub Category Three",
      status: false,
    },
    {
      name: "Sub Category Four",
      status: true,
    },
  ]);
  return (
    <div className={s.container}>
      <header>
        <h3>TWO FIELD MASTERS</h3>
      </header>
      <div className={s.content}>
        <Box label="MASTERS LIST">
          <div className={s.twoFieldMaster}>
            <div className={s.head}>
              <Input placeholder="Quick Search" icon={<BiSearch />} />
            </div>
            <Table columns={[{ label: "Master Name" }, { label: "Action" }]}>
              <tr>
                <td className={s.inlineForm}>
                  <TowFiledForm />
                </td>
              </tr>
              {categories.map((category, i) => (
                <tr key={i}>
                  <td>{category.name}</td>
                  <td></td>
                </tr>
              ))}
            </Table>
          </div>
        </Box>
        {category && (
          <Box label="MASTER DETAILS">
            <div className={s.twoFieldMasterDetail}>
              <div className={s.head}>
                <Input label="Selected Master" />
              </div>
              <Table
                columns={[
                  { label: "Description" },
                  { label: "Status" },
                  { label: "Action" },
                ]}
              >
                <tr>
                  <td className={s.inlineForm}>
                    <TwoFieldMasterForm />
                  </td>
                </tr>
                {subCategories.map((category, i) => (
                  <tr key={i}>
                    <td>{category.name}</td>
                    <td>
                      <Toggle defaultValue={category.status} />
                    </td>
                    <TableActions
                      actions={[
                        {
                          icon: <BsPencilFill />,
                          label: "Edit",
                          callBack: () => console.log("edit", category.code),
                        },
                      ]}
                    />
                  </tr>
                ))}
              </Table>
            </div>
          </Box>
        )}
        <div className={s.btns}>
          <button className="btn w-100">Save</button>
        </div>
      </div>
    </div>
  );
}
const TowFiledForm = ({ edit, onChange }) => {
  const [categoryName, setCategoryName] = useState(edit?.name || "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        required={true}
        defaultValue={categoryName}
        placeholder="Enter"
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button className="btn secondary">
        <TiTick />
      </button>
    </form>
  );
};
const TwoFieldMasterForm = ({ edit, onChange }) => {
  return (
    <form>
      <Input
        required={true}
        defaultValue={""}
        placeholder="Enter"
        onChange={(e) => {}}
      />
      <Toggle defaultValue={false} />
      <button className="btn secondary">
        <TiTick />
      </button>
    </form>
  );
};
