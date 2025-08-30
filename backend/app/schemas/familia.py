from pydantic import BaseModel
from typing import Optional

class FamiliaBase(BaseModel):
    codigo: str
    nombre: str

class FamiliaCreate(FamiliaBase):
    creado_por: Optional[int] = None

class FamiliaOut(FamiliaBase):
    id_familia: int
    creado_por: Optional[int]

    class Config:
        from_attributes = True
