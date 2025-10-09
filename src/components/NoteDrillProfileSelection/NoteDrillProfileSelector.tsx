import { useEffect, useState } from "react";
import { defaultDrillProfileData } from "@data/NoteDrillProfiles.ts";
import type { DrillProfile } from "@/types/DrillOptions";
import styles from './NoteDrillProfileSelector.module.css';
import Button from "../UIComponents/Button";

export default function NoteDrillProfileSelector({ profileSelected }: { profileSelected: (profile: DrillProfile) => void }) {

  const [availableProfiles, setAvailableProfiles] = useState<DrillProfile[] | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  function HandleProfileSelect(profileId: string) {
    if (profileId === selectedProfileId) {
      setSelectedProfileId(null)
      return;
    }
    setSelectedProfileId(profileId)
  }

  function HandleUseProfileClick() {
    if (!selectedProfileId || !availableProfiles) return;

    const profile = availableProfiles?.find(e => e.id === selectedProfileId);
    if (!profile) return;

    profileSelected(profile);
  }

  useEffect(() => {
    const defaultProfileData = defaultDrillProfileData as DrillProfile[];
    setAvailableProfiles(defaultProfileData);

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
      <div className={styles.UseProfileButtonContainer}>
        <Button variant="filled-primary" onClick={HandleUseProfileClick}>Use Profile</Button>
      </div>
    </div>
  )
}
