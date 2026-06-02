import { Icon } from "@iconify-icon/react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { CURRENT_PASSWORD_COPY_ID, SYMBOLS } from "../constants";
import type { PasswordSettings } from "../types";
import { OptionCard } from "./option-card";
import { PasswordValue } from "./password-value";
import { ThemeToggle } from "./theme-toggle";

type GeneratorScreenProps = {
  copiedId: string | null;
  onCopyCurrent: () => void;
  onGenerate: () => void;
  onLengthChange: (length: number) => void;
  onOpenHistory: () => void;
  onSettingChange: (
    key: keyof Omit<PasswordSettings, "length">,
    checked: boolean,
  ) => void;
  password: string;
  settings: PasswordSettings;
};

export function GeneratorScreen({
  copiedId,
  onCopyCurrent,
  onGenerate,
  onLengthChange,
  onOpenHistory,
  onSettingChange,
  password,
  settings,
}: GeneratorScreenProps) {
  return (
    <section className="mx-auto min-h-dvh w-full max-w-125 rounded-3xl bg-card px-4 py-7 text-card-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-500 sm:px-8 sm:py-8">
      <header className="mb-7 flex items-start justify-between gap-3 sm:mb-8 sm:gap-4">
        <h1 className="min-w-0 text-left text-4xl font-black leading-none tracking-tight sm:text-5xl">
          <span className="block">Password</span>
          <span className="block">Generator</span>
        </h1>
        <div className="ml-auto flex shrink-0 items-center gap-2 pt-1 text-lg sm:gap-3 sm:text-xl">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open password history"
            className="grid size-7 place-items-center rounded-full text-foreground transition hover:bg-muted sm:size-8"
            onClick={onOpenHistory}
          >
            <Icon icon="solar:history-2-linear" />
          </button>
        </div>
      </header>

      <div className="mb-4 flex min-h-24 items-center justify-between gap-2 rounded-2xl bg-muted px-4 py-4 text-foreground sm:min-h-28 sm:gap-3 sm:px-6 sm:py-5">
        <PasswordValue value={password} className="text-lg sm:text-2xl" />
        <div className="flex shrink-0 items-center gap-2 text-lg sm:gap-3 sm:text-xl">
          <button
            type="button"
            aria-label="Generate password"
            className="transition hover:scale-110"
            onClick={onGenerate}
          >
            <Icon icon="solar:refresh-linear" />
          </button>
          <button
            type="button"
            aria-label="Copy password"
            className="transition hover:scale-110"
            onClick={onCopyCurrent}
          >
            <Icon
              icon={
                copiedId === CURRENT_PASSWORD_COPY_ID
                  ? "solar:check-circle-linear"
                  : "solar:copy-linear"
              }
            />
          </button>
        </div>
      </div>

      <label className="mb-7 block text-lg font-medium sm:mb-8 sm:text-xl">
        Length:{" "}
        <span className="text-xl font-bold tabular-nums sm:text-2xl">
          {settings.length}
        </span>
        <input
          type="range"
          min="8"
          max="32"
          value={settings.length}
          onInput={(event) => onLengthChange(Number(event.currentTarget.value))}
          className="password-range mt-4 block w-full sm:mt-5"
          style={
            {
              "--range-progress": `${((settings.length - 8) / 24) * 100}%`,
            } as CSSProperties
          }
        />
      </label>

      <div className="mb-6 grid grid-cols-2 gap-2 xs:grid-cols-4 xs:gap-1.5 sm:gap-2">
        <OptionCard
          title="Lowercase"
          hint="abc..."
          checked={settings.includeLowercase}
          onChange={(checked) => onSettingChange("includeLowercase", checked)}
        />
        <OptionCard
          title="Uppercase"
          hint="ABC..."
          checked={settings.includeUppercase}
          onChange={(checked) => onSettingChange("includeUppercase", checked)}
        />
        <OptionCard
          title="Numbers"
          hint="123..."
          checked={settings.includeNumbers}
          onChange={(checked) => onSettingChange("includeNumbers", checked)}
        />
        <OptionCard
          title="Symbols"
          hint={SYMBOLS}
          checked={settings.includeSymbols}
          onChange={(checked) => onSettingChange("includeSymbols", checked)}
        />
      </div>

      <div className="mt-7 flex justify-center sm:mt-8">
        <Button
          variant="outline"
          className="h-11 rounded-xl px-5 text-base font-bold shadow-md sm:h-12 sm:px-6 sm:text-lg"
          onClick={onOpenHistory}
        >
          View Password History
        </Button>
      </div>
    </section>
  );
}
