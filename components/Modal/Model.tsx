import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "../ui/button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-1 py-2 h-[90vh] absolute bottom-0 rounded-lg shadow-lg w-[90vw]">
        <button
          onClick={onClose}
          className="absolute z-50 top-2 right-2 text-xs px-2 py-1 rounded-md text-white bg-red-500 hover:bg-red-700"
        >
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
