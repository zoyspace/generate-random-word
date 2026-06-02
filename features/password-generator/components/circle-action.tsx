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
        "grid size-8 place-items-center rounded-full bg-card text-card-foreground shadow-[0_3px_8px_rgba(15,23,42,0.24)] transition hover:scale-105 dark:shadow-[0_3px_8px_rgba(0,0,0,0.36)] sm:size-9",
        active && "bg-[#fff0bd] text-[#ff9f00]",
      )}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
}
