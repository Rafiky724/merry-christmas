import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/auth";
// import { Link } from "react-router-dom";
import { miFamilia } from "../services/familiaService";

export default function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await loginUsuario(correo, contrasena);
      localStorage.setItem("access_token", access_token);

      const { tieneFamilia } = await miFamilia();

      if (tieneFamilia) {
        navigate("/familia");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Correo o contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg_merry.png')] bg-cover bg-center relative">
      {/* Sombra encima del fondo */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Card centrada */}
      <div className="w-80 sm:w-full z-10 bg-[#a8ced2] border-2 border-[#6aa3af] p-0 sm:p-8 rounded-lg shadow-lg max-w-md relative">
        <h1 className="text-2xl poppins-bold text-white mt-12 text-center">
          Iniciar sesión
        </h1>
        {/* Aquí puedes colocar el formulario */}
        <form className="p-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm poppins-bold text-white mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 bg-[#6aa3af] text-white  poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div>
            <label className="block text-sm poppins-bold text-white mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full px-4 py-2 bg-[#6aa3af] text-white poppins-regular placeholder:text-white rounded-md focus:outline-none focus:ring focus:border-[#257788] text-sm"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {/* <div className="mb-6">
            <small className="text-white poppins-regulas">
              ¿No tienes cuenta?
            </small>{" "}
            <Link
              to={"/register"}
              className="poppins-bold text-[#e64563] text-xs hover:underline"
            >
              Registrarse
            </Link>
          </div> */}
          <div className="w-30 mx-auto mt-6">
            <button
              type="submit"
              className="w-full bg-[#b8173e] text-md poppins-bold text-white py-2 px-4 rounded-2xl hover:bg-[#940e30] transition cursor-pointer"
            >
              Ingresar
            </button>
          </div>
        </form>

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
