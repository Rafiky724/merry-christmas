export default function Footer() {
  return (
    <div className="bg-[#b8173e] p-4 flex flex-col gap-5 md:flex-row md:justify-between items-center">
      {/* Nombre */}
      <div>
        <p className="text-white poppins-bold">
          Familia Jhon Angel Fuentes{" "}
          <span className="bg-[#a8ced2] p-1 ml-1 rounded-lg text-[#b8173e] poppins-regular">
            Código 72154
          </span>
        </p>
      </div>
    </div>
  );
}
