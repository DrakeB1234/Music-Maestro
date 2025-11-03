import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Card({
  children,
  onClick,
  ...props
}: Props) {
  return (
    <div className={`${styles.cardWrapper} ${onClick ? styles.clickable : ''}`} onClick={onClick} {...props}>
      {children}
    </div>
  )
}
