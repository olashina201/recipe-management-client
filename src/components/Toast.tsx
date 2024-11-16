import React, { useEffect } from "react";
import { X } from "lucide-react";
import { ToastType } from "@/lib/types";

interface ToastComponentProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;  // Optional duration for the toast to auto-close
}

export const Toast: React.FC<ToastComponentProps> = ({
  message,
  type,
  onClose,
  duration = 3000,  // Default to 3000ms if not provided
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-teal-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the toast after the duration
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [duration, onClose]);

  return (
    <div
      className={`max-w-xs ${getBackgroundColor()} text-sm text-white rounded-xl shadow-lg`}
      role="alert"
      tabIndex={-1}
    >
      <div className="flex p-4">
        <span className="flex-grow">{message}</span> {/* Ensure message is properly spaced */}
        <div className="ms-auto">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
