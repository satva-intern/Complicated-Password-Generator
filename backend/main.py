from fastapi import FastAPI
from api.routes import passwords

app = FastAPI()

app.include_router(passwords.router, prefix="/api")
