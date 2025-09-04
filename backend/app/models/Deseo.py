import enum
from sqlalchemy import Column, Date, Enum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.orm import relationship

class EstadoDeseo(str, enum.Enum):
    pendiente = "pendiente"
    comprado = "comprado"

class Deseo(Base):
    __tablename__='deseos'
    
    id_deseo = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    nombre = Column(String(100), nullable=False)
    precio = Column(Float)
    link = Column(Text)
    descripcion = Column(Text)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    id_familia = Column(Integer, ForeignKey("familias.id_familia"), nullable=False)
    estado = Column(Enum(EstadoDeseo), default=EstadoDeseo.pendiente)
    fecha_creacion = Column(Date, server_default=func.now())
    
    # Relaciones
    usuario = relationship("Usuario", back_populates="deseos")
    familia = relationship("Familia", back_populates="deseos")