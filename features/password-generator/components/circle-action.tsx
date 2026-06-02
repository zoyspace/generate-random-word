import { Icon } from "@iconify-icon/react";

import { cn } from "@/lib/utils";

type CircleActionProps = {
  active?: boolean;
  icon: string;
  label: string;
  onClick: () => void;
};

export function CircleAction({
  label,
  icon,
  active,
  onClick,
}: CircleActionProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-8 place-items-center rounded-full bg-card text-card-foreground shadow-md transition hover:scale-105 sm:size-9",
        active && "bg-amber-100 text-amber-500",
      )}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
}
