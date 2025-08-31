from pydantic import BaseModel
from typing import Optional

class FamiliaBase(BaseModel):
    nombre: str

class FamiliaCreate(FamiliaBase):
    pass

class FamiliaOut(FamiliaBase):
    id_familia: int
    codigo: str
    creado_por: Optional[int]

    class Config:
        from_attributes = True
