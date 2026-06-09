import { Icon } from "@iconify-icon/react";

import { cn } from "@/lib/utils";

import type { HistoryFilter, HistoryItem } from "../types";
import { HistoryCard } from "./history-card";

type HistoryScreenProps = {
  copiedId: string | null;
  history: HistoryItem[];
  historyFilter: HistoryFilter;
  onBack: () => void;
  onCopy: (password: string, id: string) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
  onFilterChange: (filter: HistoryFilter) => void;
};

export function HistoryScreen({
  copiedId,
  history,
  historyFilter,
  onBack,
  onCopy,
  onDelete,
  onFavorite,
  onFilterChange,
}: HistoryScreenProps) {
  return (
    <section className="mx-auto w-full max-w-125 animate-in slide-in-from-right-8 fade-in duration-500">
      <header className="mb-6 flex items-center justify-between pt-8 sm:mb-8 sm:pt-10">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">History</h1>
        <button
          type="button"
          className="flex items-center gap-2 text-lg font-semibold transition hover:translate-x-1 sm:gap-3 sm:text-xl"
          onClick={onBack}
        >
          <Icon icon="solar:arrow-left-linear" />
          Back
        </button>
      </header>

      <div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-2 text-base font-semibold text-muted-foreground sm:gap-3 sm:p-3 sm:text-xl">
          <button
            type="button"
            className={cn(
              "flex h-14 items-center justify-center gap-1.5 rounded-xl transition sm:h-16 sm:gap-2",
              historyFilter === "all" && "bg-card text-card-foreground",
            )}
            onClick={() => onFilterChange("all")}
          >
            <Icon icon="solar:clock-circle-linear" />
            All History
          </button>
          <button
            type="button"
            className={cn(
              "flex h-14 items-center justify-center gap-1.5 rounded-xl transition sm:h-16 sm:gap-2",
              historyFilter === "favorites" && "bg-card text-card-foreground",
            )}
            onClick={() => onFilterChange("favorites")}
          >
            <Icon
              icon={
                historyFilter === "favorites"
                  ? "solar:heart-bold"
                  : "solar:heart-linear"
              }
              className={historyFilter === "favorites" ? "text-amber-500" : ""}
            />
            Favorites
          </button>
        </div>

        <div className="space-y-3 rounded-t-2xl p-3 sm:space-y-4 sm:p-5">
          {history.length > 0 ? (
            history.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                copied={copiedId === item.id}
                onCopy={() => onCopy(item.password, item.id)}
                onFavorite={() => onFavorite(item.id)}
                onDelete={() => onDelete(item.id)}
              />
            ))
          ) : (
            <p className="py-12 text-center text-lg font-medium text-muted-foreground">
              No passwords to show yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
