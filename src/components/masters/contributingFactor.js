import { useState, useEffect } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Input, Table, TableActions, Toggle } from "../elements";
import { Modal } from "../modal";
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
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/contributingFactors`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // if (data._embedded?.category) {
        //   setCategories(data._embedded.category);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={s.container}>
      <header>
        <h3>CONTRIBUTING FACTOR</h3>
      </header>
      <div className={s.content}>
        <Box label="CONTRIBUTING FACTOR">
          <div className={s.contributingFactor}>
            <div className={s.head}>
              <Input placeholder="Quick Search" icon={<BiSearch />} />
            </div>
            <Table columns={[{ label: "Master Name" }, { label: "Action" }]}>
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
        </Box>
        {
          //   category && (
          //   <Box label="CATEGORY DETAILS">
          //     <div className={s.contributingFactorDetail}>
          //       <div className={s.head}>
          //         <Input label="Category Name" />
          //       </div>
          //       <Table columns={[{ label: "Description" }, { label: "Action" }]}>
          //         <tr className={s.filterForm}>
          //           <td>
          //             <Input
          //               required={true}
          //               defaultValue={""}
          //               placeholder="Enter"
          //               onChange={(e) => {}}
          //             />
          //           </td>
          //           <td>
          //             <button className="btn secondary">
          //               <TiTick />
          //             </button>
          //           </td>
          //         </tr>
          //         {subCategories.map((category, i) => (
          //           <tr key={i}>
          //             <td>{category.name}</td>
          //             <TableActions
          //               actions={[
          //                 {
          //                   icon: <BsPencilFill />,
          //                   label: "Edit",
          //                   callBack: () => console.log("edit", category.code),
          //                 },
          //                 {
          //                   icon: <FaRegTrashAlt />,
          //                   label: "Delete",
          //                   callBack: () => console.log("delete", category.code),
          //                 },
          //               ]}
          //             />
          //           </tr>
          //         ))}
          //       </Table>
          //     </div>
          //   </Box>
          // )
        }
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
const InjuryAnnotation = () => {
  const [templates, setTemplates] = useState([
    { name: "Legs" },
    { name: "Front and back" },
  ]);
  return (
    <div className={s.annotationTemplate}>
      <button className={`btn w-100 ${s.save}`}>Save</button>
    </div>
  );
};
