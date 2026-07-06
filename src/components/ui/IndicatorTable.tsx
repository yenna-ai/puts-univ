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
  초과달성: "bg-gold-soft text-gold",
  달성: "bg-[#e7efe4] text-[#3f6b3f]",
  미달: "bg-amber-50 text-amber-700",
  진행중: "bg-line/60 text-muted",
};

export function IndicatorTable({ rows }: { rows: UispIndicatorRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-card">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
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
                  "border-b border-line/70 last:border-0",
                  row.linkedField && "bg-navy-soft/40"
                )}
              >
                <td className="px-4 py-2.5 font-mono text-xs text-muted/70">{row.code}</td>
                <td className="px-4 py-2.5 font-medium text-ink">
                  <div className="flex items-center gap-2">
                    {row.indicator}
                    {row.linkedField && <LinkedBadge />}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-muted">{row.dept}</td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {row.baseline}
                  {row.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-ink/70">
                  {row.target}
                  {row.unit}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-ink">
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
                <td className="px-4 py-2.5 text-right text-muted">
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
