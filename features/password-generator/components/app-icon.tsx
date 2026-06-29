const iconPaths = {
  "solar:arrow-left-linear": [
    <path d="m12 19-7-7 7-7" key="a" />,
    <path d="M19 12H5" key="b" />,
  ],
  "solar:check-circle-linear": [
    <path d="M21.8 10.5A10 10 0 1 1 12 2.2" key="a" />,
    <path d="m9 12 2 2 4-5" key="b" />,
  ],
  "solar:clock-circle-linear": [
    <circle cx="12" cy="12" r="10" key="a" />,
    <path d="M12 6v6l4 2" key="b" />,
  ],
  "solar:copy-linear": [
    <rect height="14" key="a" rx="2" ry="2" width="14" x="8" y="8" />,
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" key="b" />,
  ],
  "solar:heart-bold": [
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" key="a" />,
  ],
  "solar:heart-linear": [
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" key="a" />,
  ],
  "solar:history-2-linear": [
    <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" key="a" />,
    <path d="M3 3v5h5" key="b" />,
    <path d="M12 7v5l4 2" key="c" />,
  ],
  "solar:moon-linear": [
    <path d="M20.9 13.2A8.3 8.3 0 0 1 10.8 3.1 7.5 7.5 0 1 0 20.9 13.2Z" key="a" />,
  ],
  "solar:refresh-linear": [
    <path d="M3 12a9 9 0 0 1 15.7-6.3L21 8" key="a" />,
    <path d="M21 3v5h-5" key="b" />,
    <path d="M21 12a9 9 0 0 1-15.7 6.3L3 16" key="c" />,
    <path d="M8 16H3v5" key="d" />,
  ],
  "solar:sun-2-linear": [
    <circle cx="12" cy="12" r="4" key="a" />,
    <path d="M12 2v2" key="b" />,
    <path d="M12 20v2" key="c" />,
    <path d="m4.9 4.9 1.4 1.4" key="d" />,
    <path d="m17.7 17.7 1.4 1.4" key="e" />,
    <path d="M2 12h2" key="f" />,
    <path d="M20 12h2" key="g" />,
    <path d="m6.3 17.7-1.4 1.4" key="h" />,
    <path d="m19.1 4.9-1.4 1.4" key="i" />,
  ],
  "solar:trash-bin-trash-linear": [
    <path d="M3 6h18" key="a" />,
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" key="b" />,
    <path d="M19 6 18 20c0 1-1 2-2 2H8c-1 0-2-1-2-2L5 6" key="c" />,
    <path d="M10 11v6" key="d" />,
    <path d="M14 11v6" key="e" />,
  ],
} as const;

export type AppIconName = keyof typeof iconPaths;

type AppIconProps = {
  className?: string;
  icon: AppIconName;
};

export function AppIcon({ className, icon }: AppIconProps) {
  const filled = icon === "solar:heart-bold";

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.25"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconPaths[icon]}
    </svg>
  );
}
