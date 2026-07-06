import { COMMON_INDICATORS, undergradTotal } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";

export function DivisionBreakdownTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-card">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
            <th className="px-4 py-2.5 font-medium">공통 데이터 항목</th>
            <th className="px-4 py-2.5 font-medium text-right">신학과</th>
            <th className="px-4 py-2.5 font-medium text-right">기독교교육과</th>
            <th className="px-4 py-2.5 font-medium text-right">교회음악학과</th>
            <th className="px-4 py-2.5 font-medium text-right text-gold">대학(학부) 합계</th>
            <th className="px-4 py-2.5 font-medium text-right">신대원</th>
            <th className="px-4 py-2.5 font-medium text-right">대학원</th>
            <th className="px-4 py-2.5 font-medium text-right">전체 합계</th>
          </tr>
        </thead>
        <tbody>
          {COMMON_INDICATORS.map((c) => {
            const undergrad = undergradTotal(c.byDivision);
            return (
              <tr key={c.field} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-ink">{c.sourceLabel}</p>
                  <p className="mt-0.5 text-xs text-muted/70">{c.dept}</p>
                </td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {c.byDivision["신학과"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {c.byDivision["기독교교육과"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {c.byDivision["교회음악학과"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold text-gold">
                      {undergrad}
                      {c.unit}
                    </span>
                    {c.uisp && <Badge tone="amber">→ UISP</Badge>}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {c.byDivision["신대원"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {c.byDivision["대학원"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-ink">
                  {c.value}
                  {c.unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
