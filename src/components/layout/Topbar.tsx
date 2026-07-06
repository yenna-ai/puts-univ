"use client";

import { Menu } from "lucide-react";
import { CURRENT_PERIOD } from "@/lib/mock-data";
import { useMobileNav } from "@/components/layout/MobileNavContext";

export function Topbar({ title, description }: { title: string; description?: string }) {
  const { setOpen } = useMobileNav();

  return (
    <header className="flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line bg-card px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-start gap-3">
        <button
          onClick={() => setOpen(true)}
          className="mt-0.5 shrink-0 text-ink/60 hover:text-ink lg:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="font-serif text-lg font-semibold text-ink">{title}</h1>
          {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
        </div>
      </div>
      <div className="hidden shrink-0 text-right text-xs text-muted sm:block">
        <p>기준: {CURRENT_PERIOD}</p>
        <p>작성: 교육혁신처</p>
      </div>
    </header>
  );
}
