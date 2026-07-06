"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  ClipboardCheck,
  Rocket,
  Share2,
  Lock,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileNav } from "@/components/layout/MobileNavContext";

const NAV_ITEMS = [
  { href: "/", label: "통합 현황", icon: LayoutDashboard },
  { href: "/long-term-plan", label: "장기발전계획", icon: Target },
  { href: "/evaluation", label: "대학기관평가인증", icon: ClipboardCheck },
  { href: "/uisp", label: "대학혁신지원사업", icon: Rocket },
  { href: "/data-mapping", label: "실적 입력 예시", icon: Share2 },
];

const DISABLED_ITEMS = ["사용자 관리", "승인 관리"];

export function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useMobileNav();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full w-72 shrink-0 flex-col bg-ink text-white transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold text-white">PUTS 통합 성과관리</p>
            <p className="truncate text-[11px] text-white/45">puts-univ.vercel.app · 프로토타입</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-white/50 hover:text-white lg:hidden"
            aria-label="메뉴 닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md border-l-2 px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-gold bg-card/[0.06] text-gold"
                    : "border-transparent text-white/65 hover:bg-card/[0.04] hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 border-t border-white/10 pt-4">
            {DISABLED_ITEMS.map((label) => (
              <div
                key={label}
                className="flex cursor-not-allowed items-center gap-2.5 rounded-md border-l-2 border-transparent px-3 py-2 text-sm text-white/25"
              >
                <Lock className="h-4 w-4 shrink-0" />
                {label}
                <span className="ml-auto rounded bg-card/[0.06] px-1.5 py-0.5 text-[10px] text-white/35">
                  준비중
                </span>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-[11px] leading-relaxed text-white/35">
          본 화면은 예시 데이터를 기반으로
          <br />
          구성한 화면입니다.
        </div>
      </aside>
    </>
  );
}
