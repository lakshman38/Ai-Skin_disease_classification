import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <img
          src="https://ui-avatars.com/api/?name=SkinAI+User&background=0D8ABC&color=fff"
          alt="profile"
          className="profile-img"
        />

        <h2>{user?.displayName || "SkinAI User"}</h2>
        <p className="email">{user?.email}</p>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
