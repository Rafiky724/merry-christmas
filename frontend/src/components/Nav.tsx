import { useState } from "react";
import { Link } from "react-router-dom";
import DeseoModal from "./DeseoModal";

export default function Nav() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="bg-[#b8173e] p-4 flex flex-col gap-5 md:flex-row md:justify-between items-center">
        {/* Nombre */}
        <div>
          <p className="text-white poppins-bold">
            Familia Jhon Angel Fuentes{" "}
            <span className="bg-[#a8ced2] p-1 ml-1 rounded-lg text-[#b8173e] poppins-regular">
              Código 72154
            </span>
          </p>
        </div>

        {/* Botón Agregar Deseo */}
        <div className="w-40">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="w-full bg-[#69ad6b] text-md poppins-bold text-white py-2 px-4 rounded-lg hover:bg-[#448546] transition cursor-pointer"
          >
            Agregar Deseo
          </button>
        </div>

        {/* Salir */}
        <div className="text-white poppins-bold">
          <Link to={"/"}>Salir</Link>
        </div>
      </div>

      {/* ModalDeseo se muestra solo si openModal es true */}
      {openModal && <DeseoModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
