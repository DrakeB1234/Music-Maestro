import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './CustomDrills.module.css';
import Card from '@/components/UIComponents/Card';
import Input from '@/components/UIComponents/Inputs/Input';
import { useRef, useState } from 'react';
import Button from '@/components/UIComponents/Button';
import SelectInput from '@/components/UIComponents/Inputs/SelectInput';
import { type DrillClefTypes, type DrillOptions, clefOctaveLimits } from '@/types/DrillTypes';
import { useNavigate } from 'react-router-dom';

interface Props {
  onBack: () => void;
}

interface SelectOption {
  label: string
  value: string
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
  const navigate = useNavigate();

  // Handle Form Input
  const clefRef = useRef<HTMLSelectElement>(null);
  const minOctaveRef = useRef<HTMLSelectElement>(null);
  const maxOctaveRef = useRef<HTMLSelectElement>(null);
  const timerRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FormErrors>();
  const [octaveOptions, setOctaveOptions] = useState<SelectOption[]>(generateOctaveOptions('treble'));
  const [accidentalToggles, setAccidentalToggles] = useState<AccidentalToggles>({
    Naturals: true,
    Sharps: false,
    Flats: false
  });

  // When clef is changed, min / max octave ranges must change aswell. 
  function handleClefChange() {
    const clef = clefRef.current?.value.trim();
    if (!clef) return;
    setOctaveOptions(generateOctaveOptions(clef as DrillClefTypes));
  }

  function handleAccidentalToggle(accidental: keyof AccidentalToggles) {
    setAccidentalToggles(prev => ({
      ...prev,
      [accidental]: !prev[accidental]
    }));
  }

  function generateOctaveOptions(clef: DrillClefTypes): SelectOption[] {
    const { minOctave, maxOctave } = clefOctaveLimits[clef];
    return Array.from({ length: maxOctave - minOctave + 1 }, (_, i) => {
      const octave = minOctave + i;
      return { label: octave.toString(), value: octave.toString() };
    });
  }

  function handleSubmit() {
    const clef = clefRef.current?.value.trim() as DrillClefTypes;
    const minOctave = Number(minOctaveRef.current?.value.trim());
    const maxOctave = Number(maxOctaveRef.current?.value.trim());
    const time = Number(timerRef.current?.value.trim());

    let newErrors = { timer: "" } as FormErrors;
    let hasErrors = false;

    if (!clef || !minOctave || !maxOctave || time === undefined) {
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
      timer: time,
      minOctave: minOctave,
      maxOctave: maxOctave,
      allowedAccidentals: {
        naturals: accidentalToggles.Naturals,
        sharps: accidentalToggles.Sharps,
        flats: accidentalToggles.Flats,
      },
      staffOptions: {
        clef: clef
      }
    } as DrillOptions;

    navigate("/drills/start", { state: { type: "custom", options: newOptions } });
  };

  return (
    <div className={styles.CustomDrillsWrapper}>
      <div className={styles.ContentWrapper}>
        <BackButtonContainer onBack={onBack} />
        <Card padding='none'>
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
              ref={clefRef}
              handleChange={handleClefChange}
            />

            <h2>Octave Range</h2>
            <div className={styles.FlexInputsContainer}>
              <SelectInput
                htmlName='minOctave'
                label='Min'
                options={octaveOptions}
                defaultValue={octaveOptions[0].value}
                ref={minOctaveRef}
              />
              <SelectInput
                htmlName='maxOctave'
                label='Max'
                options={octaveOptions}
                defaultValue={octaveOptions[octaveOptions.length - 1].value}
                ref={maxOctaveRef}
              />
            </div>

            <h2>Timer</h2>
            <Input htmlName='timer' label='Time' placeholder='30' type='number' error={errors?.timer} ref={timerRef} defaultValue='60' min={0} max={999} />

            <h2>Accidentals</h2>
            <div className={styles.FlexButtonsContainer}>
              <Button onClick={() => handleAccidentalToggle('Naturals')} variant='text' text='Naturals' active={accidentalToggles.Naturals} />
              <Button onClick={() => handleAccidentalToggle('Sharps')} variant='text' text='Sharps' active={accidentalToggles.Sharps} />
              <Button onClick={() => handleAccidentalToggle('Flats')} variant='text' text='Flats' active={accidentalToggles.Flats} />
            </div>
          </div>
          <div className={styles.SubmitButtonContainer}>
            <Button onClick={handleSubmit} variant="contained" text="Start Drill" fullWidth={true} />
          </div>
        </Card>
      </div>
    </div>
  )
}
