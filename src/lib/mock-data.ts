import type {
  CommonIndicator,
  UispIndicatorRow,
  LtpRow,
  EvaluationRow,
  DocumentDef,
  Division,
  YearStatus,
  EvidenceStatus,
} from "./types";

export const CURRENT_PERIOD = "2026학년도 1학기";
export const CURRENT_YEAR = 2026;

// 장기발전계획·대학기관평가인증은 2023년(장신비전 2030 4단계 시작)부터,
// 대학혁신지원사업은 2025년부터 연도별 자료를 관리한다.
export const YEARS = [2023, 2024, 2025, 2026] as const;
export const UISP_YEARS = [2025, 2026] as const;

export const DIVISIONS: Division[] = [
  "신학과",
  "기독교교육과",
  "교회음악학과",
  "자유전공",
  "신대원",
  "대학원",
];
export const UNDERGRAD_DIVISIONS: Division[] = ["신학과", "기독교교육과", "교회음악학과", "자유전공"];

export function undergradTotal(byDivision: Record<Division, number>) {
  return (
    byDivision["신학과"] +
    byDivision["기독교교육과"] +
    byDivision["교회음악학과"] +
    byDivision["자유전공"]
  );
}

// ---------------------------------------------------------------------------
// 연도별·소속별 더미 데이터 생성 헬퍼
// ---------------------------------------------------------------------------

/** 대학(4개 학과) : 신대원 : 대학원 = 55 : 30 : 15 비율로 배분 */
function splitByDivision(total: number): Record<Division, number> {
  const ratios: [Division, number][] = [
    ["신학과", 0.25],
    ["기독교교육과", 0.12],
    ["교회음악학과", 0.08],
    ["자유전공", 0.1],
    ["신대원", 0.3],
    ["대학원", 0.15],
  ];
  const rounded = ratios.map(([d, r]) => [d, Math.round(total * r)] as const);
  const diff = total - rounded.reduce((sum, [, v]) => sum + v, 0);
  return Object.fromEntries(rounded.map(([d, v], i) => [d, i === 0 ? v + diff : v])) as Record<
    Division,
    number
  >;
}

/** 과거 연도 값을 완만한 성장 곡선으로 역산 (연 12% 내외 증가 추세 가정) */
function backdate(current: number, yearsBack: number, decimals = 0): number {
  if (yearsBack <= 0) return current;
  const factor = Math.pow(0.88, yearsBack);
  const v = current * factor;
  return decimals > 0 ? Math.round(v * 10 ** decimals) / 10 ** decimals : Math.max(0, Math.round(v));
}

function parseLeadingNumber(
  text: string
): { num: number; prefix: string; suffix: string; decimals: number } | null {
  const m = text.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { num: parseFloat(numStr), prefix, suffix, decimals };
}

function ltpYearSeries(actual: string, currentYear = CURRENT_YEAR) {
  const parsed = parseLeadingNumber(actual);
  return YEARS.map((year) => {
    const status: YearStatus = year === currentYear ? "입력가능" : "완료";
    if (!parsed) return { year, actual, actualValue: 0, status };
    const yearsBack = currentYear - year;
    const value = backdate(parsed.num, yearsBack, parsed.decimals);
    const formatted = parsed.decimals > 0 ? value.toFixed(parsed.decimals) : String(value);
    return {
      year,
      actual: `${parsed.prefix}${formatted}${parsed.suffix}`,
      actualValue: value,
      status,
    };
  });
}

function evalYearSeries(
  relatedPerformance: string,
  evidenceStatus: EvidenceStatus,
  currentYear = CURRENT_YEAR
) {
  const parsed = parseLeadingNumber(relatedPerformance);
  return YEARS.map((year) => {
    const status: YearStatus = year === currentYear ? "입력가능" : "완료";
    let rp = relatedPerformance;
    if (parsed) {
      const yearsBack = currentYear - year;
      const value = backdate(parsed.num, yearsBack, parsed.decimals);
      const formatted = parsed.decimals > 0 ? value.toFixed(parsed.decimals) : String(value);
      rp = `${parsed.prefix}${formatted}${parsed.suffix}`;
    }
    return {
      year,
      relatedPerformance: rp,
      evidenceStatus: status === "완료" ? ("제출완료" as EvidenceStatus) : evidenceStatus,
      status,
    };
  });
}

