import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./History.css";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "history"),
      where("uid", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="history-bg">
      <h1 className="history-title">Scan History</h1>

      {history.length === 0 && (
        <p className="empty">No scans yet</p>
      )}

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-row">
            
            {/* LEFT TEXT */}
            <div className="history-info">
              <h3>{item.disease}</h3>
              <p>Confidence: {item.confidence?.toFixed(2)}%</p>
              {item.createdAt && (
                <small>
                  {item.createdAt.toDate().toLocaleString()}
                </small>
              )}
            </div>

            {/* RIGHT IMAGE */}
            {item.image && (
              <img
                src={item.image}
                alt="scan"
                className="history-img"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
