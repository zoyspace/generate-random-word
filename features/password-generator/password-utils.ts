import { KAOMOJI, LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE } from "./constants";
import type { HistoryItem, PasswordSettings } from "./types";

export const formatDateTime = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(
    date.getHours(),
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds(),
  ).padStart(2, "0")}`;

const pickRandom = (source: string) => {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return source[values[0] % source.length];
};

const pickRandomItem = <T,>(items: T[]) => {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return items[values[0] % items.length];
};

export const getGraphemes = (value: string) => {
  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });

    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
};

const getVisualLength = (value: string) => getGraphemes(value).length;

const pickRandomExpression = (maxLength: number) => {
  const candidates = KAOMOJI.filter(
    (expression) => getVisualLength(expression) <= maxLength,
  );

  return pickRandomItem(candidates.length > 0 ? candidates : KAOMOJI);
};

const shuffle = (characters: string[]) => {
  const result = [...characters];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    const swapIndex = values[0] % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result.join("");
};

export const createPassword = ({
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols,
  length,
}: PasswordSettings) => {
  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
    return pickRandomExpression(length);
  }

  const groups = [
    includeLowercase ? LOWERCASE : "",
    includeUppercase ? UPPERCASE : "",
    includeNumbers ? NUMBERS : "",
    includeSymbols ? SYMBOLS : "",
  ];
  const characterPool = groups.join("") || LOWERCASE;
  const requiredCharacters = [
    includeLowercase ? pickRandom(LOWERCASE) : "",
    includeUppercase ? pickRandom(UPPERCASE) : "",
    includeNumbers ? pickRandom(NUMBERS) : "",
    includeSymbols ? pickRandom(SYMBOLS) : "",
  ].filter(Boolean);

  const characters = [...requiredCharacters];

  while (characters.length < length) {
    characters.push(pickRandom(characterPool));
  }

  return shuffle(characters.slice(0, length));
};

export const getPasswordLines = (value: string) => {
  const graphemes = getGraphemes(value);

  if (graphemes.length <= 20) {
    return [value];
  }

  return [graphemes.slice(0, 20).join(""), graphemes.slice(20).join("")];
};

export const createHistoryItem = (password: string): HistoryItem => ({
  id: crypto.randomUUID(),
  password,
  createdAt: formatDateTime(new Date()),
  favorite: false,
});

export const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
};
