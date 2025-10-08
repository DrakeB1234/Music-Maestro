import { createContext, useContext } from "react";
import { useMidiInput } from "@/hooks/useMidiInput";

const MidiContext = createContext<ReturnType<typeof useMidiInput> | null>(null);

export function MidiProvider({ children }: { children: React.ReactNode }) {
  const midi = useMidiInput();
  return <MidiContext.Provider value={midi}>{children}</MidiContext.Provider>;
}

export function useMidiProvider() {
  const context = useContext(MidiContext);
  if (!context) throw new Error("useMidiProvider must be used within a MidiProvider");
  return context;
}
