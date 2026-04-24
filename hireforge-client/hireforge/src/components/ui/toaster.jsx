import { useEffect, useState } from "react";
import { subscribe } from "./use-toast";

export function Toaster() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    subscribe(setToast);
  }, []);

  if (!toast) return null;

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      background: "#333",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px"
    }}>
      <strong>{toast.title}</strong>
      <div>{toast.description}</div>
    </div>
  );
}