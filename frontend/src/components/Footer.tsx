export default function Footer() {
  return (
    <footer className="bg-[#b8173e] py-4 px-6 text-white text-center text-sm flex flex-col md:flex-row md:justify-between items-center">
      {/* Autor */}
      <p className="poppins-bold">
        Hecho por{" "}
        <a href="#" className="text-[#bc94f8] hover:underline transition">
          Rafiky724
        </a>
      </p>

      {/* Derechos de autor */}
      <p className="poppins-regular mb-2 md:mb-0">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </p>
    </footer>
  );
}
