"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Badge, EvidenceBadge } from "@/components/ui/Badge";
import { YearTabs } from "@/components/ui/YearTabs";
import { EVALUATION_ROWS, YEARS, CURRENT_YEAR } from "@/lib/mock-data";

const AREAS = Array.from(new Set(EVALUATION_ROWS.map((r) => r.area)));

export default function EvaluationPage() {
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const isCurrent = year === CURRENT_YEAR;

  return (
    <div className="flex flex-col">
      <Topbar
        title="대학기관평가인증"
        description="대학기관평가인증 자체진단 보고서 · 평가영역별 요구자료 및 증빙 현황 (2023년~)"
      />

      <div className="space-y-6 p-6">
        <YearTabs
          years={YEARS}
          value={year}
          onChange={setYear}
          statusOf={(y) => (y === CURRENT_YEAR ? "입력가능" : "완료")}
        />

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area) => {
            const rows = EVALUATION_ROWS.filter((r) => r.area === area);
            const done = rows.filter(
              (r) => r.years.find((y) => y.year === year)!.evidenceStatus === "제출완료"
            ).length;
            return (
              <div key={area} className="rounded-lg border border-line bg-card p-4">
                <p className="text-xs font-medium text-muted">{area}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">
                  {done}
                  <span className="text-sm font-normal text-muted/70">/{rows.length} 제출완료</span>
                </p>
              </div>
            );
          })}
        </section>

        {!isCurrent && (
          <p className="text-xs text-muted/70">
            {year}년은 이미 마감된 자료입니다 (당시에는 개별적으로 입력·제출됨).
          </p>
        )}

        <section className="overflow-x-auto rounded-lg border border-line bg-card">
          <table className="w-full min-w-[1080px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
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
              {EVALUATION_ROWS.map((row) => {
                const yearData = row.years.find((y) => y.year === year)!;
                const showLinked = Boolean(row.linkedField) && isCurrent;
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-line/70 last:border-0 align-top ${
                      showLinked ? "bg-navy-soft/40" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 text-ink/70">{row.area}</td>
                    <td className="px-4 py-2.5 font-medium text-ink">{row.item}</td>
                    <td className="px-4 py-2.5 text-xs text-muted">{row.material}</td>
                    <td className="px-4 py-2.5 text-muted">{row.dept}</td>
                    <td className="px-4 py-2.5 text-ink/80">{yearData.relatedPerformance}</td>
                    <td className="px-4 py-2.5">
                      <EvidenceBadge status={yearData.evidenceStatus} />
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
