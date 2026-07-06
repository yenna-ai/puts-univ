import type { DocumentDef } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

export function DocumentView({ doc }: { doc: DocumentDef }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-xs font-medium text-slate-400">{doc.subtitle}</p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{doc.title}</h2>
        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
          <span>작성부서: {doc.owner}</span>
          <span>·</span>
          <span>최종수정: {doc.updatedAt}</span>
        </div>
      </div>

      <div className="space-y-8 px-6 py-6">
        {doc.sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span className="h-3.5 w-1 rounded-full bg-blue-600" />
              {section.title}
            </h3>
            {section.description && (
              <p className="mb-2 text-xs text-slate-500">{section.description}</p>
            )}
            <div className="overflow-x-auto rounded-md border border-slate-200">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                    {section.columns.map((col) => (
                      <th key={col} className="px-3 py-2 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 text-slate-700">
                          {j === section.linkedFieldColumnIndex && section.linkedRows?.[i] ? (
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">{cell}</span>
                              <Badge tone="blue">연계</Badge>
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
