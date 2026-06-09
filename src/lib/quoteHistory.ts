export interface ForgottenQuoteEntry {
  type: string;
  step: number | string;
  timestamp: string;
  key?: string;
}

const HISTORY_KEY = "forgotten_quotes_history";

export const logForgottenQuote = (type: string, step: number | string, key?: string) => {
  try {
    const history: ForgottenQuoteEntry[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const newEntry: ForgottenQuoteEntry = {
      type,
      step,
      timestamp: new Date().toISOString(),
      key
    };
    
    // Keep only the last 50 entries
    const updatedHistory = [newEntry, ...history].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error logging forgotten quote:", error);
  }
};

export const getForgottenQuotesHistory = (): ForgottenQuoteEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
};
