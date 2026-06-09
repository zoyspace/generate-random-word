import { cn } from "@/lib/utils";

import { getPasswordLines } from "../password-utils";

type PasswordValueProps = {
  className?: string;
  lineLength?: number;
  value: string;
};

export function PasswordValue({
  value,
  className,
  lineLength,
}: PasswordValueProps) {
  return (
    <p
      className={cn(
        "min-w-0 font-mono font-black leading-tight tracking-wide",
        className,
      )}
    >
      {getPasswordLines(value, lineLength).map((line, index) => (
        <span key={`${line}-${index}`} className="block break-all">
          {line}
        </span>
      ))}
    </p>
  );
}
