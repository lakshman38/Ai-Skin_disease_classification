from flask import Flask, request, jsonify
from flask_cors import CORS   # ✅ ADD THIS
import tensorflow as tf
import numpy as np
from PIL import Image


app = Flask(__name__)
CORS(app)   # ✅ ADD THIS

import os
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "skin_disease_model.h5")
model = tf.keras.models.load_model(model_path)

class_names = [
    'acne',
    'actinic_keratosis',
    'basal_cell_carcinoma',
    'chickenpox',
    'dermato_fibroma',
    'dyshidrotic_eczema',
    'melanoma',
    'nail_fungus',
    'nevus',
    'normal_skin',
    'pigmented_benign_keratosis',
    'ringworm',
    'seborrheic_keratosis',
    'squamous_cell_carcinoma',
    'vascular_lesion'
]
 # replace with your disease names

def preprocess(img):
    img = img.resize((256, 256))   # 🔥 FIXED HERE
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img


@app.route("/predict", methods=["POST"])
def predict():
    file = request.files['image']
    img = Image.open(file).convert("RGB")
    x = preprocess(img)
    preds = model.predict(x)[0]
    idx = np.argmax(preds)
    return jsonify({
        "disease": class_names[idx],
        "confidence": float(preds[idx]*100)
    })

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host="0.0.0.0", port=5000, debug=False)

