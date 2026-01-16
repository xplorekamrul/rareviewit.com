import SidebarFrame from "@/components/layout/SidebarFrame";
import type { ReactNode } from "react";
import { Suspense } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <SidebarFrame>{children}</SidebarFrame>
    </Suspense>
  );
}
