import type { DocumentDef } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

const ACCENT_BAR: Record<string, string> = {
  ltp: "bg-navy",
  evaluation: "bg-maroon",
  uisp: "bg-gold",
};

export function DocumentView({ doc }: { doc: DocumentDef }) {
  const accentBar = ACCENT_BAR[doc.key] ?? "bg-ink";
  return (
    <div className="rounded-lg border border-line bg-card">
      <div className="border-b border-line px-6 py-5">
        <p className="text-xs font-medium text-muted/70">{doc.subtitle}</p>
        <h2 className="mt-1 font-serif text-xl font-bold text-ink">{doc.title}</h2>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted/70">
          <span>작성부서: {doc.owner}</span>
          <span>·</span>
          <span>최종수정: {doc.updatedAt}</span>
        </div>
      </div>

      <div className="space-y-8 px-6 py-6">
        {doc.sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
              <span className={`h-3.5 w-1 rounded-full ${accentBar}`} />
              {section.title}
            </h3>
            {section.description && (
              <p className="mb-2 text-xs text-muted">{section.description}</p>
            )}
            <div className="overflow-x-auto rounded-md border border-line">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line bg-line/40 text-left text-xs text-muted">
                    {section.columns.map((col) => (
                      <th key={col} className="px-3 py-2 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i} className="border-b border-line/70 last:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 text-ink/80">
                          {j === section.linkedFieldColumnIndex && section.linkedRows?.[i] ? (
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-ink">{cell}</span>
                              <Badge tone="ink">연계</Badge>
                            </div>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
