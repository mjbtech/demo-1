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
  const [permissions, setPermissions] = useState([
    {
      role: "IR ADMIN",
      permissions: {
        "IR Master": true,
        "IR Configuration": true,
      },
    },
    {
      role: "INCIDNET REPORTER",
      permissions: {
        "Incident Reporting": true,
        "View access to reported incident by self": true,
        "View Access to Root cause analysis tab": false,
        "View Access to CAPA tab": false,
        "View Access to IR closure tab": true,
        "Incident closure dashboard": true,
        "CAPA dashboard - access and update CAPA's marked reponsible for": true,
        "Print Reported IR's": false,
      },
    },
    {
      role: "IR INVESTIGATOR",
      permissions: {
        "Access to view IR's": "Assigned IR's only",
        "Merge IRs": true,
        "Cancel IR": true,
        "Update IR investigation for assigned IRs": true,
        "CAPA Dashboard - Update CAPA for assigned IRs": true,
        "CAPA Dashboard - access and update CAPA's marked responsible for": true,
        "Update IR Closure": true,
        "Recity IR information for assigned IR": true,
        "Update Reportable incident information": true,
        "Add addendum": true,
        "IR Analytics": "Quick insights",
        "Custom Reports": "Monthly IR Report",
        Print: "IR Closure Screen",
      },
    },
    {
      role: "INCIDENT MANAGER",
      permissions: {
        "Approve IRs": true,
        "Cancel IR": false,
        "Assign IRs": true,
        "Merge IRs": true,
        "CAPA dashboard - Access for CAPA's of all IRs": false,
        "IR Analytics": "Quick insights",
        "Custom Reports": "Injury Reports",
        Print: "IR Reporting Screen",
      },
    },
    {
      role: "HEAD OF THE DEPARTMENT",
      permissions: {
        "Approve IR": false,
        "Acknowledge IR": true,
        "View Departments IR": false,
      },
    },
  ]);
  return (
    <div className={s.container}>
      <header>
        <h3>USER MANAGEMENT</h3>
      </header>
      <div className={s.userPermission}>
        {permissions.map(({ role, permissions }) => (
          <Box label={role} key={role}>
            <Table columns={[{ label: "Permission" }]}>
              {Object.entries(permissions).map(([permission, value]) => (
                <tr key={permission}>
                  <td>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => {}}
                    />{" "}
                    {permission}
                  </td>
                </tr>
              ))}
            </Table>
          </Box>
        ))}
      </div>
      <div className={s.btns}>
        <button className="btn w-100">Save</button>
      </div>
    </div>
  );
}
