import { Link } from "react-router-dom";

type Props = {
  onClose: () => void;
};

export default function DeseoModal({ onClose }: Props) {
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

        <form className="p-4">
          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Nombre
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white  poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Precio
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white  poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa el precio"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#6aa3af] text-white  poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa tu descripción"
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
            />
          </div>
          <div className="w-full flex justify-around">
            <Link to={"/home"}>
              <button
                type="submit"
                className="w-full bg-[#69ad6b] text-md poppins-bold text-white py-2 px-4 rounded-2xl hover:bg-[#448546] transition cursor-pointer"
              >
                Crear
              </button>
            </Link>
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
