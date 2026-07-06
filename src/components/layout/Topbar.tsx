import { CURRENT_PERIOD } from "@/lib/mock-data";

export function Topbar({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        {description && (
          <p className="text-xs text-slate-500">{description}</p>
        )}
      </div>
      <div className="text-right text-xs text-slate-400">
        <p>기준: {CURRENT_PERIOD}</p>
        <p>작성: 교육혁신처</p>
      </div>
    </header>
  );
}