function uispYearSeries(baseline: number, target: number, actual: number, currentYear = CURRENT_YEAR) {
  return UISP_YEARS.map((year) => {
    if (year === currentYear) {
      return { year, baseline, target, actual, status: "입력가능" as YearStatus };
    }
    return {
      year,
      baseline: backdate(baseline, 1),
      target: backdate(target, 1),
      actual: baseline,
      status: "완료" as YearStatus,
    };
  });
}

// ---------------------------------------------------------------------------
// 1) 교육혁신처 기준 공통 실적 데이터 10종
//    -> 장기발전계획 / 대학기관평가인증 / 대학혁신지원사업 3개 장표와의 연계 매핑
//    소속(대학 3개 학과·신대원·대학원)별로 분포하며, 대학혁신지원사업에는
//    이 중 대학(학부) 몫만 반영된다.
// ---------------------------------------------------------------------------
export const COMMON_INDICATORS: CommonIndicator[] = [
  {
    field: "edutech_course_count",
    sourceLabel: "에듀테크 기반 수업 운영 교과목 수",
    value: 18,
    unit: "개",
    dept: "교육혁신처",
    period: CURRENT_PERIOD,
    group: "에듀테크·혁신교수법",
    byDivision: splitByDivision(18),
    uisp: {
      area: "C",
      code: "C111",
      indicator: "에듀테크 활용 교과 운영 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "교육혁신 체계 고도화",
      action: "에듀테크 기반 수업환경 조성",
      indicator: "에듀테크 활용 교과목 운영 수",
    },
    evaluation: {
      area: "교육과정 운영 및 개선",
      item: "교육과정의 다양화·특성화",
      material: "에듀테크 활용 교과목 운영 현황",
    },
  },
  {
    field: "innovative_teaching_course_count",
    sourceLabel: "혁신교수법 적용 교과목 수",
    value: 24,
    unit: "개",
    dept: "교육혁신처",
    period: CURRENT_PERIOD,
    group: "에듀테크·혁신교수법",
    byDivision: splitByDivision(24),
    uisp: {
      area: "C",
      code: "C112",
      indicator: "혁신교수법 적용 교과 운영 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "미래형 교수학습 지원 강화",
      action: "혁신교수법(PBL·플립러닝 등) 확산",
      indicator: "혁신교수법 적용 교과목 수",
    },
    evaluation: {
      area: "교수학습 지원 체계",
      item: "교수법 다양화 및 학습자 중심 수업 운영",
      material: "혁신교수법 적용 교과목 목록 및 강의계획서",
    },
  },
  {
    field: "teaching_workshop_count",
    sourceLabel: "교수법 워크숍 운영 건수",
    value: 6,
    unit: "건",
    dept: "교수학습개발원",
    period: CURRENT_PERIOD,
    group: "교수역량 워크숍",
    byDivision: splitByDivision(6),
    uisp: {
      area: "C",
      code: "C131",
      indicator: "교수역량 강화 프로그램(기존) 운영 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "미래형 교수학습 지원 강화",
      action: "교원 교수역량 강화 워크숍 운영",
      indicator: "교수법 워크숍 운영 건수",
    },
    evaluation: {
      area: "교수학습 지원 체계",
      item: "교원 교수역량 개발 지원",
      material: "워크숍 운영계획 및 결과보고서",
    },
  },
  {
    field: "teaching_workshop_participant_count",
    sourceLabel: "교수법 워크숍 참여 교원 수",
    value: 86,
    unit: "명",
    dept: "교수학습개발원",
    period: CURRENT_PERIOD,
    group: "교수역량 워크숍",
    byDivision: splitByDivision(86),
    uisp: {
      area: "C",
      code: "C232",
      indicator: "강화 프로그램 참여 교원 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "미래형 교수학습 지원 강화",
      action: "교원 교수역량 강화 워크숍 운영",
      indicator: "워크숍 참여 교원 수",
    },
    evaluation: {
      area: "교수학습 지원 체계",
      item: "교원 교수역량 개발 지원",
      material: "워크숍 참여자 명단",
    },
  },
  {
    field: "cqi_report_count",
    sourceLabel: "CQI 보고서 제출 교과목 수",
    value: 132,
    unit: "개",
    dept: "교육혁신처",
    period: CURRENT_PERIOD,
    group: "성과분석·환류",
    byDivision: splitByDivision(132),
    uisp: {
      area: "C",
      code: "C121",
      indicator: "CQI 입력 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "수업 질 관리 체계 강화",
      action: "CQI 환류 체계 운영",
      indicator: "교과목 CQI 참여율",
    },
    evaluation: {
      area: "교육성과 분석 및 환류",
      item: "강의평가 및 CQI 환류체계 운영",
      material: "CQI 보고서",
    },
  },
  {
    field: "student_competency_diagnosis_count",
    sourceLabel: "학생역량 진단 참여 학생 수",
    value: 246,
    unit: "명",
    dept: "혁신성과관리센터(IR)",
    period: CURRENT_PERIOD,
    group: "학생역량·비교과",
    byDivision: splitByDivision(246),
    uisp: {
      area: "C",
      code: "C221",
      indicator: "역량진단・강화 프로그램(기존) 참여 학생 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "학생역량 기반 교육성과 관리",
      action: "핵심역량 진단검사 실시",
      indicator: "역량진단 참여 학생 수",
    },
    evaluation: {
      area: "학생역량 관리",
      item: "학생 핵심역량 진단·관리 체계",
      material: "역량진단 결과보고서",
    },
  },
  {
    field: "extracurricular_program_participant_count",
    sourceLabel: "비교과 프로그램 참여 학생 수",
    value: 418,
    unit: "명",
    dept: "학생처",
    period: CURRENT_PERIOD,
    group: "학생역량·비교과",
    byDivision: splitByDivision(418),
    uisp: {
      area: "B",
      code: "B2",
      indicator: "학생성장 프로그램 참여 학생 수",
    },
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "학생역량 기반 교육성과 관리",
      action: "비교과 프로그램 운영 및 참여 확대",
      indicator: "비교과 프로그램 참여 학생 수",
    },
    evaluation: {
      area: "학생역량 관리",
      item: "비교과 교육과정 운영 실적",
      material: "비교과 프로그램 참여자 명단",
    },
  },
  {
    field: "lms_course_count",
    sourceLabel: "LMS 활용 교과목 수",
    value: 156,
    unit: "개",
    dept: "교육혁신처",
    period: CURRENT_PERIOD,
    group: "에듀테크·혁신교수법",
    byDivision: splitByDivision(156),
    // uisp.vercel.app 자율성과지표에는 "LMS 이용자 수(D21)"만 있고 "교과목 수" 단위의
    // 동일 지표가 없어 UISP 연계는 아직 없음 (장기발전계획·대학기관평가인증에서만 활용)
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "교육혁신 체계 고도화",
      action: "LMS 기반 학습관리 확대",
      indicator: "LMS 활용 교과목 수",
    },
    evaluation: {
      area: "교수학습 지원 체계",
      item: "학습관리시스템(LMS) 운영 실적",
      material: "LMS 활용 교과목 현황",
    },
  },
  {
    field: "education_outcome_report_count",
    sourceLabel: "교육성과 분석 보고서 작성 건수",
    value: 4,
    unit: "건",
    dept: "혁신성과관리센터(IR)",
    period: CURRENT_PERIOD,
    group: "성과분석·환류",
    byDivision: splitByDivision(4),
    // uisp.vercel.app에는 보고서 "작성 건수"를 세는 지표가 없어 UISP 연계는 아직 없음
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "수업 질 관리 체계 강화",
      action: "교육성과 분석 및 확산",
      indicator: "교육성과 분석보고서 작성 건수",
    },
    evaluation: {
      area: "교육성과 분석 및 환류",
      item: "교육성과 분석체계 구축·운영",
      material: "교육성과 분석 보고서",
    },
  },
  {
    field: "teaching_improvement_feedback_count",
    sourceLabel: "수업 개선 환류 사례 수",
    value: 12,
    unit: "건",
    dept: "교무처",
    period: CURRENT_PERIOD,
    group: "성과분석·환류",
    byDivision: splitByDivision(12),
    // uisp.vercel.app에는 "환류 사례 수"에 대응하는 지표가 없어 UISP 연계는 아직 없음
    ltp: {
      strategy: "창의융합 미래선도형 교육과정 혁신",
      task: "수업 질 관리 체계 강화",
      action: "CQI 환류 체계 운영",
      indicator: "수업개선 환류 사례 수",
    },
    evaluation: {
      area: "교육성과 분석 및 환류",
      item: "환류 결과의 활용 실적",
      material: "수업개선 사례집",
    },
  },
];

