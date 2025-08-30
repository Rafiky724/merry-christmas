from pydantic import BaseModel
from typing import Optional, List

class UsuarioBase(BaseModel):
    nombre: str
    correo: str

class UsuarioCreate(UsuarioBase):
    contrasena: str
    id_familia: Optional[int] = None

class UsuarioOut(UsuarioBase):
    id_usuario: int
    id_familia: Optional[int]

    class Config:
        from_attributes = True  # antes orm_mode = True
