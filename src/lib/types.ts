// 공통 실적 데이터(교육혁신처 기준)와 3개 장표(대학혁신지원사업/장기발전계획/대학평가) 연계 구조를 표현하는 타입

export type ReportKind = "uisp" | "ltp" | "evaluation";

export interface CommonIndicator {
  /** 공통 데이터 필드명 (DB 컬럼명 느낌) */
  field: string;
  /** 교육혁신처가 실제로 입력하는 실적명 */
  sourceLabel: string;
  /** 실적 값 */
  value: number;
  /** 단위 */
  unit: string;
  /** 입력 부서 */
  dept: string;
  /** 기준 학기/연도 */
  period: string;
  /** 이 실적이 속하는 4대 연계 그룹 */
  group: "에듀테크·혁신교수법" | "교수역량 워크숍" | "학생역량·비교과" | "성과분석·환류";
  uisp: {
    area: string; // A/B/C/D 영역
    task: string; // 세부 사업
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

export interface UispIndicatorRow {
  id: string;
  area: "A" | "B" | "C" | "D";
  areaName: string;
  task: string;
  indicator: string;
  dept: string;
  target: number;
  actual: number;
  unit: string;
  linkedField?: string; // 공통 데이터 필드와 연결된 경우
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
  linkedField?: string;
}

export interface EvaluationRow {
  id: string;
  area: string;
  item: string;
  material: string;
  dept: string;
  relatedPerformance: string;
  evidenceStatus: "제출완료" | "준비중" | "미착수";
  linkedField?: string;
}

export interface DocumentSection {
  title: string;
  description?: string;
  columns: string[];
  rows: (string | number)[][];
  linkedFieldColumnIndex?: number;
}

export interface DocumentDef {
  key: string;
  title: string;
  subtitle: string;
  owner: string;
  updatedAt: string;
  sections: DocumentSection[];
}
