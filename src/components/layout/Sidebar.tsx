"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  ClipboardCheck,
  Rocket,
  Share2,
  FileText,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "통합 현황", icon: LayoutDashboard },
  { href: "/long-term-plan", label: "장기발전계획", icon: Target },
  { href: "/evaluation", label: "대학기관평가인증", icon: ClipboardCheck },
  { href: "/uisp", label: "대학혁신지원사업", icon: Rocket },
  { href: "/data-mapping", label: "교육혁신처 데이터 연계", icon: Share2 },
  { href: "/documents", label: "문서형 보기", icon: FileText },
];

const DISABLED_ITEMS = ["사용자 관리", "승인 관리"];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-700 text-sm font-bold text-white">
          P
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-900">PUTS 통합 성과관리</p>
          <p className="text-[11px] text-slate-400">puts-univ.vercel.app · 프로토타입</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-4 border-t border-slate-100 pt-4">
          {DISABLED_ITEMS.map((label) => (
            <div
              key={label}
              className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-300"
            >
              <Lock className="h-4 w-4 shrink-0" />
              {label}
              <span className="ml-auto rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">
                준비중
              </span>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-200 px-5 py-4 text-[11px] leading-relaxed text-slate-400">
        본 화면은 더미 데이터 기반
        <br />
        프로토타입입니다.
      </div>
    </aside>
  );
}
