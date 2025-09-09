import React from "react";

export default function ToastMessage({ toasts }) {
  return (
    <div className="toast-message">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
