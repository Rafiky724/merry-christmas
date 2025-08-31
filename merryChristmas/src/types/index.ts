export interface Usuario {
    id_usuario: number;
    nombre: string;
    correo: string;
    id_familia?: number | null;
}


export type EstadoDeseo = 'pendiente' | 'comprado';


export interface Deseo {
    id_deseo: number;
    nombre: string;
    precio?: number | null;
    link?: string | null;
    descripcion?: string | null;
    estado: EstadoDeseo;
    id_usuario: number;
    id_familia: number;
}


export interface Familia {
    id_familia: number;
    codigo: string;
    nombre: string;
    creado_por: number;
}


export interface AuthResponse {
    access_token: string;
    token_type: 'bearer';
    user: Usuario;
}