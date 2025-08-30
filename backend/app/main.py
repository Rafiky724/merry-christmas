from fastapi import FastAPI
from app.core.openapi_config import custom_openapi
from app.routes import router as api_router

app = FastAPI()

app.openapi = lambda: custom_openapi(app)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"mensaje": "Merry Christmas API"}
