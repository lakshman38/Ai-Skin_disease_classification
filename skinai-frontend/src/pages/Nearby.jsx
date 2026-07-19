import "./Nearby.css";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Nearby() {
  const navigate = useNavigate();

  // 🔥 OPEN GOOGLE MAPS + SAVE HISTORY
  const openMaps = async (query, label) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // ✅ SAVE TO FIRESTORE
        if (auth.currentUser) {
          await addDoc(collection(db, "nearby_history"), {
            uid: auth.currentUser.uid,
            type: label,
            query,
            latitude: lat,
            longitude: lng,
            createdAt: serverTimestamp(),
          });
        }

        // ✅ OPEN GOOGLE MAPS (NO POPUP BLOCK)
        const url = `https://www.google.com/maps/search/${encodeURIComponent(
          query
        )}/@${lat},${lng},15z`;

        window.location.href = url;
      },
      () => {
        alert("Please allow location access");
      }
    );
  };

  const places = [
    {
      name: "Nearby Skin Clinics",
      query: "dermatology clinic",
      label: "Skin Clinic",
    },
    {
      name: "Nearby Hospitals",
      query: "hospital",
      label: "Hospital",
    },
    {
      name: "Skin Specialist Doctors",
      query: "skin specialist doctor",
      label: "Doctor",
    },
  ];

  return (
    <div className="nearby-bg">
      <h1 className="nearby-title">Nearby Medical Services</h1>

      <div className="nearby-grid">
        {places.map((p, i) => (
          <div className="nearby-card" key={i}>
            <div className="card-glow"></div>

            <h3>{p.name}</h3>
            <p className="type">{p.label}</p>

            <div className="bottom-row">
              <span className="distance">📍 Live Location</span>

              <button onClick={() => openMaps(p.query, p.label)}>
                Open Map
              </button>

              <button onClick={() => navigate("/nearby-history")}>
                View History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
