import { useAuthStore } from "../../../store/auth";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="container py-10">
      <div className="card">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Hola, {user?.nombre ?? "usuario"} 👋
          </h1>
          <small className="text-gray-500">{user?.correo}</small>
        </div>
        <p className="mt-4 text-gray-600">
          Aquí irá el panel con tu familia y deseos.
        </p>
      </div>
    </div>
  );
}
