import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="py-2 px-4 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
