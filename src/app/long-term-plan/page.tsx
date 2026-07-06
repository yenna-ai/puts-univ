import { Topbar } from "@/components/layout/Topbar";
import { Badge } from "@/components/ui/Badge";
import { LTP_ROWS } from "@/lib/mock-data";

export default function LongTermPlanPage() {
  const strategy = LTP_ROWS[0].strategy;
  const linkedCount = LTP_ROWS.filter((r) => r.linkedField).length;

  return (
    <div className="flex flex-col">
      <Topbar
        title="장기발전계획"
        description="장신비전 2030 4단계 장기발전계획 추진실적표 · 교육혁신처 발췌"
      />

      <div className="space-y-6 p-6">
        <section className="rounded-lg border border-indigo-100 bg-indigo-50/60 px-5 py-4">
          <p className="text-xs font-medium text-indigo-500">추진전략</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{strategy}</p>
          <p className="mt-2 text-xs text-slate-500">
            교육혁신처 담당 실행과제 {LTP_ROWS.length}개 중 교육혁신처 공통 데이터 연계{" "}
            {linkedCount}개
          </p>
        </section>

        <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[1080px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                <th className="px-4 py-2.5 font-medium">추진과제</th>
                <th className="px-4 py-2.5 font-medium">실행과제</th>
                <th className="px-4 py-2.5 font-medium">성과지표</th>
                <th className="px-4 py-2.5 font-medium">지표산식</th>
                <th className="px-4 py-2.5 font-medium">담당부서</th>
                <th className="px-4 py-2.5 font-medium">현재 실적</th>
                <th className="px-4 py-2.5 font-medium">연결 데이터</th>
              </tr>
            </thead>
            <tbody>
              {LTP_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 last:border-0 align-top ${
                    row.linkedField ? "bg-indigo-50/30" : ""
                  }`}
                >
                  <td className="px-4 py-2.5 text-slate-600">{row.task}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.action}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-900">{row.indicator}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">{row.formula}</td>
                  <td className="px-4 py-2.5 text-slate-500">{row.dept}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-900">{row.actual}</td>
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
