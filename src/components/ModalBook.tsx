// src/components/ModalBook.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './ModalBook.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBook: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBook;