function undergradShare(field: string) {
  const c = COMMON_INDICATORS.find((x) => x.field === field);
  if (!c) throw new Error(`unknown common indicator field: ${field}`);
  const undergrad = undergradTotal(c.byDivision);
  return { undergrad, ratio: undergrad / c.value };
}

const edutechShare = undergradShare("edutech_course_count");
const innovativeTeachingShare = undergradShare("innovative_teaching_course_count");
const workshopCountShare = undergradShare("teaching_workshop_count");
const workshopParticipantShare = undergradShare("teaching_workshop_participant_count");
const cqiShare = undergradShare("cqi_report_count");
const competencyShare = undergradShare("student_competency_diagnosis_count");
const extracurricularShare = undergradShare("extracurricular_program_participant_count");

// ---------------------------------------------------------------------------
// 2) 대학혁신지원사업 (UISP) — uisp.vercel.app 실제 자율성과지표 A~D 체계 그대로 사용
//    (지표 코드·지표명·담당부서는 yenna-ai/uisp 저장소의 Indicators.csv / Users.csv 기준)
//    linkedField 가 있는 행은 교육혁신처 공통 데이터 중 "대학(학부)" 몫만 반영된 지표
//    (대학혁신지원사업은 학부교육 대상 사업이므로 신대원·대학원 실적은 제외)
// ---------------------------------------------------------------------------
export const UISP_AREAS = [
  { code: "A", name: "학사 유연화 지수", short: "학사 유연화" },
  { code: "B", name: "학생성장 지원 지수", short: "학생성장 지원" },
  { code: "C", name: "PUTS형 교육혁신 지수", short: "PUTS형 교육혁신" },
  { code: "D", name: "교육환경 고도화 지수", short: "교육환경 고도화" },
] as const;

