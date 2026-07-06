// 공통 실적 데이터(교육혁신처 기준)와 3개 장표(장기발전계획/대학기관평가인증/대학혁신지원사업)의
// 연계 구조, 연도별 이력, 소속(대학/신대원/대학원) 구분을 표현하는 타입

export type ReportKind = "ltp" | "evaluation" | "uisp";

/** 보고 주기 상태: 완료된 과거 연도인지, 아직 입력 중인 현재 연도인지 */
export type YearStatus = "완료" | "입력가능";

/** 소속 구분. 대학(학부)은 3개 학과로 세분화하고, 신대원·대학원은 별도 과정 */
export type Division = "신학과" | "기독교교육과" | "교회음악학과" | "신대원" | "대학원";

export interface CommonIndicator {
  /** 공통 데이터 필드명 (DB 컬럼명 느낌) */
  field: string;
  /** 교육혁신처가 실제로 입력하는 실적명 */
  sourceLabel: string;
  /** 실적 값 (전체 소속 합계) */
  value: number;
  /** 단위 */
  unit: string;
  /** 입력 부서 */
  dept: string;
  /** 기준 학기/연도 */
  period: string;
  /** 이 실적이 속하는 4대 연계 그룹 */
  group: "에듀테크·혁신교수법" | "교수역량 워크숍" | "학생역량·비교과" | "성과분석·환류";
  /** 소속(대학 3개 학과/신대원/대학원)별 실적 분포. 합계는 value와 같음 */
  byDivision: Record<Division, number>;
  /** uisp.vercel.app(대학혁신지원사업 실적관리) 자율성과지표와의 연결. 실제 지표가 없으면 undefined */
  uisp?: {
    area: string; // A/B/C/D 자율성과지표
    code: string; // 지표 코드 (예: C111)
    indicator: string; // 지표명
  };
  ltp: {
    strategy: string; // 추진전략
    task: string; // 추진과제
    action: string; // 실행과제
    indicator: string; // 성과지표
  };
  evaluation: {
    area: string; // 평가영역
    item: string; // 평가항목
    material: string; // 요구자료
  };
}

export type UispStatus = "초과달성" | "달성" | "미달" | "진행중";

export interface UispYearData {
  year: number;
  baseline: number;
  target: number;
  actual: number;
  status: YearStatus;
}

export interface UispIndicatorRow {
  id: string;
  area: "A" | "B" | "C" | "D";
  code: string; // 지표 코드 (예: C111, D21)
  indicator: string; // 지표명
  dept: string; // 담당부서
  baseline: number; // 기준값 (최신 연도)
  target: number; // 목푯값 (최신 연도)
  actual: number; // 실적값 (최신 연도)
  unit: string;
  linkedField?: string; // 공통 데이터 필드와 연결된 경우 (최신 연도에 한해 자동 연계)
  years: UispYearData[]; // 연도별 이력 (2025~)
}

export interface LtpYearData {
  year: number;
  actual: string;
  actualValue: number;
  status: YearStatus;
}

export interface LtpRow {
  id: string;
  strategy: string;
  task: string;
  action: string;
  indicator: string;
  formula: string;
  dept: string;
  actual: string;
  target: number; // 목푯값 (4단계 기간 공통 목표)
  unit: string;
  linkedField?: string;
  years: LtpYearData[]; // 연도별 이력 (2023~)
}

export type EvidenceStatus = "제출완료" | "준비중" | "미착수";

export interface EvaluationYearData {
  year: number;
  relatedPerformance: string;
  evidenceStatus: EvidenceStatus;
  status: YearStatus;
}

export interface EvaluationRow {
  id: string;
  area: string;
  item: string;
  material: string;
  dept: string;
  relatedPerformance: string;
  evidenceStatus: EvidenceStatus;
  linkedField?: string;
  years: EvaluationYearData[]; // 연도별 이력 (2023~)
}

export interface DocumentSection {
  title: string;
  description?: string;
  columns: string[];
  rows: (string | number)[][];
  linkedFieldColumnIndex?: number;
  /** rows[i]가 실제로 교육혁신처 공통 데이터와 연결된 행인지 여부 (linkedFieldColumnIndex와 함께 사용) */
  linkedRows?: boolean[];
}

export interface DocumentDef {
  key: string;
  title: string;
  subtitle: string;
  owner: string;
  updatedAt: string;
  sections: DocumentSection[];
}
