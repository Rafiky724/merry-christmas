import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
