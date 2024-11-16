import { useState, useCallback } from "react";
import { ToastInstance, ToastProps } from "@/lib/types";

export const useToast = () => {
  const [, setToasts] = useState<ToastInstance[]>([]);

  // Remove toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Show toast (with message, type, and duration)
  const showToast = useCallback(({ message, type = 'default', duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9); // Generate unique id for each toast

    const toastInstance: ToastInstance = {
      id,
      message,
      type,
      duration,
    };

    setToasts((prev) => [...prev, toastInstance]);  // Add toast to state

    // Automatically remove the toast after the duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id; // Return the ID in case needed for manual removal
  }, [removeToast]);

  // Return the method to show the toast and remove them
  return {
    showToast,
    removeToast,
    success: (message: string, duration?: number) => 
      showToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) => 
      showToast({ message, type: 'error', duration }),
    warning: (message: string, duration?: number) => 
      showToast({ message, type: 'warning', duration }),
    info: (message: string, duration?: number) => 
      showToast({ message, type: 'info', duration }),
  };
};
