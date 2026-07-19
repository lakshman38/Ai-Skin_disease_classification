import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home-bg">
      <div className="glow-bg"></div>

      <h1 className="title">🧠 SkinAI</h1>
      <p className="subtitle">AI-powered Skin Health Platform</p>

      <div className="big-grid">
        <div className="big-card" onClick={() => nav("/scan")}>
          📷 Scan Image
          <span>Upload & analyze skin condition</span>
        </div>

        <div className="big-card" onClick={() => nav("/history")}>
          📊 Scan History
          <span>View past scan results</span>
        </div>

        <div className="big-card" onClick={() => nav("/consult")}>
          👨‍⚕️ Doctor Consultation
          <span>Chat / Audio / Video call</span>
        </div>

        <div className="big-card" onClick={() => nav("/nearby")}>
          🏥 Nearby Hospitals
          <span>Find skin specialists nearby</span>
        </div>

        <div className="big-card" onClick={() => nav("/recommend")}>
          ⭐ Doctor Recommendation
          <span>AI suggested dermatologists</span>
        </div>

        <div className="big-card" onClick={() => nav("/profile")}>
          👤 Profile
          <span>Account & settings</span>
        </div>
      </div>
    </div>
  );
}
