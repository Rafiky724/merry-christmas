from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, String
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.orm import relationship

class Familia(Base):
    __tablename__='familias'
    
    id_familia = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    codigo = Column(String(10), nullable=False, unique=True)
    nombre = Column(String(100), nullable=False, unique=True)
    creado_por = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha_creacion = Column(TIMESTAMP, server_default=func.now())
    
    # Relaciones
    usuarios = relationship("Usuario", back_populates="familia")
    deseos = relationship("Deseo", back_populates="familia")
    creador = relationship("Usuario", back_populates="familias_creadas")