const UISP_INDICATORS_BASE: Omit<UispIndicatorRow, "years">[] = [
  {
    // uisp.vercel.app 실 데이터(Indicators.csv 2026, KPI_Actuals.csv 2025) 기준
    id: "A11",
    area: "A",
    code: "A11",
    indicator: "자유전공 전공탐색 교과 개발 수",
    dept: "교육혁신처",
    baseline: 0,
    target: 2,
    actual: 3,
    unit: "개",
  },
  {
    id: "A121",
    area: "A",
    code: "A121",
    indicator: "교양기초교육 신규교과 개발 수",
    dept: "교육혁신처",
    baseline: 10,
    target: 13,
    actual: 15,
    unit: "개",
  },
  {
    id: "A13",
    area: "A",
    code: "A13",
    indicator: "연계・융합전공 교과 개발 수",
    dept: "교육혁신처",
    baseline: 0,
    target: 2,
    actual: 1,
    unit: "개",
  },
  {
    // B11+B12+B13(하위 항목 합) 합산
    id: "B1",
    area: "B",
    code: "B1",
    indicator: "학생성장 프로그램 운영 수",
    dept: "학생생활상담소",
    baseline: 35,
    target: 46,
    actual: 45,
    unit: "개",
  },
  {
    id: "B2",
    area: "B",
    code: "B2",
    indicator: "학생성장 프로그램 참여 학생 수",
    dept: "학생생활상담소",
    baseline: Math.round(300 * extracurricularShare.ratio),
    target: Math.round(350 * extracurricularShare.ratio),
    actual: extracurricularShare.undergrad,
    unit: "명",
    linkedField: "extracurricular_program_participant_count",
  },
  {
    id: "B24",
    area: "B",
    code: "B24",
    indicator: "PUTS+마일리지・인증제 참여 학생 수",
    dept: "교육혁신처",
    baseline: 0,
    target: 114,
    actual: 14,
    unit: "명",
  },
  {
    // B31/B32/B33/B34/B35(하위 항목 평균) 평균값. 100점 만점 척도
    id: "B3",
    area: "B",
    code: "B3",
    indicator: "학생성장 프로그램 만족도 평균",
    dept: "학생생활상담소",
    baseline: 82,
    target: 78,
    actual: 90,
    unit: "점",
  },
  {
    id: "C111",
    area: "C",
    code: "C111",
    indicator: "에듀테크 활용 교과 운영 수",
    dept: "교육혁신처(CTL)",
    baseline: Math.round(10 * edutechShare.ratio),
    target: Math.round(15 * edutechShare.ratio),
    actual: edutechShare.undergrad,
    unit: "개",
    linkedField: "edutech_course_count",
  },
  {
    id: "C112",
    area: "C",
    code: "C112",
    indicator: "혁신교수법 적용 교과 운영 수",
    dept: "교육혁신처(CTL)",
    baseline: Math.round(15 * innovativeTeachingShare.ratio),
    target: Math.round(20 * innovativeTeachingShare.ratio),
    actual: innovativeTeachingShare.undergrad,
    unit: "개",
    linkedField: "innovative_teaching_course_count",
  },
  {
    id: "C121",
    area: "C",
    code: "C121",
    indicator: "CQI 입력 수",
    dept: "교육혁신처(IR)",
    baseline: Math.round(100 * cqiShare.ratio),
    target: Math.round(120 * cqiShare.ratio),
    actual: cqiShare.undergrad,
    unit: "개",
    linkedField: "cqi_report_count",
  },
  {
    id: "C122",
    area: "C",
    code: "C122",
    indicator: "우수 교과 확산 수",
    dept: "교육혁신처(IR)",
    baseline: 0,
    target: 18,
    actual: 10,
    unit: "개",
  },
  {
    id: "C131",
    area: "C",
    code: "C131",
    indicator: "교수역량 강화 프로그램(기존) 운영 수",
    dept: "교육혁신처(CTL)",
    baseline: Math.round(3 * workshopCountShare.ratio),
    target: Math.round(4 * workshopCountShare.ratio),
    actual: workshopCountShare.undergrad,
    unit: "건",
    linkedField: "teaching_workshop_count",
  },
  {
    id: "C221",
    area: "C",
    code: "C221",
    indicator: "역량진단・강화 프로그램(기존) 참여 학생 수",
    dept: "교육혁신처(IR)",
    baseline: Math.round(180 * competencyShare.ratio),
    target: Math.round(200 * competencyShare.ratio),
    actual: competencyShare.undergrad,
    unit: "명",
    linkedField: "student_competency_diagnosis_count",
  },
  {
    id: "C232",
    area: "C",
    code: "C232",
    indicator: "강화 프로그램 참여 교원 수",
    dept: "교육혁신처(CTL)",
    baseline: Math.round(50 * workshopParticipantShare.ratio),
    target: Math.round(70 * workshopParticipantShare.ratio),
    actual: workshopParticipantShare.undergrad,
    unit: "명",
    linkedField: "teaching_workshop_participant_count",
  },
  {
    // 100점 만점 척도 (uisp.vercel.app 실 데이터)
    id: "C41",
    area: "C",
    code: "C41",
    indicator: "학생 핵심역량 진단 점수",
    dept: "교육혁신처(IR)",
    baseline: 79.8,
    target: 79.86,
    actual: 82.4,
    unit: "점",
  },
  {
    id: "D111",
    area: "D",
    code: "D111",
    indicator: "LMS 개발・운영 수",
    dept: "교육혁신처(CTL)",
    baseline: 1,
    target: 1,
    actual: 1,
    unit: "개",
  },
  {
    id: "D12",
    area: "D",
    code: "D12",
    indicator: "에듀테크 라이선스 확보・지원 수",
    dept: "교육혁신처(CTL)",
    baseline: 78,
    target: 82,
    actual: 86,
    unit: "건",
  },
  {
    id: "D21",
    area: "D",
    code: "D21",
    indicator: "LMS 이용자 수",
    dept: "교육혁신처(CTL)",
    baseline: 581,
    target: 583,
    actual: 628,
    unit: "명",
  },
];

