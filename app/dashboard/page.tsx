import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Role = "DEVELOPER" | "SUPER_ADMIN" | "ADMIN" | "USER";

const ROLE_HOME: Record<Role, string> = {
   SUPER_ADMIN: "/super-admin",
   DEVELOPER: "/developer",
   ADMIN: "/admin",
   USER: "/",
};

async function DashboardRedirect() {
   const session = await auth();

   if (!session || !session.user) {
      redirect("/login");
   }

   const role = (session.user.role || "USER") as Role;
   const target = ROLE_HOME[role] || "/";

   redirect(target);
}

export default function DashboardPage() {
   return (
      <Suspense>
         <DashboardRedirect />
      </Suspense>
   );
}
