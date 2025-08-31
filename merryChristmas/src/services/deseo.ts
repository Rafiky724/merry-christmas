import api from "@/lib/api";

export type Deseo = {
  id_deseo: number;
  descripcion: string;
  estado: "pendiente" | "comprado";
  usuario: {
    id_usuario: number;
    username: string;
  };
}

export const listarDeseos = async () => {
  const { data } = await api.get<Deseo[]>("/deseos");
  return data;
};

export const crearDeseo = async (descripcion: string) => {
  const { data } = await api.post<Deseo>("/deseos", { descripcion });
  return data;
};

export const eliminarDeseo = async (id: number) => {
  const { data } = await api.delete(`/deseos/${id}`);
  return data;
};

export const cambiarEstadoDeseo = async (id: number) => {
  const { data } = await api.patch<Deseo>(`/deseos/${id}/estado`);
  return data;
};
