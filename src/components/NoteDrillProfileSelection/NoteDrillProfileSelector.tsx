import { useEffect, useState } from "react";
import { defaultDrillProfileData } from "@data/NoteDrillProfiles.ts";
import type { DrillOptions, DrillProfile } from "@/types/DrillOptions";
import styles from './NoteDrillProfileSelector.module.css';

type Props = {
  optionsRef: React.RefObject<DrillOptions | null>;
}

export default function NoteDrillProfileSelector({ optionsRef }: Props) {

  const [availableProfiles, SetAvailableProfiles] = useState<DrillProfile[] | null>(null);
  const [selectedProfileId, SetSelectedProfileId] = useState<string | null>(null);

  function HandleProfileSelect(profileId: string) {
    SetSelectedProfileId(profileId)

    const profile = availableProfiles?.find(e => e.id === profileId);
    if (!profile) return;

    optionsRef.current = profile.drillOptions;
  }

  useEffect(() => {
    const defaultProfileData = defaultDrillProfileData as DrillProfile[];
    SetAvailableProfiles(defaultProfileData);

  }, []);

  return (
    <div>
      <h3>Selector</h3>
      {availableProfiles ?
        <div className={styles.ProfileItemsWrapper}>
          {availableProfiles.map((e) => (
            <div key={e.id} onClick={() => HandleProfileSelect(e.id)}
              className={`${styles.ProfileItemContainer} ${selectedProfileId == e.id ? styles.selected : ''}`}
            >
              <h3>{e.name}</h3>
            </div>
          ))}
        </div> :
        <div>
          <h3>No Profiles Found!</h3>
        </div>
      }
    </div>
  )
}
