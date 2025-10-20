import styles from './Card.module.css';

interface Props {
  children?: React.ReactNode;
  padding?: "none" | "base"
  onClick?: () => void;
}

export default function Card({
  children,
  padding = "base",
  onClick
}: Props) {
  return (
    <div className={`${styles.cardWrapper} ${styles[`padding-${padding}`]} ${onClick ? styles.clickable : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}
