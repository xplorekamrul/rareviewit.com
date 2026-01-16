// /app/(auth)/forgot/verify/page.tsx
import AuthCard from "@/components/auth/AuthCard";
import ForgotVerifyForm from "@/components/auth/ForgotVerifyForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Verify code" };

async function VerifyContent({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const sp = await searchParams;
  const email = sp?.email ?? "";

  return (
    <AuthCard title="Verify code" subtitle="Enter the 6-digit code we sent to your email">
      <ForgotVerifyForm defaultEmail={email} />
    </AuthCard>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  return (
    <main className="min-h-screen bg-light dark:bg-background grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="h-64" />}>
          <VerifyContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
