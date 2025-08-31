import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { useAuthStore } from "../../../store/auth";
import type { AuthResponse } from "../../../types";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<AuthResponse>("/auth/register", {
        nombre,
        correo,
        contrasena,
      });
      login(data.user, data.access_token);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            className="w-full border rounded-xl px-3 py-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Correo</label>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            className="w-full border rounded-xl px-3 py-2"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Creando…" : "Crear cuenta"}
        </button>
        <p className="text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