export const UISP_INDICATORS: UispIndicatorRow[] = UISP_INDICATORS_BASE.map((r) => ({
  ...r,
  years: uispYearSeries(r.baseline, r.target, r.actual),
}));

// ---------------------------------------------------------------------------
// 3) 장기발전계획(장신비전 2030 4단계) — 교육혁신처 관련 발췌 (2023년~)
// ---------------------------------------------------------------------------
const LTP_ROWS_BASE: Omit<LtpRow, "years">[] = [
  {
    id: "ltp-01",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "교육혁신 체계 고도화",
    action: "에듀테크 기반 수업환경 조성",
    indicator: "에듀테크 활용 교과목 운영 수",
    formula: "에듀테크 활용 교과목 수",
    dept: "교육혁신처",
    actual: "18개",
    target: 15,
    unit: "개",
    linkedField: "edutech_course_count",
  },
  {
    id: "ltp-02",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "교육혁신 체계 고도화",
    action: "LMS 기반 학습관리 확대",
    indicator: "LMS 활용 교과목 수",
    formula: "LMS 활용 교과목 수",
    dept: "교육혁신처",
    actual: "156개",
    target: 140,
    unit: "개",
    linkedField: "lms_course_count",
  },
  {
    id: "ltp-03",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "미래형 교수학습 지원 강화",
    action: "혁신교수법(PBL·플립러닝 등) 확산",
    indicator: "혁신교수법 적용 교과목 수",
    formula: "혁신교수법 적용 교과목 수",
    dept: "교육혁신처",
    actual: "24개",
    target: 20,
    unit: "개",
    linkedField: "innovative_teaching_course_count",
  },
  {
    id: "ltp-04",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "미래형 교수학습 지원 강화",
    action: "교원 교수역량 강화 워크숍 운영",
    indicator: "교수법 워크숍 운영 건수",
    formula: "워크숍 운영 건수",
    dept: "교수학습개발원",
    actual: "6건",
    target: 4,
    unit: "건",
    linkedField: "teaching_workshop_count",
  },
  {
    id: "ltp-05",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "미래형 교수학습 지원 강화",
    action: "교원 교수역량 강화 워크숍 운영",
    indicator: "워크숍 참여 교원 수",
    formula: "워크숍 참여 교원 수",
    dept: "교수학습개발원",
    actual: "86명",
    target: 70,
    unit: "명",
    linkedField: "teaching_workshop_participant_count",
  },
  {
    id: "ltp-06",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "학생역량 기반 교육성과 관리",
    action: "핵심역량 진단검사 실시",
    indicator: "역량진단 참여 학생 수",
    formula: "역량진단 참여 학생 수",
    dept: "혁신성과관리센터(IR)",
    actual: "246명",
    target: 200,
    unit: "명",
    linkedField: "student_competency_diagnosis_count",
  },
  {
    id: "ltp-07",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "학생역량 기반 교육성과 관리",
    action: "비교과 프로그램 운영 및 참여 확대",
    indicator: "비교과 프로그램 참여 학생 수",
    formula: "비교과 프로그램 참여 학생 수(연인원)",
    dept: "학생처",
    actual: "418명",
    target: 350,
    unit: "명",
    linkedField: "extracurricular_program_participant_count",
  },
  {
    id: "ltp-08",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "수업 질 관리 체계 강화",
    action: "CQI 환류 체계 운영",
    indicator: "교과목 CQI 참여율",
    formula: "CQI 제출 교과목 수 / 매 학기 전체 교과목 수 X 100",
    dept: "교육혁신처",
    actual: "132개 제출",
    target: 120,
    unit: "개",
    linkedField: "cqi_report_count",
  },
  {
    id: "ltp-09",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "수업 질 관리 체계 강화",
    action: "교육성과 분석 및 확산",
    indicator: "교육성과 분석보고서 작성 건수",
    formula: "교육성과 분석보고서 작성 건수",
    dept: "혁신성과관리센터(IR)",
    actual: "4건",
    target: 4,
    unit: "건",
    linkedField: "education_outcome_report_count",
  },
  {
    id: "ltp-10",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "수업 질 관리 체계 강화",
    action: "CQI 환류 체계 운영",
    indicator: "수업개선 환류 사례 수",
    formula: "수업개선 환류 사례 수",
    dept: "교무처",
    actual: "12건",
    target: 10,
    unit: "건",
    linkedField: "teaching_improvement_feedback_count",
  },
  {
    id: "ltp-11",
    strategy: "창의융합 미래선도형 교육과정 혁신",
    task: "연계전공·융복합전공 개설 및 교과목 운영",
    action: "연계전공 교과목 개설 및 교과목 운영",
    indicator: "연계 교과목 신규 개발 건수",
    formula: "연계 교과목 신규 개발 건수",
    dept: "교무처",
    actual: "3건",
    target: 2,
    unit: "건",
  },
];

