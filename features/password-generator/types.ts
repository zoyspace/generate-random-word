export type HistoryFilter = "all" | "favorites";

export type Screen = "generator" | "history";

export type HistoryItem = {
  id: string;
  password: string;
  createdAt: string;
  favorite: boolean;
};

export type PasswordSettings = {
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
};
