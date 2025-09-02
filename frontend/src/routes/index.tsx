import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import FamiliaPage from "../pages/FamiliaPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "../guards/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/familia"
        element={
          <PrivateRoute>
            <FamiliaPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
