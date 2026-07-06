"use client";

import { useMemo, useState } from "react";
import { COMMON_INDICATORS, undergradTotal, DIVISIONS, UNDERGRAD_DIVISIONS } from "@/lib/mock-data";
import type { Division, MetricKind } from "@/lib/types";

type ByDivisionState = Record<string, Record<Division, number>>;
type TotalState = Record<string, number>;

const COL_LABEL: Record<Division, string> = {
  신학과: "신학과",
  기독교교육과: "기독교교육과",
  교회음악학과: "교회음악학과",
  자유전공: "자유전공",
  신대원: "신대원",
  대학원: "대학원",
};

// 대학(학부) 4개 학과 / 신대원 / 대학원 — "학생 수" 안에서의 세 소속 구분
const GROUPS: { label: string; divisions: Division[]; tone: string }[] = [
  { label: "대학", divisions: UNDERGRAD_DIVISIONS, tone: "bg-gold-soft text-gold" },
  { label: "신대원", divisions: ["신대원"], tone: "bg-navy-soft text-navy" },
  { label: "대학원", divisions: ["대학원"], tone: "bg-maroon-soft text-maroon" },
];

// 소속별 인원 분포 개념이 있는 "학생 수" 항목만 소속별로 나눠 입력하고,
// "교원 수"·"건수" 항목은 소속 구분이 없어 각각의 전용 칸에 총계로 입력한다.
const STUDENT_FIELDS = COMMON_INDICATORS.filter((c) => c.metricKind === "학생 수").map((c) => c.field);
const METRIC_KIND_OF: Record<string, MetricKind> = Object.fromEntries(
  COMMON_INDICATORS.map((c) => [c.field, c.metricKind])
);

function snapshotOf(byDivision: ByDivisionState, totals: TotalState) {
  return JSON.stringify({ byDivision, totals });
}

const ORIGINAL_BY_DIVISION: ByDivisionState = Object.fromEntries(
  COMMON_INDICATORS.filter((c) => STUDENT_FIELDS.includes(c.field)).map((c) => [c.field, { ...c.byDivision }])
);
const ORIGINAL_TOTALS: TotalState = Object.fromEntries(
  COMMON_INDICATORS.filter((c) => !STUDENT_FIELDS.includes(c.field)).map((c) => [c.field, c.value])
);
const ORIGINAL_SNAPSHOT = snapshotOf(ORIGINAL_BY_DIVISION, ORIGINAL_TOTALS);

// 학생 수 / 교원 수 / 건수 / 전체 합계 — 네 그룹을 구분하는 굵은 세로선
const GROUP_DIVIDER = "border-l-2 border-ink/20";

// 대학/신대원/대학원 각 소속 칸에 옅은 색을 입혀 헤더 아래로도 구분이 이어지도록 함
const DIVISION_BODY_TONE: Record<Division, string> = {
  신학과: "bg-gold-soft/25",
  기독교교육과: "bg-gold-soft/25",
  교회음악학과: "bg-gold-soft/25",
  자유전공: "bg-gold-soft/25",
  신대원: "bg-navy-soft/40 border-l-2 border-line",
  대학원: "bg-maroon-soft/40 border-l-2 border-line",
};

function EmptyCell() {
  return <span className="text-muted/40">—</span>;
}

