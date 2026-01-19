import { SubmissionCard } from '@/components/admin/submission-card'
import { SubmissionsFilter } from '@/components/admin/submissions-filter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { connection } from 'next/server'
import { Suspense } from 'react'

export const metadata = {
  title: 'Contact Submissions',
  description: 'View and manage contact form submissions',
}

async function StatsCards() {
  // Defer to request time
  await connection()

  const stats = {
    total: await (prisma as any).contactSubmission.count(),
    pending: await (prisma as any).contactSubmission.count({ where: { status: 'PENDING' } }),
    resolved: await (prisma as any).contactSubmission.count({ where: { status: 'RESOLVED' } }),
    emailFailed: await (prisma as any).contactSubmission.count({ where: { emailSent: false } }),
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Resolved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Email Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.emailFailed}</div>
        </CardContent>
      </Card>
    </div>
  )
}

async function SubmissionsList({ filter }: { filter?: string }) {
  // Defer to request time
  await connection()

  const whereClause = filter && filter !== 'all' ? { status: filter } : {}

  const submissions = await (prisma as any).contactSubmission.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          {filter && filter !== 'all'
            ? `No ${filter.toLowerCase()} submissions found`
            : 'No submissions yet'
          }
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {submissions.map((submission: any) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  )
}

function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-muted rounded w-12 animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SubmissionsListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded w-48 animate-pulse" />
              <div className="h-4 bg-muted rounded w-32 animate-pulse" />
              <div className="h-4 bg-muted rounded w-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function ContactSubmissionsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const filter = params.status || 'all'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="text-muted-foreground mt-2">Manage all contact form submissions</p>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      {/* Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Submissions</h2>
        <SubmissionsFilter />
      </div>

      {/* Submissions List */}
      <Suspense fallback={<SubmissionsListSkeleton />} key={filter}>
        <SubmissionsList filter={filter} />
      </Suspense>
    </div>
  )
}
