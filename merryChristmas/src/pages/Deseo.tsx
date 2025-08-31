import { useEffect, useState } from "react";
import { listarDeseos, crearDeseo, eliminarDeseo, cambiarEstadoDeseo, type Deseo } from "@/services/deseo";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";

export default function DeseosPage() {
  const [deseos, setDeseos] = useState<Deseo[]>([]);
  const [nuevoDeseo, setNuevoDeseo] = useState("");
  const { user } = useAuthStore();

  const fetchDeseos = async () => {
    const data = await listarDeseos();
    setDeseos(data);
  };

  useEffect(() => {
    fetchDeseos();
  }, []);

  const handleCrear = async () => {
    if (!nuevoDeseo) return;
    await crearDeseo(nuevoDeseo);
    setNuevoDeseo("");
    fetchDeseos();
  };

  const handleEliminar = async (id: number) => {
    await eliminarDeseo(id);
    fetchDeseos();
  };

  const handleCambiarEstado = async (id: number) => {
    await cambiarEstadoDeseo(id);
    fetchDeseos();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Deseos</h1>

      {/* Crear deseo */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Escribe tu deseo"
          value={nuevoDeseo}
          onChange={(e) => setNuevoDeseo(e.target.value)}
        />
        <Button onClick={handleCrear}>Agregar</Button>
      </div>

      {/* Lista de deseos */}
      <ul className="space-y-3">
        {deseos.map((d) => (
          <li key={d.id_deseo} className="p-3 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{d.descripcion}</p>
              <small className="text-gray-500">
                {d.usuario.username} — {d.estado}
              </small>
            </div>

            <div className="flex gap-2">
              {/* Solo puedes eliminar tus propios deseos */}
              {d.usuario.id_usuario === user?.id_usuario && (
                <Button variant="destructive" onClick={() => handleEliminar(d.id_deseo)}>
                  Eliminar
                </Button>
              )}

              {/* Solo puedes cambiar estado de deseos de otros */}
              {d.usuario.id_usuario !== user?.id_usuario && d.estado === "pendiente" && (
                <Button onClick={() => handleCambiarEstado(d.id_deseo)}>
                  Marcar como Comprado
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
