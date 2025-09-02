import DeseoCard from "../components/DeseoCard";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

export default function FamiliaPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav />

        <main className="flex-grow p-5 bg-[url('/patron_navidad.png')] bg-[length:250px_250px] bg-repeat">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DeseoCard />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
