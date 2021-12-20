import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import IncidentReport from "./incidentReport";
import OtherPages from "./otherPages";
import Categories from "./categories";
import PersonAffected from "./personAffected";
import TwoFieldMaster from "./twoFieldMaster";
import ContributingFactor from "./contributingFactor";
import Rca from "./rca";
import s from "./dashboard.module.scss";

const Accordion = ({ label, basePath, items, className }) => {
  const location = useLocation();
  return (
    <li
      className={`${s.accordion} ${
        location.pathname.startsWith(basePath) ? s.open : ""
      } ${className || ""}`}
    >
      <Link className={s.accordionLabel} to="/masters">
        {label} <BsChevronRight />
      </Link>
      {location.pathname.startsWith(basePath) && (
        <ul className={s.submenu}>
          {items.map((item) => (
            <li
              key={item.path}
              className={`${
                location.pathname.startsWith(basePath + "/" + item.path)
                  ? s.active
                  : ""
              }`}
            >
              <Link to={`${basePath}/${item.path}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

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
            className={`${s.sidebarItem} ${
              location.pathname === "/incident-report" ? s.active : ""
            }`}
          >
            <Link to="/incident-report">Incident Reporting</Link>
          </li>
          <li
            className={`${s.sidebarItem} ${
              location.pathname === "/incident-dashboard" ? s.active : ""
            }`}
          >
            <Link to="/incident-dashboard">Incident Dashboard</Link>
          </li>
          <li
            className={`${s.sidebarItem} ${
              location.pathname === "/capa-dashboard" ? s.active : ""
            }`}
          >
            <Link to="/capa-dashboard">CPA Reporting</Link>
          </li>
          <li
            className={`${s.sidebarItem} ${
              location.pathname === "/reports" ? s.active : ""
            }`}
          >
            <Link to="/reports">Reports</Link>
          </li>
          <Accordion
            label="Masters"
            basePath="/masters"
            className={`${s.sidebarItem} ${
              location.pathname.startsWith("/masters") ? s.active : ""
            }`}
            items={[
              { label: <>Location</>, path: "location" },
              { label: <>Department</>, path: "department" },
              {
                label: <>Category & Sub Category</>,
                path: "categoryAndSubCategory",
              },
              { label: <>Sentinel Event</>, path: "sentinelEvent" },
              { label: <>User master</>, path: "userMaster" },
              { label: <>Person affected</>, path: "personAffected" },
              { label: <>Two Field Master</>, path: "twoFieldMaster" },
              { label: <>Contributing Factor</>, path: "contributingFactor" },
              { label: <>RCA Master</>, path: "rca" },
            ]}
          />
        </ul>
      </div>
      <main>
        <Routes>
          <Route path="/incident-report" element={<IncidentReport />} />
          <Route
            path="/masters/categoryAndSubCategory"
            element={<Categories />}
          />
          <Route path="/masters/personAffected" element={<PersonAffected />} />
          <Route path="/masters/twoFieldMaster" element={<TwoFieldMaster />} />
          <Route
            path="/masters/contributingFactor"
            element={<ContributingFactor />}
          />
          <Route path="/masters/rca" element={<Rca />} />
          <Route path="/:other" element={<OtherPages />} />
          <Route path="/*" element={<IncidentReport />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
