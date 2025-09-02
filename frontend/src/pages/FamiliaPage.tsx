import DeseoCard from "../components/DeseoCard";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useQuery } from "@tanstack/react-query";
import { getDeseosFamilia } from "../services/deseoService";
import type { Deseo } from "../types";

export default function FamiliaPage() {
  const { data: deseos, isLoading } = useQuery<Deseo[]>({
    queryKey: ["deseosFamilia"],
    queryFn: getDeseosFamilia,
  });

  if (isLoading) {
    return <p className="text-center">Cargando deseos...</p>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav />

        <main className="flex-grow p-5 bg-[url('/patron_navidad.png')] bg-[length:250px_250px] bg-repeat">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deseos?.map((deseo) => (
              <DeseoCard key={deseo.id_deseo} deseo={deseo} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
