import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { crearFamilia, unirseFamilia } from "../services/familiaService";
import { toast } from "react-toastify";

export default function Home() {
  const [nombreFamilia, setNombreFamilia] = useState("");
  const [codigoFamilia, setCodigoFamilia] = useState("");
  const [isLoadingCrear, setIsLoadingCrear] = useState(false);
  const [isLoadingUnirse, setIsLoadingUnirse] = useState(false);

  const handleCrearFamilia = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoadingCrear) return;

    setIsLoadingCrear(true);
    try {
      const data = await crearFamilia(nombreFamilia);
      toast.success(
        `Familia "${data.nombre}" creada exitosamente! Código: ${data.codigo}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setTimeout(() => {
        window.location.href = "/familia";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Error al crear familia", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoadingCrear(false);
    }
  };

  const handleUnirseFamilia = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoadingUnirse) return;

    setIsLoadingUnirse(true);
    try {
      const data = await unirseFamilia(codigoFamilia);
      toast.success(data.msg || "Te has unido a la familia exitosamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.href = "/familia";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Error al unirse a familia", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoadingUnirse(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg_merry.png')] bg-cover bg-center relative">
      {/* Sombra encima del fondo */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Card centrada */}
      <div className="w-80 sm:w-full z-10 bg-[#a8ced2] border-2 border-[#6aa3af] p-0 sm:p-8 rounded-lg shadow-lg max-w-md relative">
        <h2 className="text-2xl poppins-bold text-white mt-12 text-center">
          Crear familia
        </h2>
        {/* Aquí puedes colocar el formulario */}
        <form className="p-4" onSubmit={handleCrearFamilia}>
          <div className="mb-4">
            <input
              type="text"
              value={nombreFamilia}
              onChange={(e) => setNombreFamilia(e.target.value)}
              className="w-full px-4 py-2 bg-[#6aa3af] text-white  poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa el nombre para la familia"
            />
          </div>
          <div className="w-30 mx-auto">
            <button
              type="submit"
              disabled={isLoadingCrear}
              className={`w-full bg-[#b8173e] text-md poppins-bold text-white py-2 px-4 rounded-2xl hover:bg-[#940e30] transition cursor-pointer ${
                isLoadingCrear ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoadingCrear ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>

        <h2 className="text-2xl poppins-bold text-white mt-2 text-center">
          Unirse a una familia
        </h2>
        {/* Aquí puedes colocar el formulario */}
        <form className="px-4 py-2" onSubmit={handleUnirseFamilia}>
          <div className="mb-4">
            <input
              type="text"
              value={codigoFamilia}
              onChange={(e) => setCodigoFamilia(e.target.value)}
              className="w-full px-4 py-2 bg-[#6aa3af] text-white  poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa el código de la familia"
            />
          </div>
          <div className="w-30 mx-auto mb-4">
            <button
              type="submit"
              disabled={isLoadingUnirse}
              className={`w-full bg-[#69ad6b] text-md poppins-bold text-white py-2 px-4 rounded-2xl hover:bg-[#448546] transition cursor-pointer ${
                isLoadingUnirse ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoadingUnirse ? "Uniéndose..." : "Unirse"}
            </button>
          </div>
        </form>

        <div className="w-30 mx-auto mb-4 sm:mb-0">
          <Link to={"/"}>
            <button
              type="submit"
              className="w-full bg-[#f5f4f2] text-md poppins-bold text-[#257788] py-2 px-4 rounded-2xl hover:bg-[#d6dcdd] transition cursor-pointer"
            >
              Volver
            </button>
          </Link>
        </div>

        {/* Guirnalda */}
        <div className="-z-40 w-25 h-25 sm:w-35 sm:h-35 bg-[url('/guirnalda.png')] bg-cover bg-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>

        {/* Flor izquierda */}
        <div className="-z-40 w-25 h-25 sm:w-40 sm:h-40 bg-[url('/flor_navidad.png')] bg-cover bg-center absolute -top-10 sm:-top-15 -left-10 sm:-left-20"></div>

        {/* Flor derecha reflejada */}
        <div className="-z-40 w-25 h-25 sm:w-40 sm:h-40 bg-[url('/flor_navidad.png')] bg-cover bg-center absolute -top-10 sm:-top-15 -right-10 sm:-right-20 -scale-x-100"></div>
      </div>
    </div>
  );
}
