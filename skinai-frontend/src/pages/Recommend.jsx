import { useLocation, useNavigate } from "react-router-dom";
import "./Recommend.css";

const doctors = [
  {
    name: "Dr. Ananya Rao",
    role: "Dermatologist",
    diseases: ["acne", "eczema", "dermato_fibroma", "ringworm"],
    img: "https://i.imgur.com/4ZQZ4Zy.jpg",
  },
  {
    name: "Dr. Rahul Mehta",
    role: "Skin Specialist",
    diseases: ["melanoma", "nevus", "basal_cell_carcinoma"],
    img: "https://i.imgur.com/8RKXAIV.jpg",
  },
];

export default function Recommend() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p className="empty">No scan data found</p>;
  }

  const { disease, confidence } = state;

  const filtered = doctors.filter((d) =>
    d.diseases.includes(disease)
  );

  return (
    <div className="rec-bg">
      <h1 className="rec-title">Doctor Recommendation</h1>

      <p className="rec-info">
        Detected: <b>{disease}</b> ({confidence.toFixed(2)}%)
      </p>

      <div className="rec-grid">
        {filtered.length === 0 && (
          <p>No specific doctor found. Please consult general dermatologist.</p>
        )}

        {filtered.map((doc) => (
          <div key={doc.name} className="rec-card">
            <img src={doc.img} alt="doctor" />
            <h3>{doc.name}</h3>
            <p>{doc.role}</p>

            <button onClick={() => navigate("/consult")}>
              Consult →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
