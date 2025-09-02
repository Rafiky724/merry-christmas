import React, { useState } from "react";
import { crearDeseo } from "../services/deseoService"; // Importa el servicio
import type { DeseoCreate } from "../types"; // Asegúrate de que el tipo `DeseoCreate` está bien importado
 // Asegúrate de que el tipo `DeseoCreate` está bien importado

type Props = {
  onClose: () => void;
};

export default function DeseoModal({ onClose }: Props) {
  // Estado para los inputs
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number>(0);
  const [descripcion, setDescripcion] = useState("");
  const [link, setLink] = useState("");
  
  // Estado para manejo de errores y carga
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Limpiar errores previos

    const nuevoDeseo: DeseoCreate = {
      nombre,
      precio,
      descripcion,
      link,
      estado: "pendiente", // Este es el estado por defecto que puedes cambiar
    };

    try {
      await crearDeseo(nuevoDeseo); // Llamamos al servicio para crear el deseo
      onClose(); // Cierra el modal después de crear el deseo
    } catch (err) {
      setError("Hubo un error al crear el deseo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-80 sm:w-full max-w-md bg-[#a8ced2] border-2 border-[#6aa3af] rounded-lg shadow-2xl p-0 sm:p-8 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl poppins-bold text-white mt-12 text-center">
          Agregar Deseo
        </h2>

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Nombre
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Precio
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa el precio"
              value={precio || ""}
              onChange={(e) => setPrecio(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa tu descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm poppins-bold text-white mb-1">
              Link
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa el link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="w-full flex justify-around">
            <button
              type="submit"
              className="w-full bg-[#69ad6b] text-md poppins-bold text-white py-2 px-4 rounded-2xl hover:bg-[#448546] transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Deseo"}
            </button>
          </div>
        </form>

        {/* Guirnalda */}
        <div className="-z-40 w-25 h-25 sm:w-40 sm:h-40 bg-[url('/guirnalda.png')] bg-cover bg-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        {/* Flor izquierda */}
        <div className="-z-40 w-25 h-25 sm:w-28 sm:h-28 bg-[url('/flor_navidad.png')] bg-cover bg-center absolute -top-10 -left-10" />

        {/* Flor derecha reflejada */}
        <div className="-z-40 w-25 h-25 sm:w-28 sm:h-28 bg-[url('/flor_navidad.png')] bg-cover bg-center absolute -top-10 -right-10 -scale-x-100" />
      </div>
    </div>
  );
}
