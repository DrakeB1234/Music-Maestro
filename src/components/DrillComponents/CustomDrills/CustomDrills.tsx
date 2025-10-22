import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './CustomDrills.module.css';
import Card from '@/components/UIComponents/Card';
import Input from '@/components/UIComponents/Inputs/Input';
import { useRef, useState } from 'react';
import Button from '@/components/UIComponents/Button';
import SelectInput from '@/components/UIComponents/Inputs/SelectInput';

interface Props {
  onBack: () => void;
}

interface FormProps {
  clef: string,
  minOctave: string,
  maxOctave: string,
}

type clefTypes = "treble" | "bass";

export default function CustomDrills({ onBack }: Props) {

  // Handle Form Input
  const clefRef = useRef<HTMLSelectElement>(null);
  const minOctaveRef = useRef<HTMLInputElement>(null);
  const maxOctaveRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FormProps>();

  // When clef is changed, min / max octave ranges must change aswell. 
  function handleClefChange(clef: string) {
    console.log(clef);
  }

  function handleSubmit() {
    const clef = clefRef.current?.value.trim();
    const minOctave = minOctaveRef.current?.value.trim();
    const maxOctave = maxOctaveRef.current?.value.trim();

    const newErrors: FormProps = { clef: "", minOctave: "", maxOctave: "" };
    let hasError = false;

    if (!clef) {
      newErrors.clef = "Required.";
      hasError = true;
    }
    if (!minOctave) {
      newErrors.minOctave = "Required";
      hasError = true;
    }
    if (!maxOctave) {
      newErrors.maxOctave = "Required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log({ clef, min: minOctave, max: maxOctave });
    }
  };

  return (
    <div className={styles.CustomDrillsWraper}>
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
              { label: "Treble", value: "treble" as clefTypes },
              { label: "Bass", value: "bass" as clefTypes },
            ]}
            defaultValue={"treble" as clefTypes}
            ref={clefRef}
            handleChange={handleClefChange}
          />
          <h2>Octave Range</h2>
          <div className={styles.FlexInputsContainer}>
            <Input ref={minOctaveRef} type='text' label='Min' htmlName='minOctave' placeholder='4' error={errors?.minOctave} />
            <Input ref={maxOctaveRef} type='text' label='Max' htmlName='maxOctave' placeholder='7' error={errors?.maxOctave} />
          </div>
          <h2>Accidentals</h2>
        </div>
        <div className={styles.SubmitButtonContainer}>
          <Button onClick={handleSubmit} variant="contained" text="Start Drill" fullWidth={true} />
        </div>
      </Card>
    </div>
  )
}
