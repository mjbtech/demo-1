import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import IncidentReport from "./incidentReport";
import OtherPages from "./otherPages";
import s from "./dashboard.module.scss";

function Dashboard() {
  const location = useLocation();
  const [collaped, setCollapsed] = useState(false);
  return (
    <div className={s.container}>
      <div className={`${s.sidebar} ${collaped ? s.collaped : ""}`}>
        <button
          className={`clear ${s.collapseBtn}`}
          onClick={() => setCollapsed(!collaped)}
        >
          <BiChevronLeft />
        </button>
        <ul className={s.links}>
          <li
            className={location.pathname === "/incident-report" ? s.active : ""}
          >
            <Link to="/incident-report">Incident Reporting</Link>
          </li>
          <li
            className={
              location.pathname === "/incident-dashboard" ? s.active : ""
            }
          >
            <Link to="/incident-dashboard">Incident Dashboard</Link>
          </li>
          <li
            className={location.pathname === "/capa-dashboard" ? s.active : ""}
          >
            <Link to="/capa-dashboard">CPA Reporting</Link>
          </li>
          <li className={location.pathname === "/reports" ? s.active : ""}>
            <Link to="/reports">Reports</Link>
          </li>
          <li className={location.pathname === "/meters" ? s.active : ""}>
            <Link to="/meters">Meters</Link>
          </li>
        </ul>
      </div>
      <main>
        <Routes>
          <Route path="/incident-report" element={<IncidentReport />} />
          <Route path="/:other" element={<OtherPages />} />
          <Route path="/*" element={<IncidentReport />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
