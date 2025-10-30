import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './CustomDrills.module.css';
import Card from '@/components/UIComponents/Card';
import Input from '@/components/UIComponents/Inputs/Input';
import { useRef, useState, type ChangeEvent } from 'react';
import Button from '@/components/UIComponents/Button';
import SelectInput from '@/components/UIComponents/Inputs/SelectInput';
import { type DrillClefTypes, type DrillOptions, type OctaveRangeSet, type OctaveRange } from '@/types/DrillTypes';
import { useNavigate } from 'react-router-dom';
import { defaultDrillOptions, OCTAVE_RANGE_LIMITS } from '@/helpers/DrillHelpers';
import { useModal } from '@/context/ModalProvider';
import OctaveSelector, { type OctaveRangeSides } from '@/components/ModalComponents/OctaveSelector/OctaveSelector';
import { useNoteDrillStore } from '@/store/noteDrillStore';
import { PrintGenericNote } from '@/helpers/NoteHelpers';

interface Props {
  onBack: () => void;
}

interface FormErrors {
  timer: string
}

interface AccidentalToggles {
  Naturals: boolean;
  Sharps: boolean;
  Flats: boolean;
}

export default function CustomDrills({ onBack }: Props) {
  const setDrillOptions = useNoteDrillStore((state) => state.setDrillOptions);
  const { openModal } = useModal();
  const navigate = useNavigate();

  // Handle Form Input
  const [errors, setErrors] = useState<FormErrors>();
  const [currentOctaveRange, setCurrentOctaveRange] = useState<OctaveRange>({
    minOctave: { name: "C", accidental: null, octave: 4 },
    maxOctave: { name: "C", accidental: null, octave: 5 },
  });

  const timerRef = useRef<HTMLInputElement>(null);
  const clefRef = useRef<DrillClefTypes>("treble");
  const octaveRangeLimit = useRef<OctaveRangeSet>(OCTAVE_RANGE_LIMITS.filter((e) => e.clef === 'treble')[0]);

  const [accidentalToggles, setAccidentalToggles] = useState<AccidentalToggles>({
    Naturals: true,
    Sharps: false,
    Flats: false
  });

  // When clef is changed, min / max octave ranges must change aswell. 
  function handleClefChange(event: ChangeEvent<HTMLSelectElement>) {
    clefRef.current == event.target.value;
  }

  function handleAccidentalToggle(accidental: keyof AccidentalToggles) {
    setAccidentalToggles(prev => ({
      ...prev,
      [accidental]: !prev[accidental]
    }));
  }

  function handleSubmit() {
    const minOctave = 4;
    const maxOctave = 4;
    const time = Number(timerRef.current?.value.trim());

    let newErrors = { timer: "" } as FormErrors;
    let hasErrors = false;

    if (!clefRef.current || !minOctave || !maxOctave || time === undefined) {
      return;
    }

    if (time < 0 || time > 999) {
      newErrors.timer = "Choose 0 to 999";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) {
      return;
    }


    const newOptions = {
      clef: clefRef.current,
      timer: time,
      octaveRange: currentOctaveRange,
      allowedAccidentals: {
        naturals: accidentalToggles.Naturals,
        sharps: accidentalToggles.Sharps,
        flats: accidentalToggles.Flats,
      },
    } as DrillOptions;

    setDrillOptions(newOptions);
    navigate("/drills/start");
  };

  function handleDefaultOptionsPressed() {
    setDrillOptions(defaultDrillOptions);
    navigate("/drills/start");
  };

  function handleOctaveSet(newRange: OctaveRangeSides) {
    setCurrentOctaveRange({
      minOctave: newRange.leftNote,
      maxOctave: newRange.rightNote
    });
  };

  function PrintOctaveRange(): string {
    if (!currentOctaveRange) return " - ";

    let min = currentOctaveRange.minOctave
      ? PrintGenericNote(currentOctaveRange.minOctave)
      : "";
    let max = currentOctaveRange.minOctave
      ? PrintGenericNote(currentOctaveRange.maxOctave)
      : "";

    return `${min} - ${max}`;
  };

  const handleOpenModal = () => {
    openModal(
      <OctaveSelector octaveRangeLimit={octaveRangeLimit.current.range} setOctaveRange={handleOctaveSet} prevOctaveRange={currentOctaveRange} />
    );
  };

  return (
    <div className={styles.CustomDrillsWrapper}>
      <div className={styles.ContentWrapper}>
        <BackButtonContainer onBack={onBack} />
        <Card>
          <div className={styles.CardHeaderContainer}>
            <h1>Custom Drill Options</h1>
          </div>
          <div className={styles.InputsContainer}>
            <SelectInput
              htmlName='clef'
              label='Clef'
              options={[
                { label: "Treble", value: "treble" as DrillClefTypes },
                { label: "Bass", value: "bass" as DrillClefTypes },
              ]}
              defaultValue={"treble" as DrillClefTypes}
              handleChange={handleClefChange}
            />

            <h2>Octave Range</h2>
            <Button text='Choose Octave Range' variant='outlined' size='medium' onClick={handleOpenModal} />
            <p>{PrintOctaveRange()}</p>

            <h2>Timer</h2>
            <Input htmlName='timer' label='Time' placeholder='30' type='number' error={errors?.timer} ref={timerRef} defaultValue='60' min={0} max={999} />

            <h2>Accidentals</h2>
            <div className={styles.FlexButtonsContainer}>
              <Button onClick={() => handleAccidentalToggle('Naturals')} variant='text-secondary' text='Naturals' active={accidentalToggles.Naturals} />
              <Button onClick={() => handleAccidentalToggle('Sharps')} variant='text-secondary' text='Sharps' active={accidentalToggles.Sharps} />
              <Button onClick={() => handleAccidentalToggle('Flats')} variant='text-secondary' text='Flats' active={accidentalToggles.Flats} />
            </div>
          </div>
          <div className={styles.SubmitButtonContainer}>
            <Button onClick={handleSubmit} variant="contained" text="Start Drill" fullWidth={true} />
            <Button onClick={handleDefaultOptionsPressed} variant="outlined" text="Use Default Options" fullWidth={true} />
          </div>
        </Card>
      </div>
    </div>
  )
}