export const LTP_ROWS: LtpRow[] = LTP_ROWS_BASE.map((r) => ({
  ...r,
  years: ltpYearSeries(r.actual),
}));

// ---------------------------------------------------------------------------
// 4) 대학기관평가인증 — 교육혁신처 관련 발췌 (2023년~)
// ---------------------------------------------------------------------------
const EVALUATION_ROWS_BASE: Omit<EvaluationRow, "years">[] = [
  {
    id: "eval-01",
    area: "교육과정 운영 및 개선",
    item: "교육과정의 다양화·특성화",
    material: "에듀테크 활용 교과목 운영 현황",
    dept: "교육혁신처",
    relatedPerformance: "에듀테크 기반 수업 운영 교과목 수 18개",
    evidenceStatus: "제출완료",
    linkedField: "edutech_course_count",
  },
  {
    id: "eval-02",
    area: "교수학습 지원 체계",
    item: "학습관리시스템(LMS) 운영 실적",
    material: "LMS 활용 교과목 현황",
    dept: "교육혁신처",
    relatedPerformance: "LMS 활용 교과목 수 156개",
    evidenceStatus: "제출완료",
    linkedField: "lms_course_count",
  },
  {
    id: "eval-03",
    area: "교수학습 지원 체계",
    item: "교수법 다양화 및 학습자 중심 수업 운영",
    material: "혁신교수법 적용 교과목 목록 및 강의계획서",
    dept: "교육혁신처",
    relatedPerformance: "혁신교수법 적용 교과목 수 24개",
    evidenceStatus: "준비중",
    linkedField: "innovative_teaching_course_count",
  },
  {
    id: "eval-04",
    area: "교수학습 지원 체계",
    item: "교원 교수역량 개발 지원",
    material: "워크숍 운영계획 및 결과보고서",
    dept: "교수학습개발원",
    relatedPerformance: "교수법 워크숍 6건 · 참여 교원 86명",
    evidenceStatus: "제출완료",
    linkedField: "teaching_workshop_count",
  },
  {
    id: "eval-05",
    area: "학생역량 관리",
    item: "학생 핵심역량 진단·관리 체계",
    material: "역량진단 결과보고서",
    dept: "혁신성과관리센터(IR)",
    relatedPerformance: "학생역량 진단 참여 학생 수 246명",
    evidenceStatus: "준비중",
    linkedField: "student_competency_diagnosis_count",
  },
  {
    id: "eval-06",
    area: "학생역량 관리",
    item: "비교과 교육과정 운영 실적",
    material: "비교과 프로그램 참여자 명단",
    dept: "학생처",
    relatedPerformance: "비교과 프로그램 참여 학생 수 418명",
    evidenceStatus: "제출완료",
    linkedField: "extracurricular_program_participant_count",
  },
  {
    id: "eval-07",
    area: "교육성과 분석 및 환류",
    item: "강의평가 및 CQI 환류체계 운영",
    material: "CQI 보고서",
    dept: "교육혁신처",
    relatedPerformance: "CQI 보고서 제출 교과목 수 132개",
    evidenceStatus: "제출완료",
    linkedField: "cqi_report_count",
  },
  {
    id: "eval-08",
    area: "교육성과 분석 및 환류",
    item: "교육성과 분석체계 구축·운영",
    material: "교육성과 분석 보고서",
    dept: "혁신성과관리센터(IR)",
    relatedPerformance: "교육성과 분석보고서 작성 건수 4건",
    evidenceStatus: "미착수",
    linkedField: "education_outcome_report_count",
  },
  {
    id: "eval-09",
    area: "교육성과 분석 및 환류",
    item: "환류 결과의 활용 실적",
    material: "수업개선 사례집",
    dept: "교무처",
    relatedPerformance: "수업개선 환류 사례 수 12건",
    evidenceStatus: "준비중",
    linkedField: "teaching_improvement_feedback_count",
  },
  {
    id: "eval-10",
    area: "교육여건 및 재정",
    item: "교육시설 및 기자재 확보 실적",
    material: "실습·강의 기자재 현황",
    dept: "기획실",
    relatedPerformance: "-",
    evidenceStatus: "준비중",
  },
];

