import { useState, useEffect } from "react";
import { FaInfoCircle, FaPlus, FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Box } from "../incidentReport";
import {
  Form,
  Input,
  Checkbox,
  Table,
  TableActions,
  Toggle,
} from "../elements";
import { useForm } from "react-hook-form";
import { Modal, Prompt } from "../modal";
import s from "./masters.module.scss";

export default function Categories() {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/category`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data._embedded?.category) {
          setCategories(data._embedded.category);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            </div>
            <Table columns={[{ label: "Category Name" }, { label: "Action" }]}>
              <tr className={s.filterForm}>
                <td className={s.inlineForm}>
                  <CategoryForm
                    edit={edit}
                    onSuccess={(newCat) => {
                      setCategories((prev) => {
                        return prev.find((c) => c.id === newCat.id)
                          ? prev.map((c) => (c.id === newCat.id ? newCat : c))
                          : [...prev, newCat];
                      });
                      setEdit(null);
                    }}
                    clearForm={() => {
                      setEdit(null);
                    }}
                  />
                </td>
              </tr>
              {categories.map((category, i) => (
                <tr key={i}>
                  <td>
                    <span
                      className={s.catName}
                      onClick={() => setCategory(category)}
                    >
                      {category.name}
                    </span>
                  </td>
                  <TableActions
                    actions={[
                      {
                        icon: <BsPencilFill />,
                        label: "Edit",
                        callBack: () => setEdit(category),
                      },
                      {
                        icon: <FaRegTrashAlt />,
                        label: "Delete",
                        callBack: () =>
                          Prompt({
                            type: "confirmation",
                            message: `Are you sure you want to remove ${category.name}?`,
                            callback: () => {
                              fetch(
                                `${process.env.REACT_APP_HOST}/category/${category.id}`,
                                {
                                  method: "DELETE",
                                }
                              ).then((res) => {
                                if (res.status === 204) {
                                  setCategories((prev) =>
                                    prev.filter((c) => c.id !== category.id)
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
        </Box>
        {category && <SubCategories category={category} />}
      </div>
    </div>
  );
}
const SubCategories = ({ category }) => {
  return (
    <Box label="SUB CATEGORY DETAILS">
      <div className={s.subCategory}>
        <div className={s.head}>
          <Form defaultValues={{ name: category.name }}>
            <Input
              className={s.input}
              name="name"
              label="Category Name"
              readOnly={true}
            />
          </Form>
        </div>
        <Table
          columns={[
            { label: "Sub Category" },
            { label: "Template" },
            { label: "Sentinel" },
            { label: "Reportable" },
            { label: "Status" },
            { label: "Action" },
          ]}
        >
          <tr className={s.filterForm}>
            <SubCategoryForm
              category={category}
              onSuccess={(subCategory) => {
                // setSubCategories((prev) => [...prev, subCategory])
              }}
            />
          </tr>
          {(category.subCategory || []).map((category, i) => (
            <tr key={i}>
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
  );
};
const CategoryForm = ({ edit, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm(edit || {});
  useEffect(() => {
    if (edit) {
      reset(edit);
    }
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const url = `${process.env.REACT_APP_HOST}/category${
          edit ? `/${edit.id}` : ""
        }`;
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
      <Input name="name" register={register} required={true} />
      <div className={s.btns}>
        <button className="btn secondary">
          {edit ? <FaCheck /> : <FaPlus />}
        </button>
        {edit && (
          <button
            type="button"
            onClick={() => {
              reset();
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
const SubCategoryForm = ({ edit, category, onSuccess }) => {
  const { handleSubmit, register, reset, watch } = useForm(edit);
  useEffect(() => {}, [watch]);
  return (
    <td className={s.inlineForm}>
      <form
        onSubmit={handleSubmit((data) => {
          fetch(`${process.env.REACT_APP_HOST}/subCategory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              category: category._links.self.href,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.name) {
                onSuccess(data);
                reset();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })}
      >
        <Input register={register} name="name" placeholder="Enter" />
        <Input
          register={register}
          name="template"
          placeholder="Enter"
          icon={<BiSearch />}
        />
        <Checkbox register={register} name="sentinel" />
        <Checkbox register={register} name="reportable" />
        <Toggle register={register} name="status" />
        <button className="btn secondary">
          <FaPlus />
        </button>
      </form>
    </td>
  );
};
