import { useEffect, useState } from "react";
import DeseoCard from "../components/DeseoCard";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import type { Deseo, Usuario } from "../types";
import { getDeseosFamiliaConUsuarios } from "../services/deseoService";
import { getUsuarioActual } from "../services/auth";

export default function FamiliaPage() {
  const [deseosFamilia, setDeseosFamilia] = useState<Deseo[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario>();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [usuario, deseosFam] = await Promise.all([
          getUsuarioActual(),
          getDeseosFamiliaConUsuarios(),
        ]);

        setUsuarioActual(usuario);
        setDeseosFamilia(Array.isArray(deseosFam) ? deseosFam : []);
      } catch (err) {
        console.error("Error cargando datos de usuario o deseos:", err);
      }
    };

    fetchDatos();
  }, []);

  // Función para agregar un deseo
  const agregarDeseo = (nuevoDeseo: Deseo) => {
    setDeseosFamilia((prevDeseos) => [...prevDeseos, nuevoDeseo]);
  };

  // useEffect(() => {
  //   const fetchDeseos = async () => {
  //     const deseosData = await getDeseosFamiliaConUsuarios();
  //     setDeseosFamilia(deseosData);
  //   };
  //   fetchDeseos();
  // }, []);
  
  // Función para eliminar un deseo
  const eliminarDeseoDeLista = (id_deseo: number) => {
    setDeseosFamilia((prevDeseos) =>
      prevDeseos.filter((deseo) => deseo.id_deseo !== id_deseo)
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav onNuevoDeseo={agregarDeseo}/>

        <main className="flex-grow p-5 bg-[url('/patron_navidad.png')] bg-[length:250px_250px] bg-repeat">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
            {deseosFamilia.map((deseo) => {
              const esMio =
                (usuarioActual &&
                  deseo.usuario &&
                  deseo.usuario.id_usuario === usuarioActual.id_usuario) ??
                false;

              return (
                <DeseoCard
                  key={deseo.id_deseo}
                  deseo={deseo}
                  esMio={esMio}
                  eliminarDeseoDeLista={eliminarDeseoDeLista}
                />
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
