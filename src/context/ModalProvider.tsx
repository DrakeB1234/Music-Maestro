import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import styles from "./ModalProvider.module.css";

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
  setPreventClose: (value: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const preventClose = useRef<boolean>(false);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
  }, []);

  const closeModal = useCallback(() => {
    setPreventClose(false);
    setModalContent(null);
  }, []);

  const handleBackDropPressed = useCallback(() => {
    if (preventClose.current) return;
    closeModal();
  }, [])

  const setPreventClose = useCallback((value: boolean) => {
    preventClose.current = value;
  }, []);

  const isOpen = modalContent !== null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, setPreventClose }}>
      {children}

      {createPortal(
        <div
          className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
          onClick={handleBackDropPressed}
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