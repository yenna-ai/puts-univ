import { Repeat } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { DataFlowDiagram } from "@/components/mapping/DataFlowDiagram";
import { DataMappingTable } from "@/components/mapping/DataMappingTable";
import { DivisionBreakdownTable } from "@/components/mapping/DivisionBreakdownTable";
import { COMMON_INDICATORS } from "@/lib/mock-data";

export default function DataMappingPage() {
  return (
    <div className="flex flex-col">
      <Topbar
        title="실적 입력 예시 (교육혁신처 사례)"
        description="부서가 실적을 한 번 입력하면 여러 자료에서 함께 활용되는 구조를, 교육혁신처 사례로 보여드립니다"
      />

      <div className="space-y-8 p-6">
        <section className="flex items-start gap-3 rounded-lg border border-ink-2 bg-ink px-5 py-4 text-white">
          <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm leading-relaxed">
            교육혁신처가 실적을 <span className="font-semibold text-gold">한 번만 입력</span>
            하면, 장기발전계획 · 대학기관평가인증 · 대학혁신지원사업{" "}
            <span className="font-semibold text-gold">세 자료에서 함께 활용</span>됩니다. 지금
            까지는 같은 실적을 3개 문서에 각각 따로 작성해 왔습니다. 이 자동 연계는{" "}
            <span className="font-semibold text-gold">2026년부터</span> 적용되며, 이전 연도
            자료는 기존 방식대로 개별 입력·마감되었습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold text-ink/80">
            교육혁신처 실적 입력 (사례)
          </h2>
          <p className="mb-3 text-xs text-muted">
            소속별 인원 분포가 있는 <span className="font-medium text-gold">학생 수</span> 항목만
            소속(신학과·기독교교육과·교회음악학과·자유전공·신대원·대학원)별로 나누어 입력하고,
            건수·교원 수 항목은 소속 구분 없이 총계로 입력합니다. 대학혁신지원사업은 학부교육
            대상 사업이므로 학생 수 항목의 <span className="font-medium text-gold">대학(학부) 합계만</span>{" "}
            골라 쓰고, 장기발전계획·대학기관평가인증에는 신대원·대학원을 포함한 전체 합계가
            쓰입니다. 아래 값을 직접 바꿔보면 오른쪽 합계가 바로 바뀝니다.
          </p>
          <DivisionBreakdownTable />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink/80">연계 흐름도</h2>
          <DataFlowDiagram />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink/80">
            실적 → 공통 데이터 → 3자료 활용 매핑표 (교육혁신처 입력 실적 {COMMON_INDICATORS.length}
            종 전체)
          </h2>
          <DataMappingTable />
        </section>
      </div>
    </div>
  );
}
