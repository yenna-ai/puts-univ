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

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {AREAS.map((area) => {
            const rows = EVALUATION_ROWS.filter((r) => r.area === area);
            const done = rows.filter(
              (r) => r.years.find((y) => y.year === year)!.evidenceStatus === "제출완료"
            ).length;
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

        {!isCurrent && (
          <p className="text-xs text-slate-400">
            {year}년은 이미 마감된 자료입니다 (당시에는 개별적으로 입력·제출됨).
          </p>
        )}

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
              {EVALUATION_ROWS.map((row) => {
                const yearData = row.years.find((y) => y.year === year)!;
                const showLinked = Boolean(row.linkedField) && isCurrent;
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-100 last:border-0 align-top ${
                      showLinked ? "bg-teal-50/30" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 text-slate-600">{row.area}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{row.material}</td>
                    <td className="px-4 py-2.5 text-slate-500">{row.dept}</td>
                    <td className="px-4 py-2.5 text-slate-700">{yearData.relatedPerformance}</td>
                    <td className="px-4 py-2.5">
                      <EvidenceBadge status={yearData.evidenceStatus} />
                    </td>
                    <td className="px-4 py-2.5">
                      {showLinked ? (
                        <Badge tone="blue">교육혁신처 연계</Badge>
                      ) : (
                        <span className="text-xs text-slate-300">-</span>
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
