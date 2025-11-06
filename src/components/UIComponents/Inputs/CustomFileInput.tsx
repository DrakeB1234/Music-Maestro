import styles from './Input.module.css';

interface FileInputProps {
  accept?: string;
  onFileSelect: (file: File) => void;
}

export default function FileInput({ accept, onFileSelect }: FileInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return <input
    type="file"
    accept={accept}
    onChange={handleChange}
    className={styles.CustomFileInput}
  />;
}
