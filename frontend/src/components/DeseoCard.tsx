import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import type { Deseo } from "../types";
import { cambiarEstadoDeseo, eliminarDeseo } from "../services/deseoService";

type Props = {
  deseo: Deseo;
};

export default function DeseoCard({ deseo }: Props) {
  const queryClient = useQueryClient();

  const { mutate: comprarDeseo } = useMutation({
    mutationFn: () => cambiarEstadoDeseo(deseo.id_deseo),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["deseosFamilia"] }),
  });

  const { mutate: borrarDeseo } = useMutation({
    mutationFn: () => eliminarDeseo(deseo.id_deseo),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["deseosFamilia"] }),
  });

  return (
    <div className="relative sm:w-md bg-white rounded-4xl p-4 border border-gray-200 transition duration-300 flex flex-col justify-between shadow-[6px_6px_0px_0px_#d1d5db]">
      <div className="bg-[#a8ced2] rounded-t-2xl mb-2 p-4">
        {/* Fecha centrada */}
        <div className="text-center text-xs text-white poppins-regular mb-2">
          {new Date(deseo.fecha_creacion).toLocaleDateString()}
        </div>

        {/* Nombre y precio */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md poppins-bold text-[#e64563]">
            {deseo.nombre}
          </h3>

          <span className="text-sm text-[#e64563] poppins-bold">
            {deseo.precio}
          </span>
        </div>

        {/* Separador */}
        <hr className="border-1 border-[#b8173e] mb-3" />

        {/* Descripción */}
        <p className="text-sm text-[#e64563] poppins-regular text-justify mb-6">
          {deseo.descripcion}
        </p>

        {/* Botones card */}
        <div className="flex justify-between items-center mt-auto poppins-bold">
          <Link to={deseo.link ?? "#"} target="_blank">
            <button className="bg-[#836aa9] text-white text-sm py-1 px-3 rounded-md hover:bg-[#583e80] transition cursor-pointer">
              Link
            </button>
          </Link>
          <button
            onClick={() => comprarDeseo()}
            disabled={deseo.estado === "comprado"}
            className="bg-[#69ad6b] text-white text-sm py-1 px-3 rounded-md hover:bg-[#448546] transition cursor-pointer disabled:bg-gray-400"
          >
            {deseo.estado === "pendiente" ? "Comprar" : "Comprado"}
          </button>
        </div>
      </div>

      <div className="bg-[#a8ced2] rounded-b-lg p-2 text-center text-white poppins-bold mb-4">
        <p>{deseo.usuario?.nombre ?? "Anónimo"}</p>
      </div>

      {/* Botones abajo */}
      <div className="flex justify-between items-center mt-auto poppins-bold">
        <button className="bg-[#6aa3af] text-white text-sm py-1 px-3 rounded-sm hover:bg-[#a8ced2] transition cursor-pointer">
          {deseo.estado}
        </button>
        <button
          onClick={() => borrarDeseo()}
          className="bg-[#b8173e] text-[#e64563] text-sm py-1 px-3 rounded-md hover:bg-[#850d2b] transition cursor-pointer"
        >
          X
        </button>
      </div>
    </div>
  );
}
