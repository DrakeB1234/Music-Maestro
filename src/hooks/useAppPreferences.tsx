import type { AppPreferences } from "@/types/AppPreferences";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "appPreferences";

const DEFAULT_PREFS: AppPreferences = {
  inputType: "buttons",
  midiPlaybackEnabled: false,
  midiPlaybackVolume: 50,
  midiDeviceAutoConnect: false
};

export function useAppPreferences() {
  const [prefs, setPrefs] = useLocalStorage<AppPreferences>(
    STORAGE_KEY,
    DEFAULT_PREFS
  );

  const setInputType = (value: "buttons" | "piano" | null) => {
    setPrefs(prev => ({ ...prev, inputType: value }));
  };

  const setPrefsByKey = (key: keyof (AppPreferences), value: unknown) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => setPrefs(DEFAULT_PREFS);

  return {
    prefs,
    setInputType,
    resetPreferences,
    setPrefsByKey
  };
}
