import type { Familia } from "../types";
import axiosInstance from "../api/axiosInstance";

// Crear familia
export const crearFamilia = async (nombre: string) => {
  const res = await axiosInstance.post<Familia>("/api/familias", { nombre });
  return res.data;
};

// Unirse a familia
export const unirseFamilia = async (codigo: string) => {
  const res = await axiosInstance.post<{ msg: string }>(`/api/familias/unirse/${codigo}`);
  return res.data;
};