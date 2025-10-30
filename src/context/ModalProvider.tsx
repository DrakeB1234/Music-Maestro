import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./ModalProvider.module.css";

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  const isOpen = modalContent !== null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}

      {createPortal(
        <div
          className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
          onClick={closeModal}
        >
          <div
            className={`${styles.modal} ${isOpen ? styles.open : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent}
          </div>
        </div>,
        document.body
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}