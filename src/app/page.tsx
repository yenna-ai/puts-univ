import { FileStack, Database, Link2, TrendingDown } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { DataFlowDiagram } from "@/components/mapping/DataFlowDiagram";
import { OVERVIEW_SUMMARY, REPORT_SUMMARIES, RECENT_LINKS } from "@/lib/mock-data";

export default function OverviewPage() {
  return (
    <div className="flex flex-col">
      <Topbar
        title="통합 현황"
        description="대학혁신지원사업 · 장기발전계획 · 대학평가 — 하나의 실적 데이터가 세 자료에서 함께 활용되는 구조"
      />

      <div className="space-y-8 p-6">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <SummaryCard label="관리 자료" value={OVERVIEW_SUMMARY.managedDocuments} suffix="종" icon={FileStack} accent="slate" />
          <SummaryCard
            label="공통 실적 항목"
            value={OVERVIEW_SUMMARY.commonIndicatorCount}
            suffix="개"
            icon={Database}
            accent="blue"
          />
          <SummaryCard
            label="연결된 장표 항목"
            value={OVERVIEW_SUMMARY.linkedReportItemCount}
            suffix="개"
            icon={Link2}
            accent="indigo"
          />
          <SummaryCard
            label="반복 제출 감소 예상"
            value={OVERVIEW_SUMMARY.duplicateSubmissionReduction}
            suffix="%"
            icon={TrendingDown}
            accent="teal"
          />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">관리 자료 3종</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {REPORT_SUMMARIES.map((r) => (
              <ProjectCard
                key={r.key}
                title={r.title}
                description={r.description}
                href={r.href}
                total={r.total}
                linked={r.linked}
                accent={r.accent}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">
            &ldquo;한 번 입력 → 세 자료 활용&rdquo; 흐름도
          </h2>
          <DataFlowDiagram />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">최근 연결 예시</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                  <th className="px-4 py-2.5 font-medium">교육혁신처 입력 실적</th>
                  <th className="px-4 py-2.5 font-medium">실적값</th>
                  <th className="px-4 py-2.5 font-medium">담당부서</th>
                  <th className="px-4 py-2.5 font-medium text-blue-700">대학혁신지원사업</th>
                  <th className="px-4 py-2.5 font-medium text-indigo-700">장기발전계획</th>
                  <th className="px-4 py-2.5 font-medium text-teal-700">대학평가</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_LINKS.map((row) => (
                  <tr key={row.sourceLabel} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-slate-900">{row.sourceLabel}</td>
                    <td className="px-4 py-2.5 text-slate-600">{row.value}</td>
                    <td className="px-4 py-2.5 text-slate-500">{row.dept}</td>
                    <td className="px-4 py-2.5 text-slate-700">{row.uisp}</td>
                    <td className="px-4 py-2.5 text-slate-700">{row.ltp}</td>
                    <td className="px-4 py-2.5 text-slate-700">{row.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
