import type { UispIndicatorRow } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LinkedBadge } from "@/components/ui/Badge";

function rateOf(row: UispIndicatorRow) {
  return Math.round((row.actual / row.target) * 100);
}

export function IndicatorTable({ rows }: { rows: UispIndicatorRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
            <th className="px-4 py-2.5 font-medium">세부사업</th>
            <th className="px-4 py-2.5 font-medium">지표명</th>
            <th className="px-4 py-2.5 font-medium">담당부서</th>
            <th className="px-4 py-2.5 font-medium text-right">목표</th>
            <th className="px-4 py-2.5 font-medium text-right">실적</th>
            <th className="px-4 py-2.5 font-medium text-right">달성률</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const rate = rateOf(row);
            return (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-slate-100 last:border-0",
                  row.linkedField && "bg-blue-50/40"
                )}
              >
                <td className="px-4 py-2.5 text-slate-600">{row.task}</td>
                <td className="px-4 py-2.5 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    {row.indicator}
                    {row.linkedField && <LinkedBadge />}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-slate-500">{row.dept}</td>
                <td className="px-4 py-2.5 text-right text-slate-600">
                  {row.target}
                  {row.unit}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-slate-900">
                  {row.actual}
                  {row.unit}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    className={cn(
                      "font-semibold",
                      rate >= 100 ? "text-emerald-600" : "text-amber-600"
                    )}
                  >
                    {rate}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
