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

  const clearResults = () => setResults([]);

  const getResults = (): DrillProgressResult[] => {
    return results;
  };

  const getResultsById = (id: string): DrillProgressResult[] => {
    return results.filter(e => e.id === id);
  };

  return {
    addResult,
    clearResults,
    getResults,
    getResultsById
  };
}
