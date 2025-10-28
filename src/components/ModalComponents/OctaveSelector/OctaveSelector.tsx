import { ArrowDownIcon, ArrowUpIcon, MusicNoteIcon } from "@/components/Icons/Icons";
import Modal from "@/components/UIComponents/Modal";
import styles from './OctaveSelector.module.css';
import Button from "@/components/UIComponents/Button";
import { useModal } from "@/context/ModalProvider";
import { useEffect, useRef } from "react";
import GeneratedStave from "@/helpers/GeneratedStave";

export default function OctaveSelector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staveRef = useRef<GeneratedStave>(null);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!canvasRef.current) return;

    const newStaveObj = new GeneratedStave(canvasRef.current);
    if (!newStaveObj) return;
    staveRef.current = newStaveObj;

  }, []);

  function handleDraw() {
    if (!staveRef.current) return;
    staveRef.current.drawNote({ name: "C", accidental: null, octave: 4 }, "treble");
  }
  function handleClear() {
    if (!staveRef.current) return;
    staveRef.current.clearStave();
  }

  return (
    <Modal headerText="Octave Selector" icon={<MusicNoteIcon />}>
      <div className={styles.ModalContentContainer}>
        <div className={styles.ModalFlexContainer}>
          <OctaveButtons />
          <div className={styles.StaffContainer}>
            <canvas ref={canvasRef}></canvas>
          </div>
          <OctaveButtons />
        </div>
        <div className={styles.RangeContainer}>
          <p className="body-secondary">Range Selected</p>
          <div className={styles.SelectedRangeContainer}>
            <p className="heading truncate-overflow-text">C4 - G5</p>
          </div>
        </div>
      </div>

      <div className={styles.ModalFlexContainer}>
        <Button onClick={handleDraw} text="Draw" />
        <Button onClick={handleClear} text="Clear" />
      </div>

      <div className={styles.ModalActionButtonsContainer}>
        <Button onClick={closeModal} text="Cancel" variant="outlined" fullWidth={true} />
        <Button text="Select" variant="contained" fullWidth={true} />
      </div>
    </Modal>
  )
}

function OctaveButtons() {
  return (
    <div className={styles.OctaveButtonsContainer}>
      <Button icon={<ArrowUpIcon />} variant="outlined" />
      <Button icon={<ArrowDownIcon />} variant="outlined" />
    </div>
  );
};