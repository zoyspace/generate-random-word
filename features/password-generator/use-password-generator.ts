"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  CURRENT_PASSWORD_COPY_ID,
  DEFAULT_SETTINGS,
  INITIAL_HISTORY,
} from "./constants";
import { copyToClipboard, createHistoryItem, createPassword } from "./password-utils";
import type { HistoryFilter, HistoryItem, PasswordSettings, Screen } from "./types";

const LENGTH_HISTORY_DEBOUNCE_MS = 450;
const COPY_FEEDBACK_MS = 1200;

export const usePasswordGenerator = () => {
  const [screen, setScreen] = useState<Screen>("generator");
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<PasswordSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const lengthHistoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const filteredHistory = useMemo(
    () =>
      historyFilter === "favorites"
        ? history.filter((item) => item.favorite)
        : history,
    [history, historyFilter],
  );

  const clearPendingLengthHistory = () => {
    if (lengthHistoryTimeoutRef.current) {
      clearTimeout(lengthHistoryTimeoutRef.current);
      lengthHistoryTimeoutRef.current = null;
    }
  };

  const appendHistory = (nextPassword: string) => {
    setHistory((items) => [createHistoryItem(nextPassword), ...items]);
  };

  const generatePassword = (settingsOverride?: Partial<PasswordSettings>) => {
    clearPendingLengthHistory();

    const nextSettings = {
      ...settings,
      ...settingsOverride,
    };
    const nextPassword = createPassword(nextSettings);

    setPassword(nextPassword);
    appendHistory(nextPassword);
  };

  const updateLength = (length: number) => {
    const nextSettings = {
      ...settings,
      length,
    };
    const nextPassword = createPassword(nextSettings);

    setSettings(nextSettings);
    setPassword(nextPassword);
    clearPendingLengthHistory();
    lengthHistoryTimeoutRef.current = setTimeout(() => {
      appendHistory(nextPassword);
      lengthHistoryTimeoutRef.current = null;
    }, LENGTH_HISTORY_DEBOUNCE_MS);
  };

  const updateSetting = (
    key: keyof Omit<PasswordSettings, "length">,
    checked: boolean,
  ) => {
    const nextSettings = {
      ...settings,
      [key]: checked,
    };

    setSettings(nextSettings);
    generatePassword(nextSettings);
  };

  const copyPassword = async (value: string, id = CURRENT_PASSWORD_COPY_ID) => {
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), COPY_FEEDBACK_MS);
    await copyToClipboard(value);
  };

  const toggleFavorite = (id: string) => {
    setHistory((items) =>
      items.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    );
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((items) => items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    return () => {
      if (lengthHistoryTimeoutRef.current) {
        clearTimeout(lengthHistoryTimeoutRef.current);
      }
    };
  }, []);

  return {
    copiedId,
    copyPassword,
    deleteHistoryItem,
    filteredHistory,
    generatePassword,
    historyFilter,
    password,
    screen,
    setHistoryFilter,
    setScreen,
    settings,
    toggleFavorite,
    updateLength,
    updateSetting,
  };
};
