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
  const [usuarioFiltrado, setUsuarioFiltrado] = useState<number | null>(null);

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

  // Función para eliminar un deseo
  const eliminarDeseoDeLista = (id_deseo: number) => {
    setDeseosFamilia((prevDeseos) =>
      prevDeseos.filter((deseo) => deseo.id_deseo !== id_deseo)
    );
  };

  const deseosFiltrados = usuarioFiltrado
    ? deseosFamilia.filter(
        (deseo) => deseo.usuario?.id_usuario === usuarioFiltrado
      )
    : deseosFamilia;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav onNuevoDeseo={agregarDeseo} />

        <main className="flex-grow p-5 bg-[url('/patron_navidad.png')] bg-[length:250px_250px] bg-repeat">
          <div className="mb-4 poppins-regular">
            <select
              id="filtroUsuario"
              className="p-2 bg-[#a8ced2] rounded-lg"
              onChange={(event) =>
                setUsuarioFiltrado(
                  event.target.value ? parseInt(event.target.value) : null
                )
              }
            >
              <option value="" className="poppins-regular">Ver Todos</option>
              {deseosFamilia
                .map((deseo) => deseo.usuario)
                .filter(
                  (usuario, index, self) =>
                    index ===
                    self.findIndex((u) => u?.id_usuario === usuario?.id_usuario)
                )
                .map((usuario) => (
                  <option key={usuario?.id_usuario} value={usuario?.id_usuario}>
                    {usuario?.nombre}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center">
            {deseosFiltrados.map((deseo) => {
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
