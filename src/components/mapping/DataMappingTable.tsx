import { COMMON_INDICATORS } from "@/lib/mock-data";

export function DataMappingTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-card">
      <table className="w-full min-w-[1080px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
            <th className="w-[15%] px-4 py-2.5 font-medium">교육혁신처 입력 실적</th>
            <th className="w-[15%] px-4 py-2.5 font-medium">공통 데이터 항목</th>
            <th className="w-[23.3%] px-4 py-2.5 font-medium text-navy">
              장기발전계획 활용
            </th>
            <th className="w-[23.3%] px-4 py-2.5 font-medium text-maroon">
              대학기관평가인증 활용
            </th>
            <th className="w-[23.3%] px-4 py-2.5 font-medium text-gold">
              대학혁신지원사업 활용
            </th>
          </tr>
        </thead>
        <tbody>
          {COMMON_INDICATORS.map((c) => (
            <tr key={c.field} className="border-b border-line/70 last:border-0 align-top">
              <td className="px-4 py-3">
                <p className="font-medium text-ink">{c.sourceLabel}</p>
                <p className="mt-0.5 text-xs text-muted/70">
                  {c.value}
                  {c.unit} · {c.dept}
                </p>
              </td>
              <td className="px-4 py-3">
                <code className="rounded bg-line/60 px-1.5 py-0.5 text-[11px] text-ink/70">
                  {c.field}
                </code>
              </td>
              <td className="px-4 py-3 text-ink/80">
                <p>{c.ltp.indicator}</p>
                <p className="mt-0.5 text-xs text-muted/70">{c.ltp.task}</p>
              </td>
              <td className="px-4 py-3 text-ink/80">
                <p>{c.evaluation.item}</p>
                <p className="mt-0.5 text-xs text-muted/70">{c.evaluation.area}</p>
              </td>
              <td className="px-4 py-3 text-ink/80">
                {c.uisp ? (
                  <>
                    <p>{c.uisp.indicator}</p>
                    <p className="mt-0.5 text-xs text-muted/70">
                      자율성과지표 {c.uisp.area} · {c.uisp.code}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted/50">대학혁신 미연계</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
