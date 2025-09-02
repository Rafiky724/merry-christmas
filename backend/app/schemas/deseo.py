from datetime import date
from pydantic import BaseModel
from typing import Optional
from enum import Enum

from app.schemas.usuario import UsuarioOut

class EstadoDeseo(str, Enum):
    pendiente = "pendiente"
    comprado = "comprado"

class DeseoBase(BaseModel):
    nombre: str
    precio: Optional[float] = None
    link: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[EstadoDeseo] = EstadoDeseo.pendiente
    fecha_creacion: Optional[date ] = None

class DeseoCreate(DeseoBase):
    pass
    
class DeseoOut(DeseoBase):
    id_deseo: int
    id_usuario: int
    id_familia: int
    usuario: UsuarioOut
    
    class Config:
        from_attributes = True