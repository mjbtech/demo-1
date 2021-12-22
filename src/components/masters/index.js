import { Routes, Route } from "react-router-dom";
import Locations from "./location";
import Categories from "./categories";
import PersonAffected from "./personAffected";
import UserMaster from "./userMaster";
import RiskAssessments from "./ram";
import TwoFieldMaster from "./twoFieldMaster";
import ContributingFactor from "./contributingFactor";
import Rca from "./rca";

export default function Masters() {
  return (
    <Routes>
      <Route path="/location" element={<Locations />} />
      <Route path="/categoryAndSubCategory" element={<Categories />} />
      <Route path="/userMaster" element={<UserMaster />} />
      <Route path="/riskAssessment" element={<RiskAssessments />} />
      <Route path="/personAffected" element={<PersonAffected />} />
      <Route path="/twoFieldMaster" element={<TwoFieldMaster />} />
      <Route path="/contributingFactor" element={<ContributingFactor />} />
      <Route path="/rca" element={<Rca />} />
    </Routes>
  );
}
