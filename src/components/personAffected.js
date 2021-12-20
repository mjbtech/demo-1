import { useState } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "./incidentReport";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Input, Table, TableActions, Toggle } from "./elements";
import { Modal } from "./modal";
import s from "./masters.module.scss";

export default function Categories() {
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
  const [selected, setSelected] = useState([]);
  return (
    <div className={s.container}>
      <header>
        <h3>PERSON AFFECTED</h3>
      </header>
      <div className={s.content}>
        <div className={s.personAffected}>
          <Table columns={[{ label: "Category" }, { label: "Action" }]}>
            <tr>
              <td className={s.inlineForm}>
                <CategoryForm />
              </td>
            </tr>
            {categories.map((category, i) => (
              <tr key={i}>
                <td>{category.name}</td>
                <td>
                  <Toggle defaultValue={category.status} />
                </td>
              </tr>
            ))}
          </Table>
        </div>
        {category && (
          <div className={s.personAffectedDetail}>
            <div className={s.head}>
              <Input label="Category" placeholder="Quick Search" />
            </div>
            <Table columns={[{ label: "Details" }, { label: "Action" }]}>
              <tr className={s.filterForm}>
                <td className={s.inlineForm}>
                  <CategoryForm />
                </td>
              </tr>
              {subCategories.map((category, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      checked={
                        selected.find((item) => item === category.name) || ""
                      }
                      onChange={(e) => {
                        setSelected((prev) => {
                          const newSelection = prev.filter(
                            (item) => item !== category.name
                          );
                          if (e.target.checked) {
                            newSelection.push(category.name);
                          }
                          return newSelection;
                        });
                      }}
                    />{" "}
                    {category.name}
                  </td>
                  <td />
                </tr>
              ))}
            </Table>
          </div>
        )}
        <InjuryAnnotation />
      </div>
    </div>
  );
}
const CategoryForm = ({ edit, onChange }) => {
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
const SubCategoryForm = ({ edit, onChange }) => {
  const [categoryName, setCategoryName] = useState(edit?.name || "");
  return (
    <form
      className={s.categoryForm}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        required={true}
        defaultValue={categoryName}
        placeholder="Sub Category Name"
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button className="btn secondary">
        <TiTick />
      </button>
    </form>
  );
};
const InjuryAnnotation = () => {
  const [templates, setTemplates] = useState([
    { name: "Legs" },
    { name: "Front and back" },
  ]);
  return (
    <div className={s.annotationTemplate}>
      <h4>Select Injury Annotation Template</h4>
      <div className={s.form}>
        <Input placeholder="Search" icon={<BiSearch />} />
        {templates.map((temp) => (
          <span className={s.chip}>
            {temp.name}{" "}
            <button className="clear">
              <IoIosClose />
            </button>
          </span>
        ))}
      </div>
      <button className={`btn w-100 ${s.save}`}>Save</button>
    </div>
  );
};
