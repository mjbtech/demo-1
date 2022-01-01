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

export default function ContributingFactor() {
  const [contributingFactor, setContributingFactor] = useState(null);
  const [contributingFactors, setContributingFactors] = useState([]);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/contributingFactors`)
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded?.contributingFactors) {
          setContributingFactors(data._embedded.contributingFactors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={s.container}>
      <header>
        <h3>CONTRIBUTING FACTORS</h3>
      </header>
      <div className={s.content}>
        <Box label="CONTRIBUTING FACTORS">
          <div className={s.contributingFactor}>
            <div className={s.head}>
              <Input placeholder="Quick Search" icon={<BiSearch />} />
            </div>
            <Table columns={[{ label: "Master name" }, { label: "Action" }]}>
              <tr className={s.filterForm}>
                <td className={s.inlineForm}>
                  {edit ? (
                    <ContributingFactorForm
                      key="edit"
                      edit={edit}
                      onSuccess={(newCon) => {
                        setContributingFactors((prev) => {
                          return prev.find((con) => con.cf_id === newCon.cf_id)
                            ? prev.map((con) =>
                                con.cf_id === newCon.cf_id ? newCon : con
                              )
                            : [...prev, newCon];
                        });
                        setEdit(null);
                      }}
                      clearForm={() => {
                        setEdit(null);
                      }}
                    />
                  ) : (
                    <ContributingFactorForm
                      key="add"
                      onSuccess={(newCon) => {
                        console.log(newCon);
                        setContributingFactors((prev) => {
                          return prev.find((c) => c.cf_id === newCon.cf_id)
                            ? prev.map((c) =>
                                c.cf_id === newCon.cf_id ? newCon : c
                              )
                            : [...prev, newCon];
                        });
                        setEdit(null);
                      }}
                    />
                  )}
                </td>
              </tr>
              {contributingFactors.map((contributingFactor, i) => (
                <tr key={i}>
                  <td>
                    <span
                      className={s.conName}
                      onClick={() =>
                        setContributingFactor(contributingFactor.cf_id)
                      }
                    >
                      {contributingFactor.name}
                    </span>
                  </td>
                  <TableActions
                    actions={[
                      {
                        icon: <BsPencilFill />,
                        label: "Edit",
                        callBack: () => setEdit(contributingFactor),
                      },
                      {
                        icon: <FaRegTrashAlt />,
                        label: "Delete",
                        callBack: () =>
                          Prompt({
                            type: "confirmation",
                            message: `Are you sure you want to remove ${contributingFactor.name}?`,
                            callback: () => {
                              fetch(
                                `${process.env.REACT_APP_HOST}/contributingFactors/${contributingFactor.cf_id}`,
                                { method: "DELETE" }
                              ).then((res) => {
                                if (res.status === 204) {
                                  setContributingFactors((prev) =>
                                    prev.filter(
                                      (con) =>
                                        con.cf_id !== contributingFactor.cf_id
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
        {contributingFactors.find(
          (cat) => cat.cf_id === contributingFactor
        ) && (
          <ContributingFactorDetail
            contributingFactor={contributingFactors.find(
              (cat) => cat.cf_id === contributingFactor
            )}
            setContributingFactors={setContributingFactors}
          />
        )}
      </div>
    </div>
  );
}
const ContributingFactorForm = ({ edit, onSuccess, clearForm }) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const url = `${process.env.REACT_APP_HOST}/contributingFactors${
          edit ? `/${edit.cf_id}` : ""
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

const ContributingFactorDetail = ({
  contributingFactor: { id, name, contributingFactorDetails },
  setContributingFactors,
}) => {
  const [edit, setEdit] = useState(null);
  return (
    <Box label="CONTRIBUTING FACTOR DETAILS">
      <div className={s.contributingFactorDetail}>
        <div className={s.head}>
          <span className={s.contributingFactorName}>
            Master name: <strong>{name}</strong>
          </span>
          {
            //   <Form defaultValues={{ name: name }}>
            //   <Input
            //     className={s.input}
            //     name="name"
            //     label="Master name"
            //     readOnly={true}
            //   />
            // </Form>
          }
        </div>
        <Table columns={[{ label: "Description" }, { label: "Action" }]}>
          <tr>
            <td className={s.inlineForm}>
              <ContributingFactorDetailForm
                edit={edit}
                contributingFactorId={id}
                onSuccess={(contributingFactorDetail) => {
                  setContributingFactors((prev) =>
                    prev.map((con) =>
                      con.id === id
                        ? {
                            ...con,
                            contributingFactorDetails: [
                              ...con.contributingFactorDetails,
                              contributingFactorDetail,
                            ],
                          }
                        : con
                    )
                  );
                }}
                clearForm={() => {
                  setEdit(null);
                }}
              />
            </td>
          </tr>
          {(contributingFactorDetails || []).map((contributingFactor, i) => (
            <tr key={i}>
              <td>{contributingFactor.name}</td>
              <TableActions
                actions={[
                  {
                    icon: <BsPencilFill />,
                    label: "Edit",
                    callBack: () => setEdit(contributingFactor),
                  },
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Delete",
                    callBack: () =>
                      Prompt({
                        type: "confirmation",
                        message: `Are you sure you want to remove ${contributingFactor.name}?`,
                        callback: () => {
                          fetch(
                            `${process.env.REACT_APP_HOST}/contributingFactorDetails/${contributingFactor.id}`,
                            { method: "DELETE" }
                          ).then((res) => {
                            if (res.status === 204) {
                              setContributingFactors((prev) =>
                                prev.map((con) =>
                                  con.cf_id === id
                                    ? {
                                        ...con,
                                        contributingFactorDetail: con.contributingFactorDetail.filter(
                                          (c) =>
                                            c.cf_id !== contributingFactor.cf_id
                                        ),
                                      }
                                    : con
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
const ContributingFactorDetailForm = ({
  edit,
  contributingFactorId,
  onSuccess,
  clearForm,
}) => {
  const { handleSubmit, register, reset } = useForm({ ...edit });
  useEffect(() => {
    reset({ ...edit });
  }, [edit]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        fetch(
          `${process.env.REACT_APP_HOST}/contributingFactorDetails${
            edit ? `/${edit.id}` : ""
          }`,
          {
            method: edit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              contributingFactors: { cf_id: contributingFactorId },
            }),
          }
        )
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
