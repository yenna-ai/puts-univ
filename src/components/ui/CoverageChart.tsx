"use client";

import { Bar, BarChart, CartesianGrid, Legend, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { REPORT_SUMMARIES } from "@/lib/mock-data";

const INPUT_RATE_COLOR = "#2a4368";
const ATTAINMENT_COLOR = "#9c6b23";

const DATA = REPORT_SUMMARIES.map((r) => ({
  name: r.title,
  입력률: r.inputRate,
  평균달성도: r.avgAttainment,
}));

function percentLabel(value: unknown) {
  return typeof value === "number" ? `${value}%` : "";
}

export function CoverageChart() {
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={DATA} layout="vertical" barGap={4} margin={{ top: 8, right: 48, left: 0, bottom: 8 }}>
          <CartesianGrid horizontal={false} stroke="#e6ded0" />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#16233d" }}
          />
          <Tooltip
            formatter={(value) => (typeof value === "number" ? `${value}%` : "해당 없음")}
            contentStyle={{ borderRadius: 8, borderColor: "#e6ded0", fontSize: 12 }}
          />
          <Legend
            verticalAlign="bottom"
            height={28}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#8a8172" }}
          />
          <Bar dataKey="입력률" fill={INPUT_RATE_COLOR} radius={[0, 4, 4, 0]} barSize={14} name="입력률(실적 반영 비율)">
            <LabelList dataKey="입력률" position="right" formatter={percentLabel} style={{ fontSize: 11, fill: "#16233d" }} />
          </Bar>
          <Bar dataKey="평균달성도" fill={ATTAINMENT_COLOR} radius={[0, 4, 4, 0]} barSize={14} name="평균 달성도(목표 대비)">
            <LabelList dataKey="평균달성도" position="right" formatter={percentLabel} style={{ fontSize: 11, fill: "#16233d" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-1 text-[11px] text-muted/60">
        대학기관평가인증은 목표/실적 수치가 아닌 증빙 제출 현황으로 관리되어 평균 달성도가 없습니다.
      </p>
    </div>
  );
}
