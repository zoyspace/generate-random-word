import type { HistoryItem, PasswordSettings } from "./types";

export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const NUMBERS = "0123456789";
export const SYMBOLS = "!@#$%^&*_-+=?";

export const DEFAULT_PASSWORD = "JNhs1la1kVYSPEWd";
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

export const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: "sample-current",
    password: DEFAULT_PASSWORD,
    createdAt: "2026/6/1 15:51:05",
    favorite: true,
  },
  {
    id: "sample-1",
    password: "ezwro1nxesk8zkjd",
    createdAt: "2026/3/11 20:52:30",
    favorite: false,
  },
  {
    id: "sample-2",
    password: "z{+j:s<l-ihmn+ux",
    createdAt: "2026/3/11 20:52:28",
    favorite: false,
  },
  {
    id: "sample-3",
    password: "v0t5v8pz35c7c5yd",
    createdAt: "2026/3/11 20:52:27",
    favorite: false,
  },
  {
    id: "sample-4",
    password: "$0_v#4b.?<ci/7q.",
    createdAt: "2026/3/11 20:52:27",
    favorite: false,
  },
];
