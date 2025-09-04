import type { Familia } from "../types";
import axiosInstance from "../api/axiosInstance";

// Crear familia
export const crearFamilia = async (nombre: string) => {
  
  const formData = new URLSearchParams();
  formData.append("nombre", nombre);

  const res = await axiosInstance.post<Familia>("/api/familias/", formData);
  return res.data;
};

// Unirse a familia
export const unirseFamilia = async (codigo: string) => {
  const res = await axiosInstance.post<{ msg: string }>(`/api/familias/unirse/${codigo}`);
  return res.data;
};

// Verificar si el usuario tiene familia
export const miFamilia = async () => {
  const res = await axiosInstance.get<{
    tieneFamilia: boolean;
    familia: Familia | null;
  }>("/api/familias/mi-familia");
  return res.data;
};