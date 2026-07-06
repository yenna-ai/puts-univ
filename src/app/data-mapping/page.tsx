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
        title="교육혁신처 데이터 연계"
        description="교육혁신처 실적 입력 → 공통 데이터 저장 → 장기발전계획·대학기관평가인증·대학혁신지원사업 활용"
      />

      <div className="space-y-8 p-6">
        <section className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 px-5 py-4 text-white">
          <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
          <p className="text-sm leading-relaxed">
            교육혁신처가 실적을 <span className="font-semibold text-blue-300">한 번만 입력</span>
            하면, 장기발전계획 · 대학기관평가인증 · 대학혁신지원사업{" "}
            <span className="font-semibold text-blue-300">세 자료에서 함께 활용</span>됩니다. 지금
            까지는 같은 실적을 3개 문서에 각각 따로 작성해 왔습니다. 이 자동 연계는{" "}
            <span className="font-semibold text-blue-300">2026년부터</span> 적용되며, 이전 연도
            자료는 기존 방식대로 개별 입력·마감되었습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">연계 흐름도</h2>
          <DataFlowDiagram />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">
            실적 → 공통 데이터 → 3자료 활용 매핑표 (교육혁신처 입력 실적 {COMMON_INDICATORS.length}
            종 전체)
          </h2>
          <DataMappingTable />
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold text-slate-700">소속별(대학·신대원·대학원) 실적 분포</h2>
          <p className="mb-3 text-xs text-slate-500">
            교육혁신처 실적은 대학(신학과·기독교교육과·교회음악학과)·신대원·대학원 소속별로
            구분되어 관리됩니다. 대학혁신지원사업은 학부교육 대상 사업이므로{" "}
            <span className="font-medium text-blue-700">대학(학부) 합계만</span> 반영되고,
            장기발전계획·대학기관평가인증에는 신대원·대학원을 포함한 전체 합계가 반영됩니다.
          </p>
          <DivisionBreakdownTable />
        </section>
      </div>
    </div>
  );
}
