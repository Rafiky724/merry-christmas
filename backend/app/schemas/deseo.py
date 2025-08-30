from pydantic import BaseModel
from typing import Optional
from enum import Enum

class EstadoDeseo(str, Enum):
    pendiente = "pendiente"
    comprado = "comprado"

class DeseoBase(BaseModel):
    nombre: str
    precio: Optional[float] = None
    link: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[EstadoDeseo] = EstadoDeseo.pendiente

class DeseoCreate(DeseoBase):
    id_usuario: int
    id_familia: int

class DeseoOut(DeseoBase):
    id_deseo: int
    id_usuario: int
    id_familia: int

    class Config:
        from_attributes = True
