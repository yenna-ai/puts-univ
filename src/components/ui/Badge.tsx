import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "muted" | "ink" | "green" | "amber" | "red";
  className?: string;
}) {
  const toneMap: Record<string, string> = {
    muted: "bg-line/60 text-muted",
    ink: "bg-navy-soft text-navy ring-1 ring-inset ring-navy/15",
    green: "bg-[#e7efe4] text-[#3f6b3f]",
    amber: "bg-gold-soft text-gold",
    red: "bg-maroon-soft text-maroon",
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
    <Badge tone="ink">
      <span className="h-1.5 w-1.5 rounded-full bg-navy" />
      교육혁신처 연계
    </Badge>
  );
}
