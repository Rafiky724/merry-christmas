import { useState } from "react";

import { useFamiliaStore } from "../store/familia";
import { crearFamilia, salirFamilia, unirseFamilia } from "../services/familia";
import { Button } from "@/components/ui/button";

export default function FamiliaPage() {
  const { familia, setFamilia } = useFamiliaStore();
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleCrear = async () => {
    const f = await crearFamilia(nombre);
    setFamilia(f);
  };

  const handleUnirse = async () => {
    const f = await unirseFamilia(codigo);
    setFamilia(f);
  };

  const handleSalir = async () => {
    await salirFamilia();
    setFamilia(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestión de Familia</h1>

      {familia ? (
        <div className="space-y-4">
          <p>
            Perteneces a la familia <b>{familia.nombre}</b> (código:{" "}
            {familia.codigo})
          </p>
          <Button variant="destructive" onClick={handleSalir}>
            Salir de la familia
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Crear Familia</h2>
            <input
              className="border p-2 rounded w-full"
              placeholder="Nombre de la familia"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Button className="mt-2" onClick={handleCrear}>
              Crear
            </Button>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Unirse a Familia</h2>
            <input
              className="border p-2 rounded w-full"
              placeholder="Código de la familia"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <Button className="mt-2" onClick={handleUnirse}>
              Unirse
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
