# SkinAI Backend (FastAPI)

This backend serves a small HTTP API that loads the Keras model (`skin_disease_model.h5`) and runs inference on an uploaded image.

## Endpoints

- `GET /health` — health check
- `POST /predict` — multipart form upload with field name `file`

Response includes class probabilities and a `top` prediction.

## Setup (Windows PowerShell)

From the repo root (`C:\Users\anumu\Downloads\skin_app`):

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## Run

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
$env:MODEL_PATH="..\skin_app\skin_disease_model.h5"
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

## Test with curl

```powershell
curl -F "file=@C:\path\to\image.jpg" http://127.0.0.1:8000/predict
```


