import { Card } from '@/app/ui/dashboard/cards';
import ExpensesChart from '@/app/ui/dashboard/exspense-chart';
import LatestReceipts from '@/app/ui/dashboard/latest-receipts';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { ExpensesChartSkeleton, LatestReceiptsSkeleton } from '@/app/ui/skeletons';
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
       <Suspense fallback={<ExpensesChartSkeleton />}>
          <ExpensesChart />
        </Suspense>
        <Suspense fallback={<LatestReceiptsSkeleton/>}>
          <LatestReceipts />
        </Suspense>
      </div>
    </main>
  );
}