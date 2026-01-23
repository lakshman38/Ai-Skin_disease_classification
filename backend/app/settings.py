from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    model_path: str
    input_size: int
    labels: list[str]
    cors_origins: list[str]


def get_settings() -> Settings:
    # Keep labels aligned with the frontend `src/ml/model.js`
    labels = [
        "Benign",
        "Malignant",
        "Eczema",
        "Psoriasis",
        "Fungal Infection",
    ]

    model_path = os.getenv("MODEL_PATH", r"..\skin_app\skin_disease_model.h5")
    input_size = int(os.getenv("INPUT_SIZE", "224"))

    # Vite dev server default
    cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    cors_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]

    return Settings(
        model_path=model_path,
        input_size=input_size,
        labels=labels,
        cors_origins=cors_origins,
    )


