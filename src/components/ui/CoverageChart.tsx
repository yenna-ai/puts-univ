"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REPORT_SUMMARIES } from "@/lib/mock-data";

const DATA = REPORT_SUMMARIES.map((r) => ({
  name: r.title,
  연계됨: r.linked,
  개별입력: r.total - r.linked,
  total: r.total,
}));

const LINKED_COLOR = "#2a4368";
const UNLINKED_COLOR = "#b8afa1";

function totalLabelAccessor(entry: { payload: (typeof DATA)[number] }) {
  const row = entry.payload;
  return `${row.total}개 중 ${row.연계됨}개 연계`;
}

export function CoverageChart() {
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={DATA}
          layout="vertical"
          barSize={26}
          margin={{ top: 8, right: 140, left: 0, bottom: 8 }}
        >
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
            formatter={(value, name) => [`${value}개`, name]}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#e6ded0",
              fontSize: 12,
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={28}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#8a8172" }}
          />
          <Bar dataKey="연계됨" stackId="coverage" fill={LINKED_COLOR} radius={[4, 0, 0, 4]} name="교육혁신처 데이터 연계" />
          <Bar dataKey="개별입력" stackId="coverage" fill={UNLINKED_COLOR} radius={[0, 4, 4, 0]} name="개별 입력">
            <LabelList
              position="right"
              valueAccessor={totalLabelAccessor}
              style={{ fontSize: 12, fontWeight: 600, fill: "#16233d" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
