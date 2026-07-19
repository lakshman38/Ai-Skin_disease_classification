import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCred.user.emailVerified) {
        setError("Please verify your email before login.");
        return;
      }

      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>

        {error && <p className="error">{error}</p>}

        <p className="link" onClick={() => navigate("/register")}>
          Don’t have an account? Register
        </p>
      </div>
    </div>
  );
}
