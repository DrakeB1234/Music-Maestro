import { useModal } from "@/context/ModalProvider";
import { CloseIcon } from "@components/Icons/Icons";
import Button from "./Button";
import Card from "./Card";
import styles from './Modal.module.css';

interface Props {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  headerText?: string;
  overrideExitButtonPressed?: () => void;
}

export default function Modal({
  children,
  headerText,
  icon,
  overrideExitButtonPressed,
}: Props) {

  const { closeModal } = useModal();

  function handleExitButtonPressed() {
    if (overrideExitButtonPressed) {
      overrideExitButtonPressed();
      return;
    };
    closeModal();
  };

  return (
    <Card>
      <div className={styles.headerContainer}>
        {icon}
        <h1 className="truncate-overflow-text">{headerText}</h1>
        <Button onClick={handleExitButtonPressed} icon={<CloseIcon color="var(--color-text-body-2)" />} variant="text-secondary" />
      </div>
      {children}
    </Card>
  )
}
