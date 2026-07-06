import { Topbar } from "@/components/layout/Topbar";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CoverageChart } from "@/components/ui/CoverageChart";
import { REPORT_SUMMARIES } from "@/lib/mock-data";

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
            자료별 지표 현황 및 평균 달성률
          </h2>
          <CoverageChart />
        </section>
      </div>
    </div>
  );
}
