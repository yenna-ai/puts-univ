import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SummaryCard({
  label,
  value,
  suffix,
  icon: Icon,
  accent = "slate",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  accent?: "slate" | "blue" | "indigo" | "teal" | "amber";
}) {
  const accentMap: Record<string, string> = {
    slate: "bg-slate-50 text-slate-600",
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    teal: "bg-teal-50 text-teal-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", accentMap[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">
        {value}
        {suffix && <span className="ml-1 text-sm font-normal text-slate-400">{suffix}</span>}
      </p>
    </div>
  );
}
