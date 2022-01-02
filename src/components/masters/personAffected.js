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

export default function PersonAffected() {
  const [selected, setSelected] = useState(null);
  const [personAffecteds, setPersonAffecteds] = useState([]);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/personAffected`)
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded?.personAffected) {
          setPersonAffecteds(data._embedded.personAffected);
          setSelected(data._embedded.personAffected[0]?.pa_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={s.container}>
      <header>
        <h3>PERSON AFFECTED</h3>
      </header>
      <div className={`${s.content} ${s.parent_child}`}>
        <div className={`${s.personAffected} ${s.parent}`}>
          <Table
            columns={[
              { label: "Master name" },
              { label: "Status" },
              { label: "Action" },
            ]}
          >
            <tr>
              <td className={s.inlineForm}>
                <PersonAffectedForm
                  edit={edit}
                  onSuccess={(newPerson) => {
                    setPersonAffecteds((prev) => {
                      return prev.find((p) => p.pa_id === newPerson.pa_id)
                        ? prev.map((p) =>
                            p.pa_id === newPerson.pa_id ? newPerson : p
                          )
                        : [...prev, newPerson];
                    });
                    setEdit(null);
                  }}
                  clearForm={() => {
                    setEdit(null);
                  }}
                />
              </td>
            </tr>
            {personAffecteds.map((personAffected, i) => (
              <tr
                key={i}
                className={personAffected.pa_id === selected ? s.selected : ""}
              >
                <td>
                  <span
                    className={s.conName}
                    onClick={() => setSelected(personAffected.pa_id)}
                  >
                    {personAffected.name}
                  </span>
                </td>
                <td>
                  <Toggle />
                </td>
                <TableActions
                  actions={[
                    {
                      icon: <BsPencilFill />,
                      label: "Edit",
                      callBack: () => setEdit(personAffected),
                    },
                    {
                      icon: <FaRegTrashAlt />,
                      label: "Delete",
                      callBack: () =>
                        Prompt({
                          type: "confirmation",
                          message: `Are you sure you want to remove ${personAffected.name}?`,
                          callback: () => {
                            fetch(
                              `${process.env.REACT_APP_HOST}/personAffected/${personAffected.pa_id}`,
                              {
                                method: "DELETE",
                              }
                            ).then((res) => {
                              if (res.status === 204) {
                                setPersonAffecteds((prev) =>
                                  prev.filter(
                                    (p) => p.pa_id !== personAffected.pa_id
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
        {personAffecteds.find((cat) => cat.pa_id === selected) && (
          <PersonAffectedDetail
            personAffected={personAffecteds.find(
              (cat) => cat.pa_id === selected
            )}
            setPersonAffecteds={setPersonAffecteds}
          />
        )}
      </div>
    </div>
  );
}
const PersonAffectedForm = ({ edit, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const url = `${process.env.REACT_APP_HOST}/personAffected${
          edit ? `/${edit.pa_id}` : ""
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
      <Toggle />
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

const PersonAffectedDetail = ({
  personAffected: { pa_id, name, personAffectedDetails },
  setPersonAffecteds,
}) => {
  const [edit, setEdit] = useState(null);
  return (
    <div className={s.child}>
      <div className={s.head}>
        <span className={s.personAffectedName}>
          Master name: <strong>{name}</strong>
        </span>
      </div>
      <Table columns={[{ label: "Description" }, { label: "Action" }]}>
        <tr>
          <td className={s.inlineForm}>
            {edit ? (
              <PersonAffectedDetailForm
                key="edit"
                edit={edit}
                personAffectedId={pa_id}
                onSuccess={(personAffectedDetail) => {
                  setPersonAffecteds((prev) =>
                    prev.map((pa) => {
                      if (pa.pa_id !== pa_id) return pa;
                      const newDetails = pa.personAffectedDetails?.find(
                        (pad) => pad.id === personAffectedDetail.id
                      )
                        ? pa.personAffectedDetails?.map((pad) =>
                            pad.id === personAffectedDetail.id
                              ? personAffectedDetail
                              : pad
                          )
                        : [
                            ...(pa.personAffectedDetails || []),
                            personAffectedDetail,
                          ];
                      return {
                        ...pa,
                        personAffectedDetails: newDetails,
                      };
                    })
                  );
                  setEdit(null);
                }}
                clearForm={() => {
                  setEdit(null);
                }}
              />
            ) : (
              <PersonAffectedDetailForm
                key="add"
                personAffectedId={pa_id}
                onSuccess={(personAffectedDetail) => {
                  setPersonAffecteds((prev) =>
                    prev.map((pa) => {
                      if (pa.pa_id !== pa_id) return pa;
                      return {
                        ...pa,
                        personAffectedDetails: [
                          ...(pa.personAffectedDetails || []),
                          personAffectedDetail,
                        ],
                      };
                    })
                  );
                }}
              />
            )}
          </td>
        </tr>
        {(personAffectedDetails || []).map((personAffected, i) => (
          <tr key={i}>
            <td>{personAffected.name}</td>
            <TableActions
              actions={[
                {
                  icon: <BsPencilFill />,
                  label: "Edit",
                  callBack: () => setEdit(personAffected),
                },
                {
                  icon: <FaRegTrashAlt />,
                  label: "Delete",
                  callBack: () =>
                    Prompt({
                      type: "confirmation",
                      message: `Are you sure you want to remove ${personAffected.name}?`,
                      callback: () => {
                        fetch(
                          `${process.env.REACT_APP_HOST}/personAffectedDetails/${personAffected.id}`,
                          { method: "DELETE" }
                        ).then((res) => {
                          if (res.status === 204) {
                            setPersonAffecteds((prev) =>
                              prev.map((pa) =>
                                pa.pa_id === pa_id
                                  ? {
                                      ...pa,
                                      personAffectedDetails: pa.personAffectedDetails.filter(
                                        (pad) => pad.id !== personAffected.id
                                      ),
                                    }
                                  : pa
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
const PersonAffectedDetailForm = ({
  edit,
  personAffectedId,
  onSuccess,
  clearForm,
}) => {
  const { handleSubmit, register, reset } = useForm(edit || {});
  useEffect(() => {
    if (edit) {
      reset(edit);
    }
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        fetch(`${process.env.REACT_APP_HOST}/personAffectedDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            personAffected: { pa_id: personAffectedId },
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
