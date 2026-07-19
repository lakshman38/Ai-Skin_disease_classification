import { useLocation, useNavigate } from "react-router-dom";
import "./ConsultAction.css";

export default function Chat() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="action-bg">
      <div className="action-card">
        <h2>{state?.name}</h2>
        <p>Chat Consultation</p>

        <button className="primary">💬 Start Chat</button>
        <button className="secondary" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}
