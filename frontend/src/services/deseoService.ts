import axiosInstance from "../api/axiosInstance";
import type { Deseo } from "../types";


// Obtener todos los deseos de la familia
export async function getDeseosFamilia(): Promise<Deseo[]> {
  const res = await axiosInstance.get<Deseo[]>("/api/deseos/familia");
  return res.data;
}

// Crear un nuevo deseo
export async function crearDeseo(data: Omit<Deseo, "id_deseo" | "id_usuario" | "id_familia" | "estado" | "fecha_creacion">): Promise<Deseo> {
  const res = await axiosInstance.post<Deseo>("/api/deseos", data);
  return res.data;
}

// Cambiar estado de un deseo
export async function cambiarEstadoDeseo(id_deseo: number): Promise<Deseo> {
  const res = await axiosInstance.patch<Deseo>(`/api/deseos/${id_deseo}/estado`);
  return res.data;
}

// Eliminar deseo
export async function eliminarDeseo(id_deseo: number): Promise<{ msg: string }> {
  const res = await axiosInstance.delete<{ msg: string }>(`/deseos/${id_deseo}`);
  return res.data;
}
