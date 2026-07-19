import { useNavigate } from "react-router-dom";
import "./Consult.css";

export default function Consult() {
  const navigate = useNavigate();

  return (
    <div className="consult-bg">
      <h1 className="consult-title">Doctor Consultation</h1>

      <div className="doctor-grid">

        {/* Doctor 1 */}
        <div className="doctor-card">
          <img
            src="https://i.imgur.com/4ZQZ4Zy.jpg"
            alt="doctor"
            className="doctor-img"
          />
          <h3>Dr. Ananya Rao</h3>
          <p>Dermatologist</p>

          <div className="action-row">
            <button
              onClick={() =>
                navigate("/audio", {
                  state: {
                    name: "Dr. Ananya Rao",
                    image: "https://i.imgur.com/4ZQZ4Zy.jpg",
                  },
                })
              }
            >
              🎧 Audio
            </button>

            <button
              onClick={() =>
                navigate("/video", {
                  state: {
                    name: "Dr. Ananya Rao",
                    image: "https://i.imgur.com/4ZQZ4Zy.jpg",
                  },
                })
              }
            >
              📹 Video
            </button>

            <button
              onClick={() =>
                navigate("/chat", {
                  state: {
                    name: "Dr. Ananya Rao",
                    image: "https://i.imgur.com/4ZQZ4Zy.jpg",
                  },
                })
              }
            >
              💬 Chat
            </button>
          </div>
        </div>

        {/* Doctor 2 */}
        <div className="doctor-card">
          <img
            src="https://i.imgur.com/8RKXAIV.jpg"
            alt="doctor"
            className="doctor-img"
          />
          <h3>Dr. Rahul Mehta</h3>
          <p>Skin Specialist</p>

          <div className="action-row">
            <button
              onClick={() =>
                navigate("/audio", {
                  state: {
                    name: "Dr. Rahul Mehta",
                    image: "https://i.imgur.com/8RKXAIV.jpg",
                  },
                })
              }
            >
              🎧 Audio
            </button>

            <button
              onClick={() =>
                navigate("/video", {
                  state: {
                    name: "Dr. Rahul Mehta",
                    image: "https://i.imgur.com/8RKXAIV.jpg",
                  },
                })
              }
            >
              📹 Video
            </button>

            <button
              onClick={() =>
                navigate("/chat", {
                  state: {
                    name: "Dr. Rahul Mehta",
                    image: "https://i.imgur.com/8RKXAIV.jpg",
                  },
                })
              }
            >
              💬 Chat
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
