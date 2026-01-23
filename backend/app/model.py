from __future__ import annotations

import threading
from dataclasses import dataclass

import numpy as np
from keras.models import load_model
from PIL import Image


@dataclass(frozen=True)
class Prediction:
    scores: list[float]
    top_index: int


_model = None
_lock = threading.Lock()


def get_model(model_path: str):
    global _model
    if _model is not None:
        return _model
    with _lock:
        if _model is None:
            _model = load_model(model_path, compile=False)
    return _model


def preprocess_image(image: Image.Image, input_size: int) -> np.ndarray:
    # Mirror frontend: resize to input_size, normalize to [0,1], add batch dim.
    img = image.convert("RGB").resize((input_size, input_size))
    arr = np.asarray(img).astype("float32") / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr


def predict(image: Image.Image, model_path: str, input_size: int) -> Prediction:
    model = get_model(model_path)
    x = preprocess_image(image, input_size)
    y = model.predict(x, verbose=0)
    # y may be (1, N) or a list of arrays
    if isinstance(y, (list, tuple)):
        y = y[0]
    y = np.asarray(y).reshape(-1)
    scores = [float(v) for v in y.tolist()]
    top_index = int(np.argmax(y))
    return Prediction(scores=scores, top_index=top_index)


