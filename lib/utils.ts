type ClassValue =
  | ClassValue[]
  | Record<string, boolean | null | undefined>
  | boolean
  | null
  | string
  | undefined

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) {
      continue;
    }

    if (typeof input === "string") {
      classes.push(input);
      continue;
    }

    if (Array.isArray(input)) {
      const value = cn(...input);
      if (value) {
        classes.push(value);
      }
      continue;
    }

    if (typeof input === "object") {
      for (const [key, enabled] of Object.entries(input)) {
        if (enabled) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}
