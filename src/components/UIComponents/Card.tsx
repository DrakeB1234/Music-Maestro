import styles from './Card.module.css';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Card({
  children,
  onClick
}: Props) {
  return (
    <div className={`${styles.cardWrapper} ${onClick ? styles.clickable : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}
