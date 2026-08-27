import { useEffect, useState } from "react";
import { subscribe } from "./use-toast";

export function Toaster() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // subscribe returns an unsubscribe fn — call it on unmount to prevent listener leak
    const unsubscribe = subscribe(setToast);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!toast) return;
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const isError = toast.variant === "destructive";

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        minWidth: 260,
        background: isError ? "#dc2626" : "#16a34a",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <strong style={{ display: "block", marginBottom: 2 }}>
        {toast.title}
      </strong>
      {toast.description && (
        <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
          {toast.description}
        </div>
      )}
    </div>
  );
}
