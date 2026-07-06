import { Topbar } from "@/components/layout/Topbar";
import { IndicatorTable } from "@/components/ui/IndicatorTable";
import { LinkedBadge } from "@/components/ui/Badge";
import { UISP_AREAS, UISP_INDICATORS } from "@/lib/mock-data";

export default function UispPage() {
  return (
    <div className="flex flex-col">
      <Topbar
        title="대학혁신지원사업"
        description="2026년 대학혁신지원사업 사업계획 · 영역별 지표 실적 (교육혁신처 연계 지표 강조)"
      />

      <div className="space-y-8 p-6">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {UISP_AREAS.map((area) => {
            const rows = UISP_INDICATORS.filter((r) => r.area === area.code);
            const linked = rows.filter((r) => r.linkedField).length;
            const avgRate = Math.round(
              rows.reduce((sum, r) => sum + (r.actual / r.target) * 100, 0) / rows.length
            );
            return (
              <div key={area.code} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">
                    {area.code}
                  </span>
                  <p className="text-sm font-semibold text-slate-900">{area.name}</p>
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  {avgRate}
                  <span className="ml-1 text-sm font-normal text-slate-400">% 평균 달성률</span>
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  지표 {rows.length}개 · 교육혁신처 연계 {linked}개
                </p>
              </div>
            );
          })}
        </section>

        <section className="flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs text-blue-700">
          <LinkedBadge />
          표시가 붙은 지표는 교육혁신처 공통 실적 데이터에서 자동으로 채워지는 항목입니다.
        </section>

        {UISP_AREAS.map((area) => {
          const rows = UISP_INDICATORS.filter((r) => r.area === area.code);
          return (
            <section key={area.code}>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">
                {area.code}영역 · {area.name}
              </h2>
              <IndicatorTable rows={rows} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
