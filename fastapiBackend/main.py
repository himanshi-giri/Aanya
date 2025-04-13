from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.teach_routes import router as teach_router
from routers.analyze_routes import router as analyze_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ideally restrict this in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def home():
    return {"message": "Welcome to Aanya"}

# Routes
app.include_router(teach_router, prefix="/api/teach", tags=["Teach"])
app.include_router(analyze_router, prefix="/api", tags=["Analyze"])  # new route
