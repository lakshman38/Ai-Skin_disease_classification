import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./NearbyHistory.css";

export default function NearbyHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "nearby_history"),
      where("uid", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setItems(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="nearby-history-bg">
      <h1 className="nearby-history-title">Nearby Visits History</h1>

      {items.length === 0 && (
        <p className="empty">No nearby searches yet</p>
      )}

      <div className="nearby-history-list">
        {items.map((item) => (
          <div className="nearby-row" key={item.id}>
            <div className="left">
              <h3>{item.type}</h3>
              <p>Search: {item.query}</p>
              {item.createdAt && (
                <small>
                  {item.createdAt.toDate().toLocaleString()}
                </small>
              )}
            </div>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/@${item.latitude},${item.longitude},14z`,
                  "_blank"
                )
              }
            >
              View Map
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
