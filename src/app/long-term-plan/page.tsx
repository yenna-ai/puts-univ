"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Badge } from "@/components/ui/Badge";
import { YearTabs } from "@/components/ui/YearTabs";
import { LTP_ROWS, YEARS, CURRENT_YEAR } from "@/lib/mock-data";

export default function LongTermPlanPage() {
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const strategy = LTP_ROWS[0].strategy;
  const linkedCount = LTP_ROWS.filter((r) => r.linkedField).length;
  const isCurrent = year === CURRENT_YEAR;

  return (
    <div className="flex flex-col">
      <Topbar
        title="장기발전계획"
        description="장신비전 2030 4단계 장기발전계획 추진실적표 · 교육혁신처 발췌 (2023년~)"
      />

      <div className="space-y-6 p-6">
        <YearTabs
          years={YEARS}
          value={year}
          onChange={setYear}
          statusOf={(y) => (y === CURRENT_YEAR ? "입력가능" : "완료")}
        />

        <section className="rounded-lg border border-navy/25 bg-navy-soft px-5 py-4">
          <p className="text-xs font-medium text-navy">추진전략</p>
          <p className="mt-1 text-lg font-semibold text-ink">{strategy}</p>
          <p className="mt-2 text-xs text-muted">
            {isCurrent ? (
              <>
                교육혁신처 담당 실행과제 {LTP_ROWS.length}개 중 교육혁신처 공통 데이터 연계{" "}
                {linkedCount}개 · {year}년은 아직 진행 중인 연도로, 교육혁신처 실적을 한 번
                입력하면 자동 연계됩니다.
              </>
            ) : (
              <>{year}년은 이미 마감된 자료입니다 (당시에는 개별적으로 입력·제출됨).</>
            )}
          </p>
        </section>

        <section className="overflow-x-auto rounded-lg border border-line bg-card">
          <table className="w-full min-w-[1080px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
                <th className="px-4 py-2.5 font-medium">추진과제</th>
                <th className="px-4 py-2.5 font-medium">실행과제</th>
                <th className="px-4 py-2.5 font-medium">성과지표</th>
                <th className="px-4 py-2.5 font-medium">지표산식</th>
                <th className="px-4 py-2.5 font-medium">담당부서</th>
                <th className="px-4 py-2.5 font-medium text-right">목푯값</th>
                <th className="px-4 py-2.5 font-medium text-right">{year}년 실적</th>
                <th className="px-4 py-2.5 font-medium text-right">달성률</th>
                <th className="px-4 py-2.5 font-medium">연결 데이터</th>
              </tr>
            </thead>
            <tbody>
              {LTP_ROWS.map((row) => {
                const yearData = row.years.find((y) => y.year === year)!;
                const showLinked = Boolean(row.linkedField) && isCurrent;
                const rate = Math.round((yearData.actualValue / row.target) * 100);
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-line/70 last:border-0 align-top ${
                      showLinked ? "bg-navy-soft/40" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 text-ink/70">{row.task}</td>
                    <td className="px-4 py-2.5 text-ink/70">{row.action}</td>
                    <td className="px-4 py-2.5 font-medium text-ink">{row.indicator}</td>
                    <td className="px-4 py-2.5 text-xs text-muted">{row.formula}</td>
                    <td className="px-4 py-2.5 text-muted">{row.dept}</td>
                    <td className="px-4 py-2.5 text-right text-ink/70">
                      {row.target}
                      {row.unit}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-ink">
                      {yearData.actual}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span
                        className={`font-semibold ${rate >= 100 ? "text-[#3f6b3f]" : "text-gold"}`}
                      >
                        {rate}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      {showLinked ? (
                        <Badge tone="ink">교육혁신처 연계</Badge>
                      ) : (
                        <span className="text-xs text-muted/50">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
