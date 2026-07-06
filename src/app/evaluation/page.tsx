import { Topbar } from "@/components/layout/Topbar";
import { Badge, EvidenceBadge } from "@/components/ui/Badge";
import { EVALUATION_ROWS } from "@/lib/mock-data";

const AREAS = Array.from(new Set(EVALUATION_ROWS.map((r) => r.area)));

export default function EvaluationPage() {
  return (
    <div className="flex flex-col">
      <Topbar
        title="대학평가"
        description="대학평가 자체진단 보고서 · 평가영역별 요구자료 및 증빙 현황"
      />

      <div className="space-y-6 p-6">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {AREAS.map((area) => {
            const rows = EVALUATION_ROWS.filter((r) => r.area === area);
            const done = rows.filter((r) => r.evidenceStatus === "제출완료").length;
            return (
              <div key={area} className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-slate-500">{area}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {done}
                  <span className="text-sm font-normal text-slate-400">/{rows.length} 제출완료</span>
                </p>
              </div>
            );
          })}
        </section>

        <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[1080px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                <th className="px-4 py-2.5 font-medium">평가영역</th>
                <th className="px-4 py-2.5 font-medium">평가항목</th>
                <th className="px-4 py-2.5 font-medium">요구자료</th>
                <th className="px-4 py-2.5 font-medium">담당부서</th>
                <th className="px-4 py-2.5 font-medium">관련 실적</th>
                <th className="px-4 py-2.5 font-medium">증빙자료 상태</th>
                <th className="px-4 py-2.5 font-medium">연결 데이터</th>
              </tr>
            </thead>
            <tbody>
              {EVALUATION_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 last:border-0 align-top ${
                    row.linkedField ? "bg-teal-50/30" : ""
                  }`}
                >
                  <td className="px-4 py-2.5 text-slate-600">{row.area}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-900">{row.item}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">{row.material}</td>
                  <td className="px-4 py-2.5 text-slate-500">{row.dept}</td>
                  <td className="px-4 py-2.5 text-slate-700">{row.relatedPerformance}</td>
                  <td className="px-4 py-2.5">
                    <EvidenceBadge status={row.evidenceStatus} />
                  </td>
                  <td className="px-4 py-2.5">
                    {row.linkedField ? (
                      <Badge tone="blue">교육혁신처 연계</Badge>
                    ) : (
                      <span className="text-xs text-slate-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