export function DivisionBreakdownTable() {
  const [byDivision, setByDivision] = useState<ByDivisionState>(() => ({ ...ORIGINAL_BY_DIVISION }));
  const [totals, setTotals] = useState<TotalState>(() => ({ ...ORIGINAL_TOTALS }));
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);

  const currentSnapshot = useMemo(() => snapshotOf(byDivision, totals), [byDivision, totals]);
  const isDirtyFromOriginal = currentSnapshot !== ORIGINAL_SNAPSHOT;
  const hasUnsavedChanges =
    savedSnapshot === null ? isDirtyFromOriginal : currentSnapshot !== savedSnapshot;

  function parseNumber(raw: string) {
    return Math.max(0, Number(raw.replace(/[^0-9]/g, "")) || 0);
  }

  function setCell(field: string, division: Division, raw: string) {
    const n = parseNumber(raw);
    setByDivision((prev) => ({ ...prev, [field]: { ...prev[field], [division]: n } }));
  }

  function setTotal(field: string, raw: string) {
    const n = parseNumber(raw);
    setTotals((prev) => ({ ...prev, [field]: n }));
  }

  function reset() {
    setByDivision({ ...ORIGINAL_BY_DIVISION });
    setTotals({ ...ORIGINAL_TOTALS });
    setSavedSnapshot(null);
  }

  function save() {
    setSavedSnapshot(currentSnapshot);
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full min-w-[1180px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th rowSpan={3} className="border-b border-line bg-line/40 px-4 py-2.5 font-medium align-bottom">
                공통 데이터 항목
              </th>
              <th colSpan={7} className="border-b border-line bg-line/60 px-2 py-1.5 text-center font-semibold text-ink/70">
                학생 수
              </th>
              <th rowSpan={3} className={`border-b border-line bg-line/40 px-3 py-2.5 text-right font-medium align-bottom ${GROUP_DIVIDER}`}>
                교원 수
              </th>
              <th rowSpan={3} className={`border-b border-line bg-line/40 px-3 py-2.5 text-right font-medium align-bottom ${GROUP_DIVIDER}`}>
                건수
              </th>
              <th rowSpan={3} className={`border-b border-line bg-line/40 px-4 py-2.5 text-right font-medium align-bottom ${GROUP_DIVIDER}`}>
                전체 합계
              </th>
            </tr>
            <tr className="text-left text-xs text-muted">
              {GROUPS.map((g) => (
                <th
                  key={g.label}
                  rowSpan={g.label === "대학" ? 1 : 2}
                  colSpan={g.divisions.length}
                  className={`border-b border-line px-2 py-1.5 text-center font-semibold ${
                    g.label === "대학" ? "" : "border-l-2 border-line"
                  } ${g.tone}`}
                >
                  {g.label}
                </th>
              ))}
              <th rowSpan={2} className="border-b border-x border-line bg-gold-soft px-4 py-1.5 text-right font-semibold text-gold align-bottom">
                대학(학부) 합계
              </th>
            </tr>
            <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
              {UNDERGRAD_DIVISIONS.map((d) => (
                <th key={d} className="px-2 py-2 font-medium text-right">
                  {COL_LABEL[d]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMMON_INDICATORS.map((c) => {
              const kind = METRIC_KIND_OF[c.field];
              const isStudentField = kind === "학생 수";
              const isFacultyField = kind === "교원 수";
              const isCountField = kind === "건수";
              return (
                <tr key={c.field} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-ink">{c.sourceLabel}</p>
                    <p className="mt-0.5 text-xs text-muted/70">
                      {c.dept} · {c.metricKind}
                    </p>
                  </td>
                  {DIVISIONS.map((d) => (
                    <td key={d} className={`px-2 py-2.5 text-right ${DIVISION_BODY_TONE[d]}`}>
                      {isStudentField ? (
                        <div className="flex items-center justify-end gap-1">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={byDivision[c.field][d]}
                            onChange={(e) => setCell(c.field, d, e.target.value)}
                            className="w-14 rounded border border-line bg-paper px-1.5 py-1 text-right text-sm text-ink tabular-nums focus:border-navy focus:outline-none"
                          />
                          <span className="text-xs text-muted/70">{c.unit}</span>
                        </div>
                      ) : (
                        <EmptyCell />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-gold">
                    {isStudentField ? (
                      <>
                        {undergradTotal(byDivision[c.field])}
                        {c.unit}
                      </>
                    ) : (
                      <EmptyCell />
                    )}
                  </td>
                  <td className={`px-3 py-2.5 text-right ${GROUP_DIVIDER}`}>
                    {isFacultyField ? (
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={totals[c.field]}
                          onChange={(e) => setTotal(c.field, e.target.value)}
                          className="w-16 rounded border border-line bg-paper px-1.5 py-1 text-right text-sm text-ink tabular-nums focus:border-navy focus:outline-none"
                        />
                        <span className="text-xs text-muted/70">{c.unit}</span>
                      </div>
                    ) : (
                      <EmptyCell />
                    )}
                  </td>
                  <td className={`px-3 py-2.5 text-right ${GROUP_DIVIDER}`}>
                    {isCountField ? (
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={totals[c.field]}
                          onChange={(e) => setTotal(c.field, e.target.value)}
                          className="w-16 rounded border border-line bg-paper px-1.5 py-1 text-right text-sm text-ink tabular-nums focus:border-navy focus:outline-none"
                        />
                        <span className="text-xs text-muted/70">{c.unit}</span>
                      </div>
                    ) : (
                      <EmptyCell />
                    )}
                  </td>
                  <td className={`px-4 py-2.5 text-right font-medium tabular-nums text-ink ${GROUP_DIVIDER}`}>
                    {isStudentField
                      ? DIVISIONS.reduce((sum, d) => sum + byDivision[c.field][d], 0)
                      : totals[c.field]}
                    {c.unit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-ink"
        >
          입력 저장
        </button>
        {isDirtyFromOriginal && (
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium text-muted hover:border-ink/25"
          >
            원래 값으로 되돌리기
          </button>
        )}
        {savedSnapshot !== null && !hasUnsavedChanges && (
          <span className="text-xs text-[#3f6b3f]">
            저장되었습니다 — 대학(학부) 합계가 대학혁신지원사업 화면에 반영됩니다.
          </span>
        )}
        {savedSnapshot !== null && hasUnsavedChanges && (
          <span className="text-xs text-gold">값이 변경되었습니다. 다시 저장해주세요.</span>
        )}
      </div>
    </div>
  );
}
