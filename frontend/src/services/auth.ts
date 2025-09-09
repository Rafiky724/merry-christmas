import axiosInstance from "../api/axiosInstance";
import qs from "qs";
import type { Usuario } from "../types";

// export const registerUsuario = async (data: UsuarioCreate) => {
//     const res = await axiosInstance.post("/api/auth/register", data);
//     return res.data;
// };

export const loginUsuario = async (correo: string, contrasena: string) => {
    const data = qs.stringify({
        username: correo,
        password: contrasena,
    });

    const res = await axiosInstance.post("/api/auth/login", data);
    return res.data; // { access_token: ..., token_type: ... }
};

export const logoutUsuario = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};

export const getUsuarioActual = async (): Promise<Usuario> => {
  const res = await axiosInstance.get<Usuario>("/api/auth/me");
  return res.data;
};