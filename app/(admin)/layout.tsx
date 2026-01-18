import SidebarFrame from "@/components/layout/SidebarFrame";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminProviders } from "./providers";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProviders>
      <Suspense fallback={<div className="h-screen" />}>
        <SidebarFrame>{children}</SidebarFrame>
      </Suspense>
    </AdminProviders>
  );
}
