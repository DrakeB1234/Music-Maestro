import React from 'react';
import styles from './UIComponents.module.css';

export default function IconWrapper({ icon }: { icon: React.ReactNode }) {
  return (
    <div className={styles.IconWrapper}>
      {icon}
    </div>
  )
}
