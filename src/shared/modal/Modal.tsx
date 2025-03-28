import React, { ReactNode, useEffect } from 'react';
import ReactPortal from './ReactPortal';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Close the model if the esc key is enter
    const CLoseOnEsckey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.addEventListener('keydown', CLoseOnEsckey);
    return (): void => {
      document.body.removeEventListener('keydown', CLoseOnEsckey);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 w-full h-screen bg-neutral-900/20 backdrop-blur-xs flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'tween',
              stiffness: 100,
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <div className="flex justify-center items-center h-full p-5 z-auto w-full container">
              <button
                type="button"
                className="bg-red-500 text-white border border-transparent font-medium rounded cursor-pointer text-sm w-fit px-3 py-2 ml-auto inline-flex justify-end items-center transition-all duration-300 ease-in-out absolute z-50  top-5 right-10 "
                onClick={onClose}
              >
                Close
              </button>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactPortal>
  );
};

export default Modal;
