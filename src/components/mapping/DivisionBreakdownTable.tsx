"use client";

import { useMemo, useState } from "react";
import { COMMON_INDICATORS, undergradTotal, DIVISIONS, UNDERGRAD_DIVISIONS } from "@/lib/mock-data";
import type { Division } from "@/lib/types";

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

// 대학(학부) 4개 학과 / 신대원 / 대학원 — 세 개의 큰 소속 구분
const GROUPS: { label: string; divisions: Division[]; tone: string }[] = [
  { label: "대학", divisions: UNDERGRAD_DIVISIONS, tone: "bg-gold-soft text-gold" },
  { label: "신대원", divisions: ["신대원"], tone: "bg-navy-soft text-navy" },
  { label: "대학원", divisions: ["대학원"], tone: "bg-maroon-soft text-maroon" },
];

// 소속별 인원 분포 개념이 있는 "학생 수" 항목만 소속별로 나눠 입력하고,
// "건수"·"교원 수" 항목은 소속 구분이 없어 총계 하나로만 입력한다.
const STUDENT_FIELDS = COMMON_INDICATORS.filter((c) => c.metricKind === "학생 수").map((c) => c.field);
const MERGED_COLSPAN = DIVISIONS.length + 1; // 소속 6칸 + 대학(학부) 합계 칸

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
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th rowSpan={2} className="border-b border-line bg-line/40 px-4 py-2.5 font-medium align-bottom">
                공통 데이터 항목
              </th>
              {GROUPS.map((g) => (
                <th
                  key={g.label}
                  colSpan={g.divisions.length}
                  className={`border-b border-x border-line px-2 py-1.5 text-center font-semibold ${g.tone}`}
                >
                  {g.label}
                </th>
              ))}
              <th rowSpan={2} className="border-b border-line bg-line/40 px-4 py-2.5 text-right font-medium align-bottom text-gold">
                대학(학부) 합계
              </th>
              <th rowSpan={2} className="border-b border-line bg-line/40 px-4 py-2.5 text-right font-medium align-bottom">
                전체 합계
              </th>
            </tr>
            <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
              {DIVISIONS.map((d) => (
                <th key={d} className="px-2 py-2 font-medium text-right">
                  {COL_LABEL[d]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMMON_INDICATORS.map((c) => {
              const isStudentField = STUDENT_FIELDS.includes(c.field);
              return (
                <tr key={c.field} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-ink">{c.sourceLabel}</p>
                    <p className="mt-0.5 text-xs text-muted/70">
                      {c.dept} · {c.metricKind}
                    </p>
                  </td>
                  {isStudentField ? (
                    <>
                      {DIVISIONS.map((d) => (
                        <td key={d} className="px-2 py-2.5 text-right">
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
                        </td>
                      ))}
                      <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-gold">
                        {undergradTotal(byDivision[c.field])}
                        {c.unit}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium tabular-nums text-ink">
                        {DIVISIONS.reduce((sum, d) => sum + byDivision[c.field][d], 0)}
                        {c.unit}
                      </td>
                    </>
                  ) : (
                    <td colSpan={MERGED_COLSPAN} className="px-4 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <span className="mr-auto text-xs text-muted/50">소속 구분 없이 총계로 관리</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={totals[c.field]}
                          onChange={(e) => setTotal(c.field, e.target.value)}
                          className="w-16 rounded border border-line bg-paper px-1.5 py-1 text-right text-sm text-ink tabular-nums focus:border-navy focus:outline-none"
                        />
                        <span className="text-xs text-muted/70">{c.unit}</span>
                      </div>
                    </td>
                  )}
                  {!isStudentField && (
                    <td className="px-4 py-2.5 text-right font-medium tabular-nums text-ink">
                      {totals[c.field]}
                      {c.unit}
                    </td>
                  )}
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
