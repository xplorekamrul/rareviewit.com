import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const sp = await searchParams;
  const callbackUrl = sp?.callbackUrl ?? "/dashboard";

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to continue">
      <LoginForm callbackUrl={callbackUrl} />
    </AuthCard>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  return (
    <main className="min-h-screen bg-light dark:bg-background grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="h-64" />}>
          <LoginContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
