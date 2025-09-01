import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import FamiliaPage from "../pages/FamiliaPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/familia" element={<FamiliaPage />} />
    </Routes>
  );
}
