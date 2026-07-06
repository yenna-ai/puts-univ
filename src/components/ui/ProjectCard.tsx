import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT_MAP: Record<string, { bar: string; chip: string }> = {
  navy: { bar: "bg-navy", chip: "bg-navy-soft text-navy" },
  maroon: { bar: "bg-maroon", chip: "bg-maroon-soft text-maroon" },
  gold: { bar: "bg-gold", chip: "bg-gold-soft text-gold" },
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
  accent: "navy" | "maroon" | "gold";
}) {
  const tone = ACCENT_MAP[accent];
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-card p-5 shadow-[0_1px_2px_rgba(22,35,61,0.04)] transition-shadow hover:shadow-md"
    >
      <span className={cn("absolute inset-x-0 top-0 h-1", tone.bar)} />
      <div className="flex items-start justify-between">
        <h3 className="font-serif text-base font-semibold text-ink">{title}</h3>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
      <p className="mt-1.5 text-xs text-muted">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", tone.chip)}>
          지표 {total}개
        </span>
        <span className="rounded-full bg-line/50 px-2.5 py-1 text-xs font-medium text-muted">
          교육혁신처 연계 {linked}개
        </span>
      </div>
    </Link>
  );
}
