import type { HTMLAttributes } from 'react';
import styles from './UIComponents.module.css';

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
      className={`${styles.CardWrapper} ${onClick ? styles.CardClickable : ''}`}
      onClick={onClick}
      style={{ marginTop: marginTop }}
      {...props}>
      {children}
    </div>
  )
}
