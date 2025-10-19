import type { Deseo } from "../types";
import { useState } from "react";
import { cambiarEstadoDeseo, eliminarDeseo } from "../services/deseoService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Iconos para mejorar la visibilidad

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
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
    useState(false); // Estado para mostrar modal de confirmación
  const [deseoAComprar, setDeseoAComprar] = useState<Deseo | null>(null); // Guardar el deseo seleccionado para comprar

  const handleComprar = (deseo: Deseo) => {
    // Mostrar el modal de confirmación
    setDeseoAComprar(deseo);
    setMostrarModalConfirmacion(true);
  };

  const confirmarCompra = async () => {
    if (!deseoAComprar) return;

    try {
      // Cambiar el estado del deseo a "Comprado"
      const deseoActualizado = await cambiarEstadoDeseo(deseoAComprar.id_deseo);
      setEstado(deseoActualizado.estado);
      setMostrarModalConfirmacion(false); // Cerrar modal
    } catch (error) {
      console.error("Error al cambiar estado del deseo:", error);
    }
  };

  const cancelarCompra = () => {
    // Cerrar el modal sin hacer nada
    setMostrarModalConfirmacion(false);
  };

  const handleEliminar = async () => {
    try {
      const response = await eliminarDeseo(deseo.id_deseo);
      console.log(response.msg);
      eliminarDeseoDeLista(deseo.id_deseo);
    } catch (error) {
      console.error("Error al eliminar el deseo:", error);
    }
  };

  const formatearPrecioCOP = (precio: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio);
  };

  const esComprado = estado === "comprado"; // Para manejar la lógica de si ya se compró

  return (
    <div className="relative w-sm bg-white p-4 border border-gray-200 transition duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl">
      <div className="bg-[#a8ced2] h-60 rounded-t-2xl mb-2 p-4">
        {/* Nombre, Fecha y precio */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md poppins-bold ">{deseo.nombre}</h3>
          <span className="text-sm text-[#448546] poppins-bold">
            {formatearPrecioCOP(deseo.precio ?? 0)}
          </span>
        </div>

        {/* Separador */}
        <hr className="border-1 border-[#b8173e] mb-3" />

        {/* Descripción */}
        <p className="h-25 overflow-y-auto text-xs poppins-regular text-justify mb-6">
          {deseo.descripcion}
        </p>

        {/* Botones card */}
        <div className="flex justify-between items-center poppins-bold">
          <a
            href={deseo.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#836aa9] text-white text-sm py-1 px-3 rounded-md hover:bg-[#583e80] transition cursor-pointer">
              Link
            </button>
          </a>

          {/* Mostrar botón Comprar solo si NO es mío y no está comprado */}
          {!esMio && !esComprado && (
            <button
              onClick={() => handleComprar(deseo)} // Llamar a handleComprar para mostrar modal
              className="bg-[#69ad6b] text-white text-sm py-1 px-3 rounded-md hover:bg-[#448546] transition cursor-pointer"
            >
              Comprar
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#a8ced2] rounded-b-lg p-2 text-center text-black poppins-bold mb-4">
        <p>{deseo.usuario?.nombre}</p>
      </div>

      {/* Estado o mensaje de sorpresa */}
      <div className="flex justify-center items-center mt-auto poppins-bold">
        {esMio ? (
          ""
        ) : (
          <div
            className={`text-center text-xs font-semibold py-1 px-3 rounded-full mb-2 ${
              esComprado
                ? "bg-green-500 text-white"
                : "bg-[#b8173e] text-white"
            }`}
          >
            {esComprado ? (
              <FaCheckCircle className="inline mr-2" />
            ) : (
              <FaTimesCircle className="inline mr-2" />
            )}
            {estado}
          </div>
        )}

        {/* Mostrar botón X solo si es mío */}
        {esMio && (
          <button
            onClick={handleEliminar}
            className="bg-[#b8173e] text-white text-sm py-1 px-3 rounded-md hover:bg-[#850d2b] transition cursor-pointer"
          >
            Eliminar
          </button>
        )}
      </div>

      {/* Modal de Confirmación */}
      {mostrarModalConfirmacion && (
        <div className="fixed inset-0 bg-gray-600/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-center text-[#e64563] mb-4">
              ¿Estás seguro de que deseas comprar este deseo?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={confirmarCompra}
                className="bg-[#69ad6b] text-white px-6 py-2 rounded-lg hover:bg-[#448546] transition cursor-pointer"
              >
                Sí
              </button>
              <button
                onClick={cancelarCompra}
                className="bg-[#b8173e] text-white px-6 py-2 rounded-lg hover:bg-[#850d2b] transition cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
