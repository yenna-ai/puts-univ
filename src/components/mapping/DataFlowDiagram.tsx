import { ArrowRight } from "lucide-react";
import { COMMON_INDICATORS } from "@/lib/mock-data";

const GROUPS = Array.from(new Set(COMMON_INDICATORS.map((c) => c.group))).map((group) => ({
  group,
  items: COMMON_INDICATORS.filter((c) => c.group === group),
}));

const TARGETS = [
  {
    key: "uisp",
    title: "대학혁신지원사업",
    tone: "border-blue-200 bg-blue-50/60",
    dot: "bg-blue-600",
    categories: [
      "에듀테크 기반 수업 활성화",
      "혁신교수법 운영",
      "학생역량 진단 및 성과관리",
      "교육성과 환류 체계 구축",
    ],
  },
  {
    key: "ltp",
    title: "장기발전계획",
    tone: "border-indigo-200 bg-indigo-50/60",
    dot: "bg-indigo-600",
    categories: [
      "교육혁신 체계 고도화",
      "미래형 교수학습 지원 강화",
      "학생역량 기반 교육성과 관리",
      "수업 질 관리 체계 강화",
    ],
  },
  {
    key: "evaluation",
    title: "대학평가",
    tone: "border-teal-200 bg-teal-50/60",
    dot: "bg-teal-600",
    categories: [
      "교육과정 운영 및 개선",
      "교수학습 지원 체계",
      "학생역량 관리",
      "교육성과 분석 및 환류",
    ],
  },
];

export function DataFlowDiagram() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <p className="mb-5 text-center text-sm font-medium text-slate-500">
        교육혁신처가 실적을{" "}
        <span className="font-semibold text-slate-900">한 번만 입력</span>하면, 공통 데이터로
        저장되어 <span className="font-semibold text-slate-900">세 자료에서 함께 활용</span>됩니다
      </p>

      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1.1fr_auto_0.7fr_auto_1.3fr]">
        {/* 왼쪽: 교육혁신처 입력 실적 (그룹) */}
        <div className="space-y-2">
          <p className="text-center text-xs font-semibold text-slate-400">
            교육혁신처 입력 실적 (10종)
          </p>
          {GROUPS.map(({ group, items }) => (
            <div key={group} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs font-medium text-slate-700">{group}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {items.map((i) => i.sourceLabel).join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <ArrowRight className="mx-auto hidden h-5 w-5 text-slate-300 lg:block" />

        {/* 가운데: 공통 실적 데이터 허브 */}
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-800 bg-slate-900 px-5 py-6 text-center text-white">
          <p className="text-xs text-slate-300">공통 실적 데이터</p>
          <p className="mt-1 text-lg font-bold">10개 필드</p>
          <p className="mt-1 text-[11px] text-slate-400">1회 입력 · DB 저장</p>
        </div>

        <ArrowRight className="mx-auto hidden h-5 w-5 text-slate-300 lg:block" />

        {/* 오른쪽: 세 자료 */}
        <div className="space-y-2">
          <p className="text-center text-xs font-semibold text-slate-400">연결되는 세 자료</p>
          {TARGETS.map((t) => (
            <div key={t.key} className={`rounded-md border px-3 py-2 ${t.tone}`}>
              <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                <p className="text-xs font-semibold text-slate-800">{t.title}</p>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-500">{t.categories.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
