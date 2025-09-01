export interface UsuarioCreate {
  nombre: string;
  correo: string;
  contrasena: string;
  id_familia?: number; // opcional si tu backend lo permite nulo
}

export interface LoginData {
  correo: string;
  contrasena: string;
}
