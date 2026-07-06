import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT_MAP: Record<string, { bar: string; chip: string }> = {
  blue: { bar: "bg-blue-600", chip: "bg-blue-50 text-blue-700" },
  indigo: { bar: "bg-indigo-600", chip: "bg-indigo-50 text-indigo-700" },
  teal: { bar: "bg-teal-600", chip: "bg-teal-50 text-teal-700" },
};

export function ProjectCard({
  title,
  description,
  href,
  total,
  linked,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  total: number;
  linked: number;
  accent: "blue" | "indigo" | "teal";
}) {
  const tone = ACCENT_MAP[accent];
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <span className={cn("absolute inset-x-0 top-0 h-1", tone.bar)} />
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
      </div>
      <p className="mt-1.5 text-xs text-slate-500">{description}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", tone.chip)}>
          지표 {total}개
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          교육혁신처 연계 {linked}개
        </span>
      </div>
    </Link>
  );
}
