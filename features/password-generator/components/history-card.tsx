import { Icon } from "@iconify-icon/react";

import { cn } from "@/lib/utils";

import type { HistoryItem } from "../types";
import { CircleAction } from "./circle-action";
import { PasswordValue } from "./password-value";

type HistoryCardProps = {
  copied: boolean;
  item: HistoryItem;
  onCopy: () => void;
  onDelete: () => void;
  onFavorite: () => void;
};

export function HistoryCard({
  item,
  copied,
  onCopy,
  onFavorite,
  onDelete,
}: HistoryCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border-2 border-border bg-card px-4 py-5 text-card-foreground shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 dark:shadow-[0_8px_20px_rgba(0,0,0,0.24)] sm:rounded-2xl sm:px-5 sm:py-6",
        item.favorite && "border-[#ffd15c] shadow-[0_12px_28px_rgba(250,190,70,0.16)]",
      )}
    >
      <div>
        <p className="mb-5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground sm:mb-6 sm:gap-2 sm:text-base">
          <Icon icon="solar:clock-circle-linear" />
          {item.createdAt}
        </p>
        <div className="flex items-center justify-between gap-3">
          <PasswordValue value={item.password} className="text-lg sm:text-xl" />
          <div className="flex shrink-0 gap-1.5 text-base sm:gap-2 sm:text-lg">
            <CircleAction
              label="Copy password"
              icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"}
              onClick={onCopy}
            />
            <CircleAction
              label="Favorite password"
              icon={item.favorite ? "solar:heart-bold" : "solar:heart-linear"}
              active={item.favorite}
              onClick={onFavorite}
            />
            <CircleAction
              label="Delete password"
              icon="solar:trash-bin-trash-linear"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
