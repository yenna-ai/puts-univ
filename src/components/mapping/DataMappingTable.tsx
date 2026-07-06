import { COMMON_INDICATORS } from "@/lib/mock-data";

export function DataMappingTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[1080px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
            <th className="w-[15%] px-4 py-2.5 font-medium">교육혁신처 입력 실적</th>
            <th className="w-[15%] px-4 py-2.5 font-medium">공통 데이터 항목</th>
            <th className="w-[23.3%] px-4 py-2.5 font-medium text-indigo-700">
              장기발전계획 활용
            </th>
            <th className="w-[23.3%] px-4 py-2.5 font-medium text-teal-700">
              대학기관평가인증 활용
            </th>
            <th className="w-[23.3%] px-4 py-2.5 font-medium text-blue-700">
              대학혁신지원사업 활용
            </th>
          </tr>
        </thead>
        <tbody>
          {COMMON_INDICATORS.map((c) => (
            <tr key={c.field} className="border-b border-slate-100 last:border-0 align-top">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{c.sourceLabel}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {c.value}
                  {c.unit} · {c.dept}
                </p>
              </td>
              <td className="px-4 py-3">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">
                  {c.field}
                </code>
              </td>
              <td className="px-4 py-3 text-slate-700">
                <p>{c.ltp.indicator}</p>
                <p className="mt-0.5 text-xs text-slate-400">{c.ltp.task}</p>
              </td>
              <td className="px-4 py-3 text-slate-700">
                <p>{c.evaluation.item}</p>
                <p className="mt-0.5 text-xs text-slate-400">{c.evaluation.area}</p>
              </td>
              <td className="px-4 py-3 text-slate-700">
                {c.uisp ? (
                  <>
                    <p>{c.uisp.indicator}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      자율성과지표 {c.uisp.area} · {c.uisp.code}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-300">UISP 미연계</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
