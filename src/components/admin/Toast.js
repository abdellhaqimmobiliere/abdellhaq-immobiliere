"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext({
  showToast: () => {},
});

const STYLES = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-[#0D2340]",
};

const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

function ToastItem({ toast, onRemove }) {
  return (
    <div
      className={`${STYLES[toast.type]} text-white font-body text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in-up min-w-[240px]`}
      role="status"
    >
      <span aria-hidden="true">{ICONS[toast.type]}</span>
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="ml-auto opacity-70 hover:opacity-100"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
