import { Routes, Route } from "react-router-dom";
import MainConfig from "./mainConfiguration";
import UserPermission from "./userPermission";
import IrDataAnalytics from "./irDataAnalytics";

export default function IrConfig() {
  return (
    <Routes>
      <Route path="/mainConfig" element={<MainConfig />} />
      <Route path="/userPermission" element={<UserPermission />} />
      <Route path="/irDataAnalytics" element={<IrDataAnalytics />} />
    </Routes>
  );
}
