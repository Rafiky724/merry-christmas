import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="font-bold text-lg">
            🎁 WishApp
          </Link>
          {user && (
            <>
              <Link to="/familia" className="hover:underline">
                Familia
              </Link>
              <Link to="/deseos" className="hover:underline">
                Deseos
              </Link>
            </>
          )}
        </div>

        <div>
          {user ? (
            <div className="flex gap-3 items-center">
              <span className="text-sm">👤 {user.nombre}</span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Salir
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Iniciar sesión
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Contenido dinámico */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
