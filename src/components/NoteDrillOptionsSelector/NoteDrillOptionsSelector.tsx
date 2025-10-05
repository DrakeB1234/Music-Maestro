import type { DrillOptions } from "@customtypes/DrillOptions";

type Props = {
  SetSelectedOptions: React.Dispatch<React.SetStateAction<DrillOptions>>;
}

export default function NoteDrillOptionsSelector({ SetSelectedOptions }: Props) {
  return (
    <div>NoteDrillOptions</div>
  )
}
