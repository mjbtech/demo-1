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

export default function Rcas() {
  const [rca, setRca] = useState(null);
  const [rcas, setRcas] = useState([]);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/rca`)
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded?.rca) {
          setRcas(data._embedded.rca);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={s.container}>
      <header>
        <h3>RCA MASTER</h3>
      </header>
      <div className={s.content}>
        <Box label="RCA">
          <div className={s.rca}>
            <div className={s.head}>
              <Input placeholder="Quick Search" icon={<BiSearch />} />
            </div>
            <Table columns={[{ label: "Rca Name" }, { label: "Action" }]}>
              <tr className={s.filterForm}>
                <td className={s.inlineForm}>
                  {edit ? (
                    <RcaForm
                      key="edit"
                      edit={edit}
                      onSuccess={(newCat) => {
                        setRcas((prev) => {
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
                    <RcaForm
                      key="add"
                      onSuccess={(newCat) => {
                        setRcas((prev) => {
                          return prev.find((c) => c.id === newCat.id)
                            ? prev.map((c) => (c.id === newCat.id ? newCat : c))
                            : [...prev, newCat];
                        });
                      }}
                    />
                  )}
                </td>
              </tr>
              {rcas.map((rca, i) => (
                <tr key={i}>
                  <td>
                    <span className={s.rcaName} onClick={() => setRca(rca.id)}>
                      {rca.name}
                    </span>
                  </td>
                  <TableActions
                    actions={[
                      {
                        icon: <BsPencilFill />,
                        label: "Edit",
                        callBack: () => setEdit(rca),
                      },
                      {
                        icon: <FaRegTrashAlt />,
                        label: "Delete",
                        callBack: () =>
                          Prompt({
                            type: "confirmation",
                            message: `Are you sure you want to remove ${rca.name}?`,
                            callback: () => {
                              fetch(
                                `${process.env.REACT_APP_HOST}/rca/${rca.id}`,
                                {
                                  method: "DELETE",
                                }
                              ).then((res) => {
                                if (res.status === 204) {
                                  setRcas((prev) =>
                                    prev.filter((c) => c.id !== rca.id)
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
        </Box>
        {rcas.find((cat) => cat.id === rca) && (
          <RcaCauses
            rca={rcas.find((cat) => cat.id === rca)}
            setRcas={setRcas}
          />
        )}
      </div>
    </div>
  );
}
const RcaForm = ({ edit, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const url = `${process.env.REACT_APP_HOST}/rca${
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

const RcaCauses = ({ rca: { id, name, rcaCauses }, setRcas }) => {
  const [edit, setEdit] = useState(null);
  return (
    <Box label="RCA CAUSES">
      <div className={s.rcaCauses}>
        <div className={s.head}>
          <span className={s.rcaName}>
            Rca name: <strong>{name}</strong>
          </span>
        </div>
        <Table columns={[{ label: "Cause" }, { label: "Action" }]}>
          <tr>
            <td className={s.inlineForm}>
              {edit ? (
                <RcaCauseForm
                  key="edit"
                  edit={edit}
                  rcaId={id}
                  onSuccess={(rcaCause) => {
                    setRcas((prev) =>
                      prev.map((cat) => {
                        const newRcaCauses = cat.rcaCauses?.find(
                          (sc) => sc.id === rcaCause.id
                        )
                          ? cat.rcaCauses?.map((sc) =>
                              sc.id === rcaCause.id ? rcaCause : sc
                            )
                          : [...(cat.rcaCauses || []), rcaCause];
                        return cat.id === id
                          ? {
                              ...cat,
                              rcaCauses: newRcaCauses,
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
                <RcaCauseForm
                  key="add"
                  rcaId={id}
                  onSuccess={(rcaCause) => {
                    setRcas((prev) =>
                      prev.map((cat) =>
                        cat.id === id
                          ? {
                              ...cat,
                              rcaCauses: [...(cat.rcaCauses || []), rcaCause],
                            }
                          : cat
                      )
                    );
                  }}
                />
              )}
            </td>
          </tr>
          {(rcaCauses || []).map((rca, i) => (
            <tr key={i}>
              <td>{rca.name}</td>
              <TableActions
                actions={[
                  {
                    icon: <BsPencilFill />,
                    label: "Edit",
                    callBack: () => setEdit(rca),
                  },
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Delete",
                    callBack: () =>
                      Prompt({
                        type: "confirmation",
                        message: `Are you sure you want to remove ${rca.name}?`,
                        callback: () => {
                          fetch(
                            `${process.env.REACT_APP_HOST}/rcaCause/${rca.id}`,
                            { method: "DELETE" }
                          ).then((res) => {
                            if (res.status === 204) {
                              setRcas((prev) =>
                                prev.map((cat) =>
                                  cat.id === id
                                    ? {
                                        ...cat,
                                        rcaCauses: cat.rcaCauses.filter(
                                          (c) => c.id !== rca.id
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
    </Box>
  );
};
const RcaCauseForm = ({ edit, rcaId, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        fetch(`${process.env.REACT_APP_HOST}/rcaCauses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, rca: { id: rcaId } }),
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
