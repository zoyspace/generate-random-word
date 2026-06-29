import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { CURRENT_PASSWORD_COPY_ID, SYMBOLS } from "../constants";
import type { PasswordSettings } from "../types";
import { AppIcon } from "./app-icon";
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
  passwordVersion: number;
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
  passwordVersion,
  settings,
}: GeneratorScreenProps) {
  return (
    <section className="mx-auto my-auto w-full max-w-125 -translate-y-6 rounded-3xl bg-card px-4 pb-10 pt-7 text-card-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-500 sm:-translate-y-8 sm:px-8 sm:pb-14 sm:pt-8">
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
            <AppIcon icon="solar:history-2-linear" />
          </button>
        </div>
      </header>

      <div className="relative mb-4">
        <div className="flex min-h-24 items-center rounded-2xl bg-muted py-4 pl-4 pr-14 text-foreground sm:min-h-28 sm:py-5 sm:pl-6 sm:pr-16">
          <PasswordValue
            key={passwordVersion}
            value={password}
            className="animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-300 motion-reduce:animate-none text-lg sm:text-2xl"
          />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg sm:right-4 sm:text-xl">
          <button
            type="button"
            aria-label="Copy password"
            className="grid size-9 place-items-center rounded-full bg-muted shadow-sm transition hover:scale-110 sm:size-10"
            onClick={onCopyCurrent}
          >
            <AppIcon
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

      <div className="mt-7 flex items-center justify-between sm:mt-8">
        <Button
          variant="outline"
          className="h-11 min-w-0 rounded-xl px-4 text-base font-bold shadow-md sm:h-12 sm:px-6 sm:text-lg"
          onClick={onOpenHistory}
        >
          View Password History
        </Button>
        <button
          type="button"
          aria-label="Generate password"
          className="group grid size-14 shrink-0 -translate-y-1 place-items-center rounded-full bg-primary text-2xl text-primary-foreground shadow-[0_12px_24px_rgb(0_0_0/35%),0_4px_8px_rgb(0_0_0/20%)] transition duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-primary/80 hover:shadow-[0_18px_32px_rgb(0_0_0/40%),0_6px_12px_rgb(0_0_0/24%)] active:translate-y-0 active:scale-95 active:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:size-16 sm:text-3xl"
          onClick={onGenerate}
        >
          <AppIcon
            icon="solar:refresh-linear"
            className="transition-transform duration-500 group-active:rotate-180"
          />
        </button>
      </div>
    </section>
  );
}
