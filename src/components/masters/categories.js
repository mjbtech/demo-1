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
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/category`)
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded?.category) {
          setCategories(data._embedded.category);
          setSelected(data._embedded.category[0]?.id);
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
      <div className={`${s.content} ${s.parent_child}`}>
        {
          //   <Box label="CATEGORY DETAILS">
          // </Box>
        }
        <div className={s.parent}>
          {
            //   <div className={s.head}>
            //   <Input placeholder="Quick Search" icon={<BiSearch />} />
            // </div>
          }
          <Table columns={[{ label: "Category Name" }, { label: "Action" }]}>
            <tr>
              <td className={s.inlineForm}>
                {edit ? (
                  <CategoryForm
                    key="edit"
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
                ) : (
                  <CategoryForm
                    key="add"
                    onSuccess={(newCat) => {
                      setCategories((prev) => {
                        return prev.find((c) => c.id === newCat.id)
                          ? prev.map((c) => (c.id === newCat.id ? newCat : c))
                          : [...prev, newCat];
                      });
                    }}
                  />
                )}
              </td>
            </tr>
            {categories.map((category, i) => (
              <tr
                key={i}
                className={category.id === selected ? s.selected : ""}
              >
                <td>
                  <span
                    className={s.catName}
                    onClick={() => setSelected(category.id)}
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
                              } else if (res.status === 409) {
                                Prompt({
                                  type: "error",
                                  message:
                                    "Remove children to delete this master.",
                                });
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
        {categories.find((cat) => cat.id === selected) && (
          <SubCategories
            category={categories.find((cat) => cat.id === selected)}
            setCategories={setCategories}
          />
        )}
      </div>
    </div>
  );
}
const CategoryForm = ({ edit, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
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

const SubCategories = ({
  category: { id, name, subCategorys },
  setCategories,
}) => {
  const [edit, setEdit] = useState(null);
  // <Box label="SUB CATEGORY DETAILS">
  // </Box>
  return (
    <div className={`${s.subCategory} ${s.child}`}>
      <div className={s.head}>
        <span className={s.categoryName}>
          Category name: <strong>{name}</strong>
        </span>
        {
          //   <Form defaultValues={{ name: name }}>
          //   <Input
          //     className={s.input}
          //     name="name"
          //     label="Category Name"
          //     readOnly={true}
          //   />
          // </Form>
        }
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
        <tr>
          <td className={s.inlineForm}>
            {edit ? (
              <SubCategoryForm
                key="edit"
                edit={edit}
                categoryId={id}
                onSuccess={(subCategory) => {
                  setCategories((prev) =>
                    prev.map((cat) => {
                      const newSubCategories = cat.subCategorys?.find(
                        (sc) => sc.id === subCategory.id
                      )
                        ? cat.subCategorys?.map((sc) =>
                            sc.id === subCategory.id ? subCategory : sc
                          )
                        : [...(cat.subCategorys || []), subCategory];
                      return cat.id === id
                        ? {
                            ...cat,
                            subCategorys: newSubCategories,
                          }
                        : cat;
                    })
                  );
                  setEdit(null);
                }}
                clearForm={() => {
                  setEdit(null);
                }}
              />
            ) : (
              <SubCategoryForm
                key="add"
                categoryId={id}
                onSuccess={(subCategory) => {
                  setCategories((prev) =>
                    prev.map((cat) =>
                      cat.id === id
                        ? {
                            ...cat,
                            subCategorys: [
                              ...(cat.subCategorys || []),
                              subCategory,
                            ],
                          }
                        : cat
                    )
                  );
                }}
              />
            )}
          </td>
        </tr>
        {(subCategorys || []).map((category, i) => (
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
                          `${process.env.REACT_APP_HOST}/subCategory/${category.id}`,
                          { method: "DELETE" }
                        ).then((res) => {
                          if (res.status === 204) {
                            setCategories((prev) =>
                              prev.map((cat) =>
                                cat.id === id
                                  ? {
                                      ...cat,
                                      subCategorys: cat.subCategorys.filter(
                                        (c) => c.id !== category.id
                                      ),
                                    }
                                  : cat
                              )
                            );
                          } else if (res.status === 409) {
                            Prompt({
                              type: "error",
                              message: "Remove children to delete this master.",
                            });
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
  );
};
const SubCategoryForm = ({ edit, categoryId, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        fetch(`${process.env.REACT_APP_HOST}/subCategory`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, category: { id: categoryId } }),
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
      <Input
        register={register}
        required={true}
        name="name"
        placeholder="Enter"
      />
      <Input
        register={register}
        type="number"
        required={true}
        name="template"
        placeholder="Enter"
        // icon={<BiSearch />}
      />
      <Checkbox register={register} name="sentinel" />
      <Checkbox register={register} name="reportable" />
      <Toggle register={register} name="status" />
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
