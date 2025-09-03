# app/openapi_config.py

from fastapi.openapi.utils import get_openapi
from fastapi import FastAPI

def custom_openapi(app: FastAPI):
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Merry Christmas API",
        version="1.0.0",
        description="Documentación de la API para el proyecto Merry Christmas",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }

    rutas_publicas = ["/api/auth/register", "/api/auth/login"]

    for path, methods in openapi_schema["paths"].items():
        for method in methods:
            if path not in rutas_publicas:
                methods[method]["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema
