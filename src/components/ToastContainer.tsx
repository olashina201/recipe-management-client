import React, { useEffect } from "react";
import { Toast } from "@/components/Toast";  // Your Toast component
import { ToastInstance } from "@/lib/types";

const ToastContainer = ({ toasts, removeToast }: { toasts: ToastInstance[], removeToast: (id: string) => void }) => {
  useEffect(() => {
    const container = document.getElementById("toast-container");
    if (!container) return;

    // Render the toasts
    return () => {
      container.innerHTML = ''; // Clear the container when toasts change
    };
  }, [toasts]);

  return (
    <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}  // Close the toast when user clicks the button
        />
      ))}
    </div>
  );
};

export default ToastContainer;
