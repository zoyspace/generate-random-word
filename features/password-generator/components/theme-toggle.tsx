"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { AppIcon, type AppIconName } from "./app-icon";

const THEME_ORDER = ["light", "dark"] as const;

const themeIcon = {
  light: "solar:sun-2-linear",
  dark: "solar:moon-linear",
} satisfies Record<(typeof THEME_ORDER)[number], AppIconName>;

const themeLabel = {
  light: "Light mode",
  dark: "Dark mode",
};

const subscribe = () => () => {};
const getMountedSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getMountedSnapshot,
    getServerSnapshot,
  );
  const { setTheme, theme = "light" } = useTheme();
  const currentTheme = THEME_ORDER.includes(
    theme as (typeof THEME_ORDER)[number],
  )
    ? (theme as (typeof THEME_ORDER)[number])
    : "light";

  const cycleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(currentTheme);
    const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Theme: ${themeLabel[currentTheme]}` : "Toggle theme"
      }
      className="grid size-7 place-items-center rounded-full text-foreground transition hover:bg-muted sm:size-8"
      onClick={cycleTheme}
      suppressHydrationWarning
    >
      {mounted ? (
        <AppIcon icon={themeIcon[currentTheme]} />
      ) : (
        <span className="size-4 rounded-full bg-muted" />
      )}
    </button>
  );
}
