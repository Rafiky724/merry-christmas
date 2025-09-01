from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.openapi_config import custom_openapi
from app.routes import router as api_router

app = FastAPI()

app.openapi = lambda: custom_openapi(app)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL de tu frontend (Vite por defecto)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],  # Permitir todos los headers
)

app.include_router(api_router)