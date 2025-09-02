import { Link } from "react-router-dom";
import type { Deseo } from "../types";
import { useState } from "react";
import { cambiarEstadoDeseo, eliminarDeseo } from "../services/deseoService";

type Props = {
  deseo: Deseo;
  esMio: boolean; // para saber si el deseo es del usuario actual
  eliminarDeseoDeLista: (id_deseo: number) => void;
};

export default function DeseoCard({
  deseo,
  esMio,
  eliminarDeseoDeLista,
}: Props) {
  const [estado, setEstado] = useState(deseo.estado);

  const handleComprar = async () => {
    try {
      const deseoActualizado = await cambiarEstadoDeseo(deseo.id_deseo);
      setEstado(deseoActualizado.estado);
      // Opcional: mostrar mensaje, notificación, etc.
    } catch (error) {
      console.error("Error al cambiar estado del deseo:", error);
      // Opcional: mostrar error al usuario
    }
  };

  const handleEliminar = async () => {
    try {
      // Llamamos al servicio para eliminar el deseo
      const response = await eliminarDeseo(deseo.id_deseo);
      console.log(response.msg); // Opcional: mostrar mensaje en consola o notificación
      eliminarDeseoDeLista(deseo.id_deseo); // Actualizamos la lista de deseos eliminando el deseo
    } catch (error) {
      console.error("Error al eliminar el deseo:", error);
    }
  };

  return (
    <div className="relative sm:w-md bg-white rounded-4xl p-4 border border-gray-200 transition duration-300 flex flex-col justify-between shadow-[6px_6px_0px_0px_#d1d5db]">
      <div className="bg-[#a8ced2] rounded-t-2xl mb-2 p-4">
        {/* Fecha centrada */}
        <div className="text-center text-xs text-white poppins-regular mb-2">
          {deseo.fecha_creacion}
        </div>

        {/* Nombre y precio */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md poppins-bold text-[#e64563]">
            {deseo.nombre}
          </h3>
          <span className="text-sm text-[#e64563] poppins-bold">
            ${deseo.precio?.toFixed(2) ?? "0.00"}
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
          <Link
            to={deseo.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#836aa9] text-white text-sm py-1 px-3 rounded-md hover:bg-[#583e80] transition cursor-pointer">
              Link
            </button>
          </Link>

          {/* Mostrar botón Comprar solo si NO es mío */}
          {!esMio && (
            <button
              onClick={handleComprar}
              className="bg-[#69ad6b] text-white text-sm py-1 px-3 rounded-md hover:bg-[#448546] transition cursor-pointer"
            >
              Comprar
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#a8ced2] rounded-b-lg p-2 text-center text-white poppins-bold mb-4">
        <p>{deseo.usuario?.nombre}</p>
      </div>

      {/* Botones abajo */}
      <div className="flex justify-center items-center mt-auto poppins-bold">
        {/* Mostrar estado solo si NO es mío */}
        {!esMio && (
          <button className="bg-[#6aa3af] text-white text-sm py-1 px-3 rounded-sm relative group">
            Estado
            {/* Estado visible solo en hover */}
            <span className="absolute -left-3 -top-0 bg-[#6aa3af] text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {estado}
            </span>
          </button>
        )}

        {/* Mostrar botón X solo si es mío */}
        {esMio && (
          <button
            onClick={handleEliminar}
            className="bg-[#b8173e] text-[#e64563] text-sm py-1 px-3 rounded-md hover:bg-[#850d2b] transition cursor-pointer"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}
