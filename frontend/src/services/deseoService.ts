import axiosInstance from "../api/axiosInstance";
import type { Deseo, DeseoCreate } from "../types";

// Crear un nuevo deseo
export const crearDeseo = async (deseo: DeseoCreate): Promise<Deseo> => {
  const res = await axiosInstance.post<Deseo>("/api/deseos/", deseo);
  return res.data;
};

// Ver deseos de la familia con usuario creador
export const getDeseosFamiliaConUsuarios = async (): Promise<Deseo[]> => {
  const res = await axiosInstance.get<Deseo[]>("/api/deseos/familia/deseos");
  return res.data;
};

// Cambiar estado de un deseo (pendiente → comprado)
export const cambiarEstadoDeseo = async (id_deseo: number): Promise<Deseo> => {
  const res = await axiosInstance.patch<Deseo>(`/api/deseos/${id_deseo}/estado`);
  return res.data;
};

// Eliminar deseo propio
export const eliminarDeseo = async (
  id_deseo: number
): Promise<{ msg: string }> => {
  const res = await axiosInstance.delete<{ msg: string }>(
    `/api/deseos/${id_deseo}`
  );
  return res.data;
};
