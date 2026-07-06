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
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            {year}년
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                active
                  ? "bg-white/20 text-white"
                  : status === "완료"
                    ? "bg-slate-100 text-slate-500"
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
