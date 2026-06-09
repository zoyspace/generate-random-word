import type { HistoryItem, PasswordSettings } from "./types";

export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const NUMBERS = "0123456789";
export const SYMBOLS = "!@#$%^&*_-+=?";

export const CURRENT_PASSWORD_COPY_ID = "current";

export const DEFAULT_SETTINGS: PasswordSettings = {
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: false,
  length: 16,
};

export const KAOMOJI = [
  "😃",
  "😀",
  "😄",
  "😁",
  "😊",
  "😉",
  "😎",
  "🤔",
  "🥳",
  "😇",
  "🤗",
  "🙃",
  "😺",
  "🫶",
  "✨😃✨",
  "😃👍",
  "😊🌸",
  "(^_^)",
  "(>_<)",
  "(o_O)",
  "(^-^)/",
  "(T_T)",
  "(^o^)",
  "(._.)",
  "(^_−)☆",
  "(づ｡◕‿‿◕｡)づ",
  "٩(๑❛ᴗ❛๑)۶",
  "(ง •̀_•́)ง",
  "(￣▽￣)",
];

export const INITIAL_HISTORY: HistoryItem[] = [];