export const EVALUATION_ROWS: EvaluationRow[] = EVALUATION_ROWS_BASE.map((r) => ({
  ...r,
  years: evalYearSeries(r.relatedPerformance, r.evidenceStatus),
}));

// ---------------------------------------------------------------------------
// 5) 관리 자료 3종 요약
// ---------------------------------------------------------------------------
// 항상 "장기발전계획 → 대학기관평가인증 → 대학혁신지원사업" 순서로 노출
export const REPORT_SUMMARIES = [
  {
    key: "ltp",
    title: "장기발전계획",
    description: "장신비전 2030 4단계 · 2023~2026년 · 교육혁신처 실행과제 11개",
    href: "/long-term-plan",
    total: LTP_ROWS.length,
    linked: LTP_ROWS.filter((r) => r.linkedField).length,
    accent: "navy",
  },
  {
    key: "evaluation",
    title: "대학기관평가인증",
    description: "2023~2026년 · 4개 평가영역 10개 항목 · 증빙 준비 현황 포함",
    href: "/evaluation",
    total: EVALUATION_ROWS.length,
    linked: EVALUATION_ROWS.filter((r) => r.linkedField).length,
    accent: "maroon",
  },
  {
    key: "uisp",
    title: "대학혁신지원사업",
    description: "2025~2026년 · 자율성과지표 A~D 18개 지표 · 교육혁신처 연계 7개",
    href: "/uisp",
    total: UISP_INDICATORS.length,
    linked: UISP_INDICATORS.filter((r) => r.linkedField).length,
    accent: "gold",
  },
] as const;

