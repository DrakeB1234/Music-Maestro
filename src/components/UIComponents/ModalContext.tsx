import { createContext, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalContext.module.css";
import Button from "@/components/UIComponents/Button";

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent &&
        createPortal(
          <div className={styles.backdrop} onClick={closeModal}>
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.CloseButtonWrapper}>
                <div className={styles.CloseButtonContainer}>
                  <Button variant="text" onClick={closeModal}>Close</Button>
                </div>
              </div>
              {modalContent}
            </div>
          </div>,
          document.body // ensures modal is above everything
        )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
