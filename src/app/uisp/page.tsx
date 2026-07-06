"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { IndicatorTable } from "@/components/ui/IndicatorTable";
import { YearTabs } from "@/components/ui/YearTabs";
import { LinkedBadge } from "@/components/ui/Badge";
import { UISP_AREAS, UISP_INDICATORS, UISP_YEARS, CURRENT_YEAR } from "@/lib/mock-data";

export default function UispPage() {
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const isCurrent = year === CURRENT_YEAR;

  const resolvedRows = UISP_INDICATORS.map((r) => {
    const yearData = r.years.find((y) => y.year === year)!;
    return {
      ...r,
      baseline: yearData.baseline,
      target: yearData.target,
      actual: yearData.actual,
      linkedField: isCurrent ? r.linkedField : undefined,
    };
  });

  return (
    <div className="flex flex-col">
      <Topbar
        title="대학혁신지원사업"
        description="UISP · University Innovation Support Project — 자율성과지표 A~D (uisp.vercel.app 용어 기준, 2025년~)"
      />

      <div className="space-y-8 p-6">
        <YearTabs
          years={UISP_YEARS}
          value={year}
          onChange={setYear}
          statusOf={(y) => (y === CURRENT_YEAR ? "입력가능" : "완료")}
        />

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {UISP_AREAS.map((area) => {
            const rows = resolvedRows.filter((r) => r.area === area.code);
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
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-900">{area.short}</p>
                    <p className="text-[11px] text-slate-400">{area.name}</p>
                  </div>
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  {avgRate}
                  <span className="ml-1 text-sm font-normal text-slate-400">% 평균 달성도</span>
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
          {isCurrent
            ? "표시가 붙은 지표는 교육혁신처 공통 실적 데이터(대학 몫)에서 자동으로 채워지는 항목입니다."
            : `${year}년은 이미 마감된 자료로, 당시에는 개별 입력 방식이었습니다.`}
        </section>

        {UISP_AREAS.map((area) => {
          const rows = resolvedRows.filter((r) => r.area === area.code);
          return (
            <section key={area.code}>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">
                {area.code} · {area.name}
              </h2>
              <IndicatorTable rows={rows} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
