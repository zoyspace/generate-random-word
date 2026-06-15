"use client";

import { CURRENT_PASSWORD_COPY_ID } from "./constants";
import { GeneratorScreen } from "./components/generator-screen";
import { HistoryScreen } from "./components/history-screen";
import { PasswordMascot } from "./components/password-mascot";
import { usePasswordGenerator } from "./use-password-generator";

export function PasswordGeneratorApp() {
  const {
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
  } = usePasswordGenerator();

  return (
    <main className="flex min-h-dvh flex-col bg-background px-3 py-3 text-foreground transition-colors sm:px-4">
      {screen === "generator" ? (
        <GeneratorScreen
          copiedId={copiedId}
          password={password}
          settings={settings}
          onCopyCurrent={() =>
            void copyPassword(password, CURRENT_PASSWORD_COPY_ID)
          }
          onGenerate={() => generatePassword()}
          onLengthChange={updateLength}
          onOpenHistory={() => setScreen("history")}
          onSettingChange={updateSetting}
        />
      ) : (
        <HistoryScreen
          copiedId={copiedId}
          history={filteredHistory}
          historyFilter={historyFilter}
          onBack={() => setScreen("generator")}
          onCopy={(value, id) => void copyPassword(value, id)}
          onDelete={deleteHistoryItem}
          onFavorite={toggleFavorite}
          onFilterChange={setHistoryFilter}
        />
      )}
      <PasswordMascot />
    </main>
  );
}
