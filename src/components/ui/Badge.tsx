import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "slate",
  className,
}: {
  children: React.ReactNode;
  tone?: "slate" | "blue" | "green" | "amber" | "red";
  className?: string;
}) {
  const toneMap: Record<string, string> = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function EvidenceBadge({ status }: { status: "제출완료" | "준비중" | "미착수" }) {
  const map = {
    제출완료: "green",
    준비중: "amber",
    미착수: "red",
  } as const;
  return <Badge tone={map[status]}>{status}</Badge>;
}

export function LinkedBadge() {
  return (
    <Badge tone="blue">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
      교육혁신처 연계
    </Badge>
  );
}
