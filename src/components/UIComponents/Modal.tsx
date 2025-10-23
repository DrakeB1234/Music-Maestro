import { useModal } from "@/context/ModalProvider";
import { CloseIcon } from "../Icons/Icons";
import Button from "./Button";
import Card from "./Card";
import styles from './Modal.module.css';

interface Props {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  headerText?: string;
}

export default function Modal({
  children,
  headerText,
  icon,
}: Props) {

  const { closeModal } = useModal();

  return (
    <Card padding="none">
      <div className={styles.headerContainer}>
        {icon}
        <h1 className="truncate-overflow-text">{headerText}</h1>
        <Button onClick={closeModal} icon={<CloseIcon color="var(--color-text-light)" />} variant="text-secondary" />
      </div>
      {children}
    </Card>
  )
}
