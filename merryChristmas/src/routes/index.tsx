import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import FamiliaPage from "@/pages/Familia";
import DeseosPage from "@/pages/Deseo";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Privado con Layout */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <h1>Bienvenido 🎁</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/familia"
          element={
            <ProtectedRoute>
              <FamiliaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deseos"
          element={
            <ProtectedRoute>
              <DeseosPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
