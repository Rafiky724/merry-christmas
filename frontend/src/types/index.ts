export type Usuario = {
    id_usuario: number;
    nombre: string;
    correo: string;
    id_familia?: number; // opcional si tu backend lo permite nulo
}

export type UsuarioCreate = {
    nombre: string;
    correo: string;
    contrasena: string;
    id_familia?: number; // opcional si tu backend lo permite nulo
}

export type LoginData = {
    correo: string;
    contrasena: string;
}

export type Familia = {
    id_familia: number;
    codigo: string;
    nombre: string;
    fecha_creacion: string; // viene como ISO string del backend
    creado_por: number;
}

export type EstadoDeseo = "pendiente" | "comprado";

export type Deseo = {
    id_deseo: number;
    nombre: string;
    precio: number; // Puede ser null/undefined si no se define
    link: string;
    descripcion: string;
    id_usuario: number;
    id_familia: number;
    estado: EstadoDeseo;
    fecha_creacion: string; // viene como ISO string desde el backend

    usuario: Usuario;
}

export type DeseoCreate = {
    nombre: string;
    precio: number; // Puede ser null/undefined si no se define
    link: string;
    descripcion: string;
    estado: EstadoDeseo;
}