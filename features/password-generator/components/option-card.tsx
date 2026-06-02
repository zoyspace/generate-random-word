import { SwitchControl } from "./switch-control";

type OptionCardProps = {
  checked: boolean;
  hint: string;
  onChange: (checked: boolean) => void;
  title: string;
};

export function OptionCard({ title, hint, checked, onChange }: OptionCardProps) {
  return (
    <label className="flex h-28 flex-col justify-between rounded-2xl border-3 border-border bg-card px-3 py-3 text-card-foreground transition hover:-translate-y-1 hover:shadow-lg xs:h-32 xs:px-2 xs:py-3 sm:rounded-lg sm:border-4 sm:px-2.5 sm:py-3.5">
      <span>
        <span className="block text-sm font-medium leading-tight xs:text-xs sm:text-base">
          {title}
        </span>
        <span className="mt-1 block break-all font-mono text-xs font-bold leading-tight text-muted-foreground">
          {hint}
        </span>
      </span>
      <span>
        <SwitchControl checked={checked} onChange={onChange} />
      </span>
    </label>
  );
}
