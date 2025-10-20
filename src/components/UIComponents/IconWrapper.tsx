import React from 'react';
import styles from './IconWrapper.module.css';

export default function IconWrapper({ icon }: { icon: React.ReactNode }) {
  return (
    <div className={styles.iconWrapper}>
      {icon}
    </div>
  )
}
