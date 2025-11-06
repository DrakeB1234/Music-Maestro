import { useLocalStorage } from "./useLocalStorage";
import { type DrillProgressResult } from "@customtypes/DrillProgressResult";

const STORAGE_KEY = "drillResults";

export function useDrillProgressResults() {
  const [results, setResults] = useLocalStorage<DrillProgressResult[]>(STORAGE_KEY, []);

  const addResult = (newResult: Omit<DrillProgressResult, "date">) => {
    const result: DrillProgressResult = {
      date: new Date().toISOString(),
      ...newResult,
    };
    setResults([...results, result]);
  };

  const clearResults = () => {
    setResults([]);
    alert("All data cleared.")
  };

  const getResults = (): DrillProgressResult[] => {
    return results;
  };

  const getResultsById = (id: string): DrillProgressResult[] => {
    return results.filter(e => e.id === id);
  };

  const exportResults = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `drill_results_backup_${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const importResults = async (file: File) => {
    const text = await file.text();
    try {
      const imported = JSON.parse(text);

      if (!isValidDrillResultsArray(imported)) {
        throw new Error("Invalid drill results structure");
      }

      setResults(imported);
      alert("Data successfully imported!");
    } catch (err) {
      console.error("Failed to import results:", err);
      alert("The JSON file is invalid or corrupted.");
    }
  };

  return {
    addResult,
    clearResults,
    getResults,
    getResultsById,
    exportResults,
    importResults
  };
}

function isDrillProgressResult(obj: any): obj is DrillProgressResult {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.score === "number" &&
    typeof obj.date === "string" &&
    typeof obj.correctNotes === "number" &&
    typeof obj.totalNotes === "number" &&
    typeof obj.correctNotesPerMinute === "number"
  );
}

function isValidDrillResultsArray(arr: any): arr is DrillProgressResult[] {
  return Array.isArray(arr) && arr.every(isDrillProgressResult);
}
