import { useState } from "react";
import { Link } from "react-router-dom";
import DeseoModal from "./DeseoModal";

export default function Nav() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="bg-[#b8173e] p-4 flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
        {/* Nombre */}
        <div className="text-center md:text-left">
          <p className="text-white poppins-bold text-lg md:text-base">
            Familia Jhon Angel Fuentes{" "}
            <span className="bg-[#a8ced2] p-1 ml-1 rounded-lg text-[#b8173e] poppins-regular text-sm">
              Código 72154
            </span>
          </p>
        </div>

        {/* Botón Agregar Deseo */}
        <div className="w-full max-w-xs md:w-40">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="w-full bg-[#69ad6b] text-md poppins-bold text-white py-3 rounded-lg hover:bg-[#448546] transition cursor-pointer"
          >
            Agregar Deseo
          </button>
        </div>

        {/* Salir */}
        <div className="text-white poppins-bold text-lg mt-1 md:mt-0">
          <Link to={"/"} className="hover:underline">
            Salir
          </Link>
        </div>
      </div>

      {/* ModalDeseo se muestra solo si openModal es true */}
      {openModal && <DeseoModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
