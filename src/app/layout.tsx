import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavProvider } from "@/components/layout/MobileNavContext";

export const metadata: Metadata = {
  title: "PUTS 통합 성과관리 (프로토타입)",
  description:
    "장기발전계획·대학기관평가인증·대학혁신지원사업 실적 데이터를 한 번 입력해 세 자료에서 함께 활용하는 통합 성과관리 화면 시안",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full bg-paper text-foreground antialiased">
        <MobileNavProvider>
          <div className="flex h-full">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </MobileNavProvider>
      </body>
    </html>
  );
}
