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

export default function TwoFieldMasters() {
  const [selected, setSelected] = useState(null);
  const [twoFieldMasters, setTwoFieldMasters] = useState([]);
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/twoFieldMaster`)
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded?.twoFieldMaster) {
          setTwoFieldMasters(data._embedded.twoFieldMaster);
          setSelected(data._embedded.twoFieldMaster[0]?.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={s.container}>
      <header>
        <h3>TWO FIELD MASTER</h3>
      </header>
      <div className={`${s.content} ${s.parent_child}`}>
        {
          //   <Box label="MASTERS LIST">
          // </Box>
        }
        <div className={s.parent}>
          <div className={s.head}>
            <Input
              placeholder="Quick Search"
              icon={<BiSearch />}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <Table columns={[{ label: "Master Name" }, { label: "Action" }]}>
            <tr className={s.filterForm}>
              <td className={s.inlineForm}>
                <TwoFieldMasterForm
                  {...(edit && { edit })}
                  key={edit ? "edit" : "add"}
                  onSuccess={(newCat) => {
                    setTwoFieldMasters((prev) => {
                      return prev.find((c) => c.id === newCat.id)
                        ? prev.map((c) => (c.id === newCat.id ? newCat : c))
                        : [...prev, newCat];
                    });
                    setEdit(null);
                  }}
                  clearForm={() => {
                    setEdit(null);
                  }}
                  twoFieldMasters={twoFieldMasters}
                />
              </td>
            </tr>
            {twoFieldMasters
              .filter((t) =>
                !filter ? true : new RegExp(filter, "gi").test(t.name)
              )
              .map((twoFieldMaster, i) => (
                <tr
                  key={i}
                  className={twoFieldMaster.id === selected ? s.selected : ""}
                >
                  <td>
                    <span
                      className={s.twoFieldMasterName}
                      onClick={() => setSelected(twoFieldMaster.id)}
                    >
                      {twoFieldMaster.name}
                    </span>
                  </td>
                  <TableActions
                    actions={[
                      {
                        icon: <BsPencilFill />,
                        label: "Edit",
                        callBack: () => setEdit(twoFieldMaster),
                      },
                      {
                        icon: <FaRegTrashAlt />,
                        label: "Delete",
                        callBack: () =>
                          Prompt({
                            type: "confirmation",
                            message: `Are you sure you want to remove ${twoFieldMaster.name}?`,
                            callback: () => {
                              fetch(
                                `${process.env.REACT_APP_HOST}/twoFieldMaster/${twoFieldMaster.id}`,
                                {
                                  method: "DELETE",
                                }
                              ).then((res) => {
                                if (res.status === 204) {
                                  setTwoFieldMasters((prev) =>
                                    prev.filter(
                                      (c) => c.id !== twoFieldMaster.id
                                    )
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
        {twoFieldMasters.find((cat) => cat.id === selected) && (
          <TwoFieldMasterDetails
            twoFieldMaster={twoFieldMasters.find((cat) => cat.id === selected)}
            setTwoFieldMasters={setTwoFieldMasters}
          />
        )}
      </div>
    </div>
  );
}
const TwoFieldMasterForm = ({
  edit,
  onSuccess,
  clearForm,
  twoFieldMasters,
}) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const url = `${process.env.REACT_APP_HOST}/twoFieldMaster${
          edit ? `/${edit.id}` : ""
        }`;
        if (
          !edit &&
          twoFieldMasters?.some(
            (item) =>
              item.name.trim().toLowerCase() === data.name.trim().toLowerCase()
          )
        ) {
          Prompt({
            type: "information",
            message: `${data.name} already exists.`,
          });
          return;
        }
        fetch(url, {
          method: edit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, name: data.name.trim() }),
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

const TwoFieldMasterDetails = ({
  twoFieldMaster: { id, name, twoFieldMasterDetails },
  setTwoFieldMasters,
}) => {
  const [edit, setEdit] = useState(null);
  // <Box label="MASTER DETAILS">
  // </Box>
  return (
    <div className={`${s.child} ${s.twoFieldMasterDetail}`}>
      <div className={s.head}>
        <span className={s.twoFieldMasterName}>
          Master name: <strong>{name}</strong>
        </span>
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
            <TwoFieldMasterDetailForm
              {...(edit && { edit })}
              key={edit ? "edit" : "add"}
              twoFieldMasterId={id}
              onSuccess={(twoFieldMasterDetail) => {
                if (edit) {
                  setTwoFieldMasters((prev) =>
                    prev.map((cat) => {
                      const newTwoFieldMasterDetails = cat.twoFieldMasterDetails?.find(
                        (sc) => sc.id === twoFieldMasterDetail.id
                      )
                        ? cat.twoFieldMasterDetails?.map((sc) =>
                            sc.id === twoFieldMasterDetail.id
                              ? twoFieldMasterDetail
                              : sc
                          )
                        : [
                            ...(cat.twoFieldMasterDetails || []),
                            twoFieldMasterDetail,
                          ];
                      return cat.id === id
                        ? {
                            ...cat,
                            twoFieldMasterDetails: newTwoFieldMasterDetails,
                          }
                        : cat;
                    })
                  );
                } else {
                  setTwoFieldMasters((prev) =>
                    prev.map((cat) =>
                      cat.id === id
                        ? {
                            ...cat,
                            twoFieldMasterDetails: [
                              ...(cat.twoFieldMasterDetails || []),
                              twoFieldMasterDetail,
                            ],
                          }
                        : cat
                    )
                  );
                }
                setEdit(null);
              }}
              clearForm={() => {
                setEdit(null);
              }}
              twoFieldMasterDetails={twoFieldMasterDetails}
            />
          </td>
        </tr>
        {(twoFieldMasterDetails || []).map((twoFieldMaster, i) => (
          <tr key={i}>
            <td>{twoFieldMaster.name}</td>
            <td>
              <Toggle
                readOnly={true}
                defaultValue={twoFieldMaster.showToggle}
              />
            </td>
            <TableActions
              actions={[
                {
                  icon: <BsPencilFill />,
                  label: "Edit",
                  callBack: () => setEdit(twoFieldMaster),
                },
                {
                  icon: <FaRegTrashAlt />,
                  label: "Delete",
                  callBack: () =>
                    Prompt({
                      type: "confirmation",
                      message: `Are you sure you want to remove ${twoFieldMaster.name}?`,
                      callback: () => {
                        fetch(
                          `${process.env.REACT_APP_HOST}/twoFieldMasterDetails/${twoFieldMaster.id}`,
                          { method: "DELETE" }
                        ).then((res) => {
                          if (res.status === 204) {
                            setTwoFieldMasters((prev) =>
                              prev.map((cat) =>
                                cat.id === id
                                  ? {
                                      ...cat,
                                      twoFieldMasterDetails: cat.twoFieldMasterDetails.filter(
                                        (c) => c.id !== twoFieldMaster.id
                                      ),
                                    }
                                  : cat
                              )
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
  );
};
const TwoFieldMasterDetailForm = ({
  edit,
  twoFieldMasterId,
  onSuccess,
  clearForm,
  twoFieldMasterDetails,
}) => {
  const { handleSubmit, register, reset, watch } = useForm({ ...edit });
  useEffect(() => {
    reset({ showToggle: true, ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (
          !edit &&
          twoFieldMasterDetails?.some(
            (item) =>
              item.name.trim().toLowerCase() === data.name.trim().toLowerCase()
          )
        ) {
          Prompt({
            type: "information",
            message: `${data.name} already exists.`,
          });
          return;
        }
        fetch(`${process.env.REACT_APP_HOST}/twoFieldMasterDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            twoFieldMaster: { id: twoFieldMasterId },
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
      <Input
        register={register}
        required={true}
        name="name"
        placeholder="Enter"
      />
      <Toggle
        name="showToggle"
        register={register}
        required={true}
        watch={watch}
      />
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
