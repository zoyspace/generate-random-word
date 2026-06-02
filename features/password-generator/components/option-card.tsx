import { SwitchControl } from "./switch-control";

type OptionCardProps = {
  checked: boolean;
  hint: string;
  onChange: (checked: boolean) => void;
  title: string;
};

export function OptionCard({ title, hint, checked, onChange }: OptionCardProps) {
  return (
    <label className="flex min-h-20 flex-col justify-center rounded-2xl border-[3px] border-border bg-card px-2 text-card-foreground transition hover:-translate-y-1 hover:shadow-lg sm:min-h-24 sm:rounded-[18px] sm:border-4 sm:px-2.5">
      <span className="text-xs font-medium sm:text-base">{title}</span>
      <span className="mt-0.5 break-all font-mono text-[10px] font-bold leading-tight text-muted-foreground sm:text-xs">
        ({hint})
      </span>
      <span className="mt-1.5">
        <SwitchControl checked={checked} onChange={onChange} />
      </span>
    </label>
  );
}
