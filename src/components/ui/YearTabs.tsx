"use client";

import type { YearStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function YearTabs({
  years,
  value,
  onChange,
  statusOf,
}: {
  years: readonly number[];
  value: number;
  onChange: (year: number) => void;
  statusOf: (year: number) => YearStatus;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {years.map((year) => {
        const status = statusOf(year);
        const active = year === value;
        return (
          <button
            key={year}
            type="button"
            onClick={() => onChange(year)}
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-navy bg-navy text-white"
                : "border-line bg-card text-ink/70 hover:border-ink/25"
            )}
          >
            {year}년
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                active
                  ? "bg-card/20 text-white"
                  : status === "완료"
                    ? "bg-line/60 text-muted"
                    : "bg-amber-50 text-amber-600"
              )}
            >
              {status}
            </span>
          </button>
        );
      })}
    </div>
  );
}
