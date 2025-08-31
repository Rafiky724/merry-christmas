from sqlalchemy import TIMESTAMP, Column, Integer, String, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.orm import relationship

class Familia(Base):
    __tablename__='familias'
    
    id_familia = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    codigo = Column(String(10), nullable=False, unique=True)
    nombre = Column(String(100), nullable=False, unique=True)
    fecha_creacion = Column(TIMESTAMP, server_default=func.now())
    creado_por = Column(Integer, ForeignKey("familias.id_familia"), nullable=False)
    
    # Relaciones
    usuarios = relationship("Usuario", back_populates="familia")
    deseos = relationship("Deseo", back_populates="familia")