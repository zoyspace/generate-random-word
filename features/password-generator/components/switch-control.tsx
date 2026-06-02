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
        "relative inline-flex h-6 w-11 items-center rounded-full p-1 shadow-inner transition xs:h-7 xs:w-12 sm:h-8 sm:w-14",
        checked ? "bg-primary" : "bg-muted",
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={cn(
          "size-4 rounded-full bg-white shadow-md transition-transform duration-300 xs:size-5 sm:size-6",
          checked && "translate-x-5 sm:translate-x-6",
        )}
      />
    </button>
  );
}
