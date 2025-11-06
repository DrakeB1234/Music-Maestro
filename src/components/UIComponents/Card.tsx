import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  marginTop?: string;
}

export default function Card({
  children,
  onClick,
  marginTop,
  ...props
}: Props) {
  return (
    <div
      className={`${styles.cardWrapper} ${onClick ? styles.Clickable : ''}`}
      onClick={onClick}
      style={{ marginTop: marginTop }}
      {...props}>
      {children}
    </div>
  )
}
