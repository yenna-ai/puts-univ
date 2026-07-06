"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { DocumentView } from "@/components/document/DocumentView";
import { DOCUMENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TAB_ACCENT: Record<string, string> = {
  ltp: "border-navy text-navy",
  evaluation: "border-maroon text-maroon",
  uisp: "border-gold text-gold",
};

export default function DocumentsPage() {
  const [activeKey, setActiveKey] = useState(DOCUMENTS[0].key);
  const activeDoc = DOCUMENTS.find((d) => d.key === activeKey) ?? DOCUMENTS[0];

  return (
    <div className="flex flex-col">
      <Topbar
        title="문서형 보기"
        description="HWP·Excel로 흩어져 있던 자료를 문서 원형 그대로 웹 화면에서 확인합니다"
      />

      <div className="space-y-4 p-6">
        <div className="flex gap-1 border-b border-line">
          {DOCUMENTS.map((doc) => (
            <button
              key={doc.key}
              onClick={() => setActiveKey(doc.key)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                activeKey === doc.key
                  ? TAB_ACCENT[doc.key]
                  : "border-transparent text-muted hover:text-ink"
              )}
            >
              {doc.key === "ltp" && "장기발전계획"}
              {doc.key === "evaluation" && "대학기관평가인증"}
              {doc.key === "uisp" && "대학혁신지원사업"}
            </button>
          ))}
        </div>

        <DocumentView doc={activeDoc} />
      </div>
    </div>
  );
}
