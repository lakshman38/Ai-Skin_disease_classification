import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔹 Save full name
      await updateProfile(userCred.user, {
        displayName: name,
      });

      // 🔹 Send verification email
      await sendEmailVerification(userCred.user);

      setSuccess(
        "Verification email sent! Please check your inbox before login."
      );

      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />

        <button onClick={handleRegister}>Register</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p className="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
