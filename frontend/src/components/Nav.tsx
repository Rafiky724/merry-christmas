import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeseoModal from "./DeseoModal";
import { logoutUsuario } from "../services/auth";
import { miFamilia } from "../services/familiaService";
import type { Deseo } from "../types";

type Props = {
  onNuevoDeseo: (nuevoDeseo: Deseo) => void; // Recibimos la función para agregar el nuevo deseo
};

export default function Nav({ onNuevoDeseo }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [familiaNombre, setFamiliaNombre] = useState('');
  const [familiaCodigo, setFamiliaCodigo] = useState('');

  useEffect(() => {
    const fetchFamilia = async () => {
      try {
        const { familia } = await miFamilia();
        if (familia) {
          setFamiliaNombre(familia.nombre);
          setFamiliaCodigo(familia.codigo);
        }
      } catch (err) {
        console.error("Error cargando familia:", err);
      }
    };

    fetchFamilia();
  }, []);

  const handleLogout = () => {
    logoutUsuario(); // 🔥 limpia localStorage
    navigate("/"); // redirige al login
  };

  return (
    <>
      <div className="bg-[#b8173e] p-4 flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
        {/* Nombre */}
        <div className="text-center md:text-left">
          <p className="text-white poppins-bold text-lg md:text-base">
            Familia {familiaNombre}{" "}
            <span className="bg-[#a8ced2] p-1 ml-1 rounded-lg text-[#b8173e] poppins-regular text-sm">
              Código {familiaCodigo}
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
          <button
            onClick={handleLogout}
            className="hover:underline cursor-pointer"
          >
            Salir
          </button>
        </div>
      </div>

      {/* ModalDeseo se muestra solo si openModal es true */}
      {openModal && <DeseoModal onClose={() => setOpenModal(false)} onNuevoDeseo={onNuevoDeseo}/>}
    </>
  );
}
