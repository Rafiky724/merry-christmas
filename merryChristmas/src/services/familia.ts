import api from "../lib/api";

export interface Familia {
  id_familia: number;
  nombre: string;
  codigo: string;
}

export const crearFamilia = async (nombre: string) => {
  const { data } = await api.post<Familia>("/familias", { nombre });
  return data;
};

export const unirseFamilia = async (codigo: string) => {
  const { data } = await api.post(`/familias/unirse/${codigo}`);
  return data;
};

export const salirFamilia = async () => {
  const { data } = await api.post("/familias/salir");
  return data;
};
