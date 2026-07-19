import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Scan.css";

// 🔥 Firebase
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Scan() {
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📂 OPEN FILE PICKER
  const openPicker = () => {
    fileRef.current.click();
  };

  // 🖼 IMAGE SELECT
  const onSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  // 🔍 ANALYZE IMAGE
  const analyze = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);

      // 🔥 SAVE HISTORY WITH IMAGE
      const reader = new FileReader();
      reader.onloadend = async () => {
       await addDoc(collection(db, "history"), {
      uid: auth.currentUser.uid,
      disease: data.disease,
      confidence: data.confidence,
      image: reader.result,
      createdAt: serverTimestamp(),

  // ⏳ AUTO DELETE AFTER 30 DAYS
  expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
});

      };
      reader.readAsDataURL(file);

    } catch (err) {
      alert("Backend error. Make sure Flask is running.");
    }

    setLoading(false);
  };

  // 🔄 RESET
  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    fileRef.current.value = "";
  };

  return (
    <div className="scan-bg">
      <div className="scan-glow"></div>

      <h1 className="scan-title">Skin Scan</h1>

      {/* 🔵 SCAN BUTTON ALWAYS VISIBLE */}
      <div className="scan-circle" onClick={openPicker}>
        SCAN
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onSelect}
      />

      {/* 🖼 IMAGE PREVIEW */}
      {preview && (
        <div className="preview-box">
          <img src={preview} alt="preview" />
        </div>
      )}

      {/* 🔘 ANALYZE + RESET */}
      {preview && (
        <div className="btn-row">
          <button onClick={analyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button className="reset" onClick={reset}>
            Reset
          </button>
        </div>
      )}

      {/* 📊 RESULT + MANUAL NAVIGATION */}
      {result && (
        <div className="result-card">
          <h3>{result.disease}</h3>
          <p>{result.confidence.toFixed(2)}%</p>

          <button
            className="consult-btn"
            onClick={() =>
              navigate("/recommend", {
                state: {
                  disease: result.disease,
                  confidence: result.confidence,
                },
              })
            }
          >
            Consult Doctor →
          </button>
        </div>
      )}
    </div>
  );
}
