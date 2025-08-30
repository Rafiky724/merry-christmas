from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.orm import relationship

class Usuario(Base):
    __tablename__='usuarios'
    
    id_usuario = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100), nullable=False, unique=True)
    contrasena = Column(Text, nullable=False)
    id_familia = Column(Integer, ForeignKey("familias.id_familia"))
    fecha_registro = Column(TIMESTAMP, server_default=func.now())
    
    # Relaciones
    familia = relationship("Familia", back_populates="usuarios", foreign_keys=[id_familia])
    deseos = relationship("Deseo", back_populates="usuario")
    familias_creadas = relationship("Familia", back_populates="creador")
