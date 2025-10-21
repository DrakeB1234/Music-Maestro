import Button from "./Button";
import styles from './ButtonGroup.module.css';

export default function ButtonGroup() {
  return (
    <div className={styles.ButtonGroupWrapper}>
      <Button variant="text" text="Easy" />
      <Button variant="text" text="Medium" />
      <Button variant="text" text="Hard" />
    </div>
  )
}
