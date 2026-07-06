import { Topbar } from "@/components/layout/Topbar";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { DataFlowDiagram } from "@/components/mapping/DataFlowDiagram";
import { REPORT_SUMMARIES, RECENT_LINKS } from "@/lib/mock-data";

export default function OverviewPage() {
  return (
    <div className="flex flex-col">
      <Topbar
        title="통합 현황"
        description="장기발전계획 · 대학기관평가인증 · 대학혁신지원사업 — 하나의 실적 데이터가 세 자료에서 함께 활용되는 구조"
      />

      <div className="space-y-8 p-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink/80">
            &ldquo;한 번 입력 → 세 자료 활용&rdquo; 흐름도
          </h2>
          <DataFlowDiagram />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink/80">최근 연결 예시</h2>
          <div className="overflow-x-auto rounded-lg border border-line bg-card">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
                  <th className="px-4 py-2.5 font-medium">교육혁신처 입력 실적</th>
                  <th className="px-4 py-2.5 font-medium">실적값</th>
                  <th className="px-4 py-2.5 font-medium">담당부서</th>
                  <th className="px-4 py-2.5 font-medium text-navy">장기발전계획</th>
                  <th className="px-4 py-2.5 font-medium text-maroon">대학기관평가인증</th>
                  <th className="px-4 py-2.5 font-medium text-gold">대학혁신지원사업</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_LINKS.map((row) => (
                  <tr key={row.sourceLabel} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-ink">{row.sourceLabel}</td>
                    <td className="px-4 py-2.5 text-ink/70">{row.value}</td>
                    <td className="px-4 py-2.5 text-muted">{row.dept}</td>
                    <td className="px-4 py-2.5 text-ink/80">{row.ltp}</td>
                    <td className="px-4 py-2.5 text-ink/80">{row.evaluation}</td>
                    <td className="px-4 py-2.5 text-ink/80">{row.uisp}</td>
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
