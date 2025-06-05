from fastapi import FastAPI
from api.routes import passwords
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(passwords.router, prefix="/api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
