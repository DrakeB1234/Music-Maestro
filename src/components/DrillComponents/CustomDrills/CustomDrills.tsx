import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './CustomDrills.module.css';
import Card from '@/components/UIComponents/Card';
import Input from '@/components/UIComponents/Inputs/Input';
import { useRef, useState, type ChangeEvent } from 'react';
import Button from '@/components/UIComponents/Button';
import SelectInput from '@/components/UIComponents/Inputs/SelectInput';
import { type DrillClefTypes, type DrillOptions, type OctaveRange } from '@/types/DrillTypes';
import { useNavigate } from 'react-router-dom';
import { defaultDrillOptions, OCTAVE_RANGE_LIMITS } from '@/helpers/DrillHelpers';
import { useModal } from '@/context/ModalProvider';
import OctaveSelector, { type OctaveRangeSides } from '@/components/ModalComponents/OctaveSelector/OctaveSelector';
import { useNoteDrillStore } from '@/store/noteDrillStore';
import { AbsoluteSemitoneToNote, NoteToAbsoluteSemitone, PrintGenericNote } from '@/helpers/NoteHelpers';

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
  const setIsDrillStarted = useNoteDrillStore((state) => state.setIsDrillStarted);
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
  const octaveRangeLimit = useRef<OctaveRange>(OCTAVE_RANGE_LIMITS.filter((e) => e.clef === "treble")[0].range);

  const [accidentalToggles, setAccidentalToggles] = useState<AccidentalToggles>({
    Naturals: true,
    Sharps: false,
    Flats: false
  });

  // When clef is changed, min / max octave ranges must change aswell. 
  function handleClefChange(event: ChangeEvent<HTMLSelectElement>) {
    const newClef = event.target.value as DrillClefTypes;
    clefRef.current = newClef;
    const newOctaveRange = OCTAVE_RANGE_LIMITS.filter((e) => e.clef === newClef)[0].range;

    const currentMinOctaveSemitone = NoteToAbsoluteSemitone(currentOctaveRange.minOctave);
    const currentMaxOctaveSemitone = NoteToAbsoluteSemitone(currentOctaveRange.maxOctave);
    const newMinOctaveRangeSemitone = NoteToAbsoluteSemitone(newOctaveRange.minOctave);
    const newMaxOctaveRangeSemitone = NoteToAbsoluteSemitone(newOctaveRange.maxOctave);

    const newCurrentRange = { ...currentOctaveRange };

    // Handles edgecase if current octave range min/max is less/greater than new octave range limits
    if (currentMinOctaveSemitone < newMinOctaveRangeSemitone) {
      newCurrentRange.minOctave = AbsoluteSemitoneToNote(newMinOctaveRangeSemitone);
    };
    if (currentMaxOctaveSemitone > newMaxOctaveRangeSemitone) {
      newCurrentRange.maxOctave = AbsoluteSemitoneToNote(newMaxOctaveRangeSemitone);
    };

    setCurrentOctaveRange(newCurrentRange);
    octaveRangeLimit.current = newOctaveRange;
  }

  function handleAccidentalToggle(accidental: keyof AccidentalToggles) {
    setAccidentalToggles(prev => ({
      ...prev,
      [accidental]: !prev[accidental]
    }));
  }

  function handleSubmit() {
    const time = Number(timerRef.current?.value.trim());

    let newErrors = { timer: "" } as FormErrors;
    let hasErrors = false;

    if (!clefRef.current || time === undefined) {
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

    let noAccidentalsSelected = false;
    if (!accidentalToggles.Naturals && !accidentalToggles.Sharps && !accidentalToggles.Flats) {
      noAccidentalsSelected = true;
    }

    const newOptions = {
      drillId: undefined,
      clef: clefRef.current,
      timer: time,
      octaveRange: currentOctaveRange,
      allowedAccidentals: {
        naturals: accidentalToggles.Naturals || noAccidentalsSelected,
        sharps: accidentalToggles.Sharps,
        flats: accidentalToggles.Flats,
      },
    } as DrillOptions;

    setIsDrillStarted(false);
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
      <OctaveSelector octaveRangeLimit={octaveRangeLimit.current} prevOctaveRange={currentOctaveRange} clef={clefRef.current} setOctaveRange={handleOctaveSet} />
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

            <h2>Octave Range {PrintOctaveRange()}</h2>
            <Button text='Choose Octave Range' variant='outlined' size='medium' onClick={handleOpenModal} />

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