// ---------------------------------------------------------------------------
// 6) 문서형 보기 — HWP/Excel 문서를 웹으로 옮긴 형태 (2026년 최신 자료 기준)
//    항상 "장기발전계획 → 대학기관평가인증 → 대학혁신지원사업" 순서로 노출
// ---------------------------------------------------------------------------
export const DOCUMENTS: DocumentDef[] = [
  {
    key: "ltp",
    title: "장신비전 2030 4단계 장기발전계획 추진실적표",
    subtitle: "교육혁신처 (발췌) · 2026년 기준",
    owner: "교육혁신처",
    updatedAt: "2026-07-01",
    sections: [
      {
        title: "창의융합 미래선도형 교육과정 혁신",
        columns: [
          "추진과제",
          "실행과제",
          "성과지표",
          "지표산식",
          "담당부서",
          "목푯값",
          "실적",
          "달성률",
        ],
        rows: LTP_ROWS.map((r) => [
          r.task,
          r.action,
          r.indicator,
          r.formula,
          r.dept,
          `${r.target}${r.unit}`,
          r.actual,
          `${Math.round((r.years.find((y) => y.year === CURRENT_YEAR)!.actualValue / r.target) * 100)}%`,
        ]),
        linkedFieldColumnIndex: 2,
        linkedRows: LTP_ROWS.map((r) => Boolean(r.linkedField)),
      },
    ],
  },
  {
    key: "evaluation",
    title: "대학기관평가인증 자체진단 보고서",
    subtitle: "교육과정·교수학습·학생역량·성과환류 영역 (발췌) · 2026년 기준",
    owner: "혁신성과관리센터(IR)",
    updatedAt: "2026-06-28",
    sections: [
      {
        title: "평가영역별 요구자료 및 증빙 현황",
        columns: ["평가영역", "평가항목", "요구자료", "담당부서", "관련 실적", "증빙상태"],
        rows: EVALUATION_ROWS.map((r) => [
          r.area,
          r.item,
          r.material,
          r.dept,
          r.relatedPerformance,
          r.evidenceStatus,
        ]),
        linkedFieldColumnIndex: 1,
        linkedRows: EVALUATION_ROWS.map((r) => Boolean(r.linkedField)),
      },
    ],
  },
  {
    key: "uisp",
    title: "2026년 대학혁신지원사업 자율성과지표 실적표",
    subtitle: "uisp.vercel.app · 지표 상세 (발췌) · 대학(학부) 몫만 반영",
    owner: "교육혁신처",
    updatedAt: "2026-07-03",
    sections: [
      {
        title: "C. PUTS형 교육혁신 지수",
        columns: ["코드", "지표명", "담당부서", "기준값", "목푯값", "실적값", "달성도"],
        rows: UISP_INDICATORS.filter((r) => r.area === "C").map((r) => [
          r.code,
          r.indicator,
          r.dept,
          `${r.baseline}${r.unit}`,
          `${r.target}${r.unit}`,
          `${r.actual}${r.unit}`,
          `${Math.round((r.actual / r.target) * 100)}%`,
        ]),
        linkedFieldColumnIndex: 1,
        linkedRows: UISP_INDICATORS.filter((r) => r.area === "C").map((r) => Boolean(r.linkedField)),
      },
      {
        title: "D. 교육환경 고도화 지수",
        columns: ["코드", "지표명", "담당부서", "기준값", "목푯값", "실적값", "달성도"],
        rows: UISP_INDICATORS.filter((r) => r.area === "D").map((r) => [
          r.code,
          r.indicator,
          r.dept,
          `${r.baseline}${r.unit}`,
          `${r.target}${r.unit}`,
          `${r.actual}${r.unit}`,
          `${Math.round((r.actual / r.target) * 100)}%`,
        ]),
        linkedFieldColumnIndex: 1,
        linkedRows: UISP_INDICATORS.filter((r) => r.area === "D").map((r) => Boolean(r.linkedField)),
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 7) 최근 연결 예시 (통합 현황 하단 표)
// ---------------------------------------------------------------------------
export const RECENT_LINKS = COMMON_INDICATORS.slice(0, 5).map((c) => ({
  sourceLabel: c.sourceLabel,
  value: `${c.value}${c.unit}`,
  dept: c.dept,
  uisp: c.uisp?.indicator ?? "미연계",
  ltp: c.ltp.indicator,
  evaluation: c.evaluation.item,
}));
