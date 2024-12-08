import Pagination from '@/app/ui/receipts/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/receipts/table';
import { CreateReceipt } from '@/app/ui/receipts/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ExpensesChartSkeleton, InvoicesTableSkeleton, LatestReceiptsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchReceiptsPages } from '@/app/lib/data';
import ExpensesChart from '@/app/ui/dashboard/exspense-chart';
import LatestReceipts from '@/app/ui/dashboard/latest-receipts';
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = await searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchReceiptsPages(query);

  return (

    <>
     <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reports</h1>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
       <Suspense fallback={<ExpensesChartSkeleton />}>
          <ExpensesChart />
        </Suspense>
        <Suspense fallback={<LatestReceiptsSkeleton/>}>
          <LatestReceipts />
        </Suspense>
      </div>
    </>
      
  );
}