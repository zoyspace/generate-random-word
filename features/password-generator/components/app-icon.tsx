import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Copy,
  Heart,
  History,
  Moon,
  RefreshCw,
  Sun,
  Trash2,
  type LucideIcon,
} from "lucide-react";

const icons = {
  "solar:arrow-left-linear": ArrowLeft,
  "solar:check-circle-linear": CheckCircle,
  "solar:clock-circle-linear": Clock,
  "solar:copy-linear": Copy,
  "solar:heart-bold": Heart,
  "solar:heart-linear": Heart,
  "solar:history-2-linear": History,
  "solar:moon-linear": Moon,
  "solar:refresh-linear": RefreshCw,
  "solar:sun-2-linear": Sun,
  "solar:trash-bin-trash-linear": Trash2,
} satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof icons;

type AppIconProps = {
  className?: string;
  icon: AppIconName;
};

export function AppIcon({ className, icon }: AppIconProps) {
  const Icon = icons[icon];
  const filled = icon === "solar:heart-bold";

  return (
    <Icon
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      focusable="false"
      size="1em"
      strokeWidth={2.25}
    />
  );
}
