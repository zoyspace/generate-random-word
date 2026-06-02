import { cn } from "@/lib/utils";

type SwitchControlProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function SwitchControl({ checked, onChange }: SwitchControlProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full p-1 shadow-[inset_0_1px_4px_rgba(0,0,0,0.18)] transition sm:h-8 sm:w-14",
        checked ? "bg-primary" : "bg-muted",
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={cn(
          "size-5 rounded-full bg-white shadow-md transition-transform duration-300 sm:size-6",
          checked && "translate-x-5 sm:translate-x-6",
        )}
      />
    </button>
  );
}
