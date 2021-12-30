import { useState } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import {
  Form,
  Input,
  Checkbox,
  Table,
  TableActions,
  Toggle,
} from "../elements";
import { Modal } from "../modal";
import s from "./config.module.scss";

export default function Categories() {
  const [category, setCategory] = useState("one");
  const [categories, setCategories] = useState([
    { code: "code45201", name: "Category One" },
    { code: "code456541", name: "Category Two" },
    { code: "code454831", name: "Category Three" },
    { code: "code412301", name: "Category Four" },
  ]);
  const [subCategories, setSubCategories] = useState([
    {
      code: "1",
      name: "Sub Category One",
      template: "template 1",
      sentinel: true,
      reportable: true,
      status: true,
    },
    {
      code: "1",
      name: "Sub Category Two",
      template: "template 2",
      sentinel: true,
      reportable: false,
      status: true,
    },
    {
      code: "1",
      name: "Sub Category Three",
      template: "template 3",
      sentinel: false,
      reportable: true,
      status: false,
    },
    {
      code: "1",
      name: "Sub Category Four",
      template: "template 4",
      sentinel: true,
      reportable: true,
      status: true,
    },
  ]);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  return (
    <div className={s.container}>
      <header>
        <h3>CATEGORY & SUB CATEGORY MASTER</h3>
      </header>
      <div className={s.content}>
        <Box label="CATEGORY DETAILS">
          <div className={s.category}>
            <div className={s.head}>
              <Input placeholder="Quick Search" icon={<BiSearch />} />
              {
                //   <button
                //   className={`clear ${s.addBtn}`}
                //   onClick={() => setAddCategory(true)}
                // >
                //   <FaPlus /> Add New Category
                // </button>
              }
            </div>
            <Table
              columns={[
                { label: "Code" },
                { label: "Category Name" },
                { label: "Action" },
              ]}
            >
              <tr className={s.filterForm}>
                <CategoryForm />
              </tr>
              {categories.map((category, i) => (
                <tr key={i}>
                  <td>{category.code}</td>
                  <td>{category.name}</td>
                  <TableActions
                    actions={[
                      {
                        icon: <BsPencilFill />,
                        label: "Edit",
                        callBack: () => console.log("edit", category.code),
                      },
                      {
                        icon: <FaRegTrashAlt />,
                        label: "Delete",
                        callBack: () => console.log("delete", category.code),
                      },
                    ]}
                  />
                </tr>
              ))}
            </Table>
          </div>
        </Box>
        {category && (
          <Box label="SUB CATEGORY DETAILS">
            <div className={s.subCategory}>
              <div className={s.head}>
                <Input className={s.input} label="Category Name" />
                <Input className={s.input} label="Category Code" />
                {
                  //   <button
                  //   className={`clear ${s.addBtn}`}
                  //   onClick={() => setAddSubCategory(true)}
                  // >
                  //   <FaPlus /> Add New Sub Category
                  // </button>
                }
              </div>
              <Table
                columns={[
                  { label: "Code" },
                  { label: "Sub Category" },
                  { label: "Template" },
                  { label: "Sentinel" },
                  { label: "Reportable" },
                  { label: "Status" },
                  { label: "Action" },
                ]}
              >
                <tr className={s.filterForm}>
                  <SubCategoryForm />
                </tr>
                {subCategories.map((category, i) => (
                  <tr key={i}>
                    <td>{category.code}</td>
                    <td>{category.name}</td>
                    <td>{category.template}</td>
                    <td>{category.sentinel ? "Sentinel" : ""}</td>
                    <td>{category.reportable ? "Reportable" : ""}</td>
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
                        {
                          icon: <FaRegTrashAlt />,
                          label: "Delete",
                          callBack: () => console.log("delete", category.code),
                        },
                      ]}
                    />
                  </tr>
                ))}
              </Table>
            </div>
          </Box>
        )}
      </div>
      {
        //   <Modal open={addCategory} onBackdropClick={() => setAddCategory(false)}>
        //   <CategoryForm
        //     onSuccess={(category) => {
        //       setAddCategory(false);
        //     }}
        //   />
        // </Modal>
        // <Modal
        //   open={addSubCategory}
        //   onBackdropClick={() => setAddSubCategory(false)}
        // >
        //   <SubCategoryForm
        //     onSuccess={(category) => {
        //       setAddSubCategory(false);
        //     }}
        //   />
        // </Modal>
      }
    </div>
  );
}
const CategoryForm = ({ edit, onChange }) => {
  return (
    <td className={s.inlineForm}>
      <Form
        defaultValues={edit}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <Input name="categoryName" required={true} />
        <button className="btn secondary">
          <FaPlus />
        </button>
      </Form>
    </td>
  );
};
const SubCategoryForm = ({ edit, onChange }) => {
  return (
    <td className={s.inlineForm}>
      <Form
        defaultValues={edit}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <Input name="code" placeholder="Enter" />
        <Input name="subCategoryName" placeholder="Enter" icon={<BiSearch />} />
        <Input name="template" placeholder="Enter" icon={<BiSearch />} />
        <Checkbox name="sentinel" />
        <Checkbox name="reportable" />
        <Toggle name="status" />
        <button className="btn secondary">
          <FaPlus />
        </button>
      </Form>
    </td>
  );
};
