import { COMMON_INDICATORS, undergradTotal } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";

export function DivisionBreakdownTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
            <th className="px-4 py-2.5 font-medium">공통 데이터 항목</th>
            <th className="px-4 py-2.5 font-medium text-right">신학과</th>
            <th className="px-4 py-2.5 font-medium text-right">기독교교육과</th>
            <th className="px-4 py-2.5 font-medium text-right">교회음악학과</th>
            <th className="px-4 py-2.5 font-medium text-right text-blue-700">대학(학부) 합계</th>
            <th className="px-4 py-2.5 font-medium text-right">신대원</th>
            <th className="px-4 py-2.5 font-medium text-right">대학원</th>
            <th className="px-4 py-2.5 font-medium text-right">전체 합계</th>
          </tr>
        </thead>
        <tbody>
          {COMMON_INDICATORS.map((c) => {
            const undergrad = undergradTotal(c.byDivision);
            return (
              <tr key={c.field} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-slate-900">{c.sourceLabel}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{c.dept}</p>
                </td>
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {c.byDivision["신학과"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {c.byDivision["기독교교육과"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {c.byDivision["교회음악학과"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold text-blue-700">
                      {undergrad}
                      {c.unit}
                    </span>
                    {c.uisp && <Badge tone="blue">→ UISP</Badge>}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {c.byDivision["신대원"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right text-slate-500">
                  {c.byDivision["대학원"]}
                  {c.unit}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-slate-900">
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
