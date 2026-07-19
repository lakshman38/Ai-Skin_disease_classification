import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// App pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import History from "./pages/History";
import Consult from "./pages/Consult";
import Nearby from "./pages/Nearby";
import Recommend from "./pages/Recommend";
import Profile from "./pages/Profile";

// Doctor actions
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 AUTH ROUTES */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/scan"
          element={user ? <Scan /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <History /> : <Navigate to="/login" />}
        />
        <Route
          path="/consult"
          element={user ? <Consult /> : <Navigate to="/login" />}
        />
        <Route
          path="/nearby"
          element={user ? <Nearby /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommend"
          element={user ? <Recommend /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        {/* 👨‍⚕️ DOCTOR ACTION PAGES */}
        <Route
          path="/audio"
          element={user ? <Audio /> : <Navigate to="/login" />}
        />
        <Route
          path="/video"
          element={user ? <Video /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/login" />}
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
