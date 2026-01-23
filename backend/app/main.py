from __future__ import annotations

import io
from typing import Any

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

from .model import predict
from .settings import get_settings


settings = get_settings()

app = FastAPI(title="SkinAI Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "model_path": settings.model_path,
        "input_size": settings.input_size,
        "num_labels": len(settings.labels),
    }


@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)) -> dict[str, Any]:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload an image file.")

    raw = await file.read()
    if not raw:
        raise HTTPException(status_code=400, detail="Empty file.")

    try:
        img = Image.open(io.BytesIO(raw))
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Invalid image.")

    try:
        pred = predict(img, model_path=settings.model_path, input_size=settings.input_size)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model prediction failed: {e}")

    probs = []
    for i, score in enumerate(pred.scores):
        label = settings.labels[i] if i < len(settings.labels) else f"class_{i}"
        probs.append({"index": i, "label": label, "score": score})
    probs.sort(key=lambda x: x["score"], reverse=True)

    top = probs[0] if probs else None
    return {
        "top": top,
        "probs": probs,
    }


