// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Wallet, Brain, Calendar } from 'lucide-react';

interface OverviewPageProps {
  params: Promise<{ locale: string }>;
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OverviewContent />;
}

function OverviewContent() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('overview')}</h1>
        <p className="mt-1 text-muted-foreground">{t('welcome')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 completed, 9 remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,350</div>
            <p className="text-xs text-muted-foreground">
              -12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              5 added this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Next: Team meeting at 2pm
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted">
                <CheckSquare className="h-6 w-6" />
                <span className="text-sm font-medium">New Task</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted">
                <Wallet className="h-6 w-6" />
                <span className="text-sm font-medium">Add Expense</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted">
                <Brain className="h-6 w-6" />
                <span className="text-sm font-medium">Quick Note</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted">
                <Calendar className="h-6 w-6" />
                <span className="text-sm font-medium">New Event</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivity')}</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Completed task', detail: 'Review Q4 reports', time: '2 hours ago' },
                { action: 'Added expense', detail: '$45.00 - Lunch meeting', time: '4 hours ago' },
                { action: 'Created note', detail: 'Meeting notes - Product sync', time: 'Yesterday' },
                { action: 'Habit completed', detail: 'Morning meditation', time: 'Yesterday' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
