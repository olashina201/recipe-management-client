import { useState, useCallback } from "react";

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const openModal = useCallback((confirmHandler: () => void) => {
    setOnConfirm(() => confirmHandler);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setOnConfirm(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm();
    closeModal();
  }, [onConfirm, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    handleConfirm,
  };
};
