from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Usuario(Base):
    __tablename__='usuarios'
    
    id_usuario = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100), nullable=False, unique=True)
    contrasena = Column(Text, nullable=False)
    # id_familia = Column(Integer, ForeignKey("Familias.id"))
    fecha_registro = Column(TIMESTAMP, server_default=func.now())