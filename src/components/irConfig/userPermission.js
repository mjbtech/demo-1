import { useState, useEffect } from "react";
import { FaInfoCircle, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Box } from "../incidentReport";
import { TiTick } from "react-icons/ti";
import { Input, Checkbox, Table, TableActions, Toggle } from "../elements";
import { Modal, Prompt } from "../modal";
import s from "./config.module.scss";

export default function UserPermission() {
  const [permissions, setPermissions] = useState([
    {
      role: "IR ADMIN",
      permissions: {
        "IR Master": false,
        "IR Configuration": false,
      },
    },
    {
      role: "INCIDNET REPORTER",
      permissions: {
        "Incident Reporting": false,
        "View access to reported incident by self": false,
        "View Access to Root cause analysis tab": false,
        "View Access to CAPA tab": false,
        "View Access to IR closure tab": false,
        "Incident closure dashboard": false,
        "CAPA dashboard - access and update CAPA's marked reponsible for": false,
        "Print Reported IR's": false,
      },
    },
    {
      role: "IR INVESTIGATOR",
      permissions: {
        "Access to view IR's": false,
        "Merge IRs": false,
        "Cancel IR": false,
        "Update IR investigation for assigned IRs": false,
        "CAPA Dashboard - Update CAPA for assigned IRs": false,
        "CAPA Dashboard - access and update CAPA's marked responsible for": false,
        "Update IR Closure": false,
        "Recity IR information for assigned IR": false,
        "Update Reportable incident information": false,
        "Add addendum": false,
        "IR Analytics": false,
        "Custom Reports": false,
        Print: false,
      },
    },
    {
      role: "INCIDENT MANAGER",
      permissions: {
        "Approve IRs": false,
        "Cancel IR": false,
        "Assign IRs": false,
        "Merge IRs": false,
        "CAPA dashboard - Access for CAPA's of all IRs": false,
        "IR Analytics": false,
        "Custom Reports": false,
        Print: false,
      },
    },
    {
      role: "HEAD OF THE DEPARTMENT",
      permissions: {
        "Approve IR": false,
        "Acknowledge IR": false,
        "View Departments IR": false,
      },
    },
  ]);
  const [userPermission, setUserPermission] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/userPermission/5`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          const _permission = data.permission.split(",");
          setUserPermission({ ...data, permission: _permission });
        }
      });
  }, []);
  return (
    <div className={s.container}>
      <header>
        <h3>USER MANAGEMENT</h3>
      </header>
      <div className={s.userPermission}>
        {permissions.map(({ role, permissions }) => (
          <Box label={role} key={role}>
            <Table columns={[{ label: "Permission" }]}>
              {Object.entries(permissions).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td>
                      <input
                        type="checkbox"
                        checked={
                          userPermission?.permission.includes(key) || false
                        }
                        onChange={() => {
                          if (userPermission?.permission.includes(key)) {
                            setUserPermission((prev) => ({
                              ...prev,
                              permission: prev.permission.filter(
                                (item) => item !== key
                              ),
                            }));
                          } else {
                            setUserPermission((prev) => ({
                              ...prev,
                              permission: [...prev.permission, key],
                            }));
                          }
                        }}
                      />{" "}
                      {key}
                    </td>
                  </tr>
                );
              })}
            </Table>
          </Box>
        ))}
      </div>
      <div className={s.btns}>
        <button
          className="btn w-100"
          onClick={() => {
            fetch(`${process.env.REACT_APP_HOST}/userPermission/5`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                permission: userPermission.permission.join(","),
                user: { id: 7 },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.id) {
                  Prompt({
                    type: "information",
                    message: "Permission has been saved.",
                  });
                }
              });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
