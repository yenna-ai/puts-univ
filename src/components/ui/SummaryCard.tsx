import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SummaryCard({
  label,
  value,
  suffix,
  icon: Icon,
  accent = "muted",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  accent?: "muted" | "navy" | "maroon" | "gold";
}) {
  const accentMap: Record<string, string> = {
    muted: "bg-line/60 text-muted",
    navy: "bg-navy-soft text-navy",
    maroon: "bg-maroon-soft text-maroon",
    gold: "bg-gold-soft text-gold",
  };

  return (
    <div className="rounded-lg border border-line bg-card p-4 shadow-[0_1px_2px_rgba(22,35,61,0.04)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted">{label}</p>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", accentMap[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-serif text-2xl font-semibold text-ink">
        {value}
        {suffix && <span className="ml-1 text-sm font-normal text-muted">{suffix}</span>}
      </p>
    </div>
  );
}
