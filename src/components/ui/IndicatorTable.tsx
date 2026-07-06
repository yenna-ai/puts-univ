import type { UispIndicatorRow, UispStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LinkedBadge } from "@/components/ui/Badge";

function attainmentOf(row: UispIndicatorRow) {
  return Math.round((row.actual / row.target) * 100);
}

function statusOf(row: UispIndicatorRow): UispStatus {
  const rate = attainmentOf(row);
  if (row.actual === 0) return "진행중";
  if (rate >= 110) return "초과달성";
  if (rate >= 100) return "달성";
  return "미달";
}

const STATUS_TONE: Record<UispStatus, string> = {
  초과달성: "bg-blue-50 text-blue-700",
  달성: "bg-emerald-50 text-emerald-700",
  미달: "bg-amber-50 text-amber-700",
  진행중: "bg-slate-100 text-slate-500",
};

export function IndicatorTable({ rows }: { rows: UispIndicatorRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
            <th className="px-4 py-2.5 font-medium">코드</th>
            <th className="px-4 py-2.5 font-medium">지표명</th>
            <th className="px-4 py-2.5 font-medium">담당부서</th>
            <th className="px-4 py-2.5 font-medium text-right">기준값</th>
            <th className="px-4 py-2.5 font-medium text-right">목푯값</th>
            <th className="px-4 py-2.5 font-medium text-right">실적값</th>
            <th className="px-4 py-2.5 font-medium text-right">달성도</th>
            <th className="px-4 py-2.5 font-medium text-right">과부족</th>
            <th className="px-4 py-2.5 font-medium text-center">상태</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const rate = attainmentOf(row);
            const gap = row.actual - row.target;
            const status = statusOf(row);
            return (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-slate-100 last:border-0",
                  row.linkedField && "bg-blue-50/40"
                )}
              >
                <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{row.code}</td>
                <td className="px-4 py-2.5 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    {row.indicator}
                    {row.linkedField && <LinkedBadge />}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-slate-500">{row.dept}</td>
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {row.baseline}
                  {row.unit}
                </td>
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
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {gap > 0 ? "+" : ""}
                  {Number.isInteger(gap) ? gap : gap.toFixed(1)}
                  {row.unit}
                </td>
                <td className="px-4 py-2.5 text-center">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2 py-0.5 text-[11px] font-medium",
                      STATUS_TONE[status]
                    )}
                  >
                    {status}
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
