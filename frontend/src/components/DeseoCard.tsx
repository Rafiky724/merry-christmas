import { Link } from "react-router-dom";

export default function DeseoCard() {
  return (
    <div className="relative bg-white rounded-4xl p-4 border border-gray-200 transition duration-300 flex flex-col justify-between shadow-[6px_6px_0px_0px_#d1d5db]">
      <div className="bg-[#a8ced2] rounded-t-2xl mb-2 p-4">
        {/* Fecha centrada */}
        <div className="text-center text-xs text-white poppins-regular mb-2">
          25/04/2025
        </div>

        {/* Nombre y precio */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md poppins-bold text-[#e64563]">
            Nombre del deseo
          </h3>
          <span className="text-sm text-[#e64563] poppins-bold">$250.00</span>
        </div>

        {/* Separador */}
        <hr className="border-1 border-[#b8173e] mb-3" />

        {/* Descripción */}
        <p className="text-sm text-[#e64563] poppins-regular text-justify mb-6">
          Este es un deseo de ejemplo. Puede ser un juguete, un viaje o
          cualquier otro regalo especial que alguien de la familia quiera.
        </p>

        {/* Botones card */}
        <div className="flex justify-between items-center mt-auto poppins-bold">
          <Link to="#">
            <button className="bg-[#836aa9] text-white text-sm py-1 px-3 rounded-md hover:bg-[#583e80] transition cursor-pointer">
              Link
            </button>
          </Link>
          <button className="bg-[#69ad6b] text-white text-sm py-1 px-3 rounded-md hover:bg-[#448546] transition cursor-pointer">
            Comprar
          </button>
        </div>
      </div>

      <div className="bg-[#a8ced2] rounded-b-lg p-2 text-center text-white poppins-bold mb-4">
        <p>Jhon Angel</p>
      </div>

      {/* Botones abajo */}
      <div className="flex justify-between items-center mt-auto poppins-bold">
        <button className="bg-[#6aa3af] text-white text-sm py-1 px-3 rounded-sm hover:bg-[#a8ced2] transition cursor-pointer">
          Ver Estado
        </button>
        <button className="bg-[#b8173e] text-[#e64563] text-sm py-1 px-3 rounded-md hover:bg-[#850d2b] transition cursor-pointer">
          X
        </button>
      </div>
    </div>
  );
}
