import Pagination from '@/app/ui/receipts/pagination';
import Search from '@/app/ui/search';
import ExpensesTable from '@/app/ui/receipts/table';
import { CreateReceipt } from '@/app/ui/receipts/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchReceiptsPages } from '@/app/lib/data';
 
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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Receipts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search receipts..." />
        <CreateReceipt />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <ExpensesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* use-debounce avoids searching on every keystroke */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}