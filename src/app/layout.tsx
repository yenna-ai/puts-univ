import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "PUTS 통합 성과관리 (프로토타입)",
  description:
    "대학혁신지원사업·장기발전계획·대학평가 실적 데이터를 한 번 입력해 세 자료에서 함께 활용하는 통합 성과관리 화면 시안",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 antialiased">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